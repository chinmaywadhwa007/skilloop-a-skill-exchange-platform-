import { AuthRepository } from "../repositories/auth.repository.js";
import { AuthErrors } from "../errors/auth.errors.js";
import { hashPassword, comparePassword } from "../../../common/utils/hash.js";
import { generateSecureToken, hashToken } from "../../../common/utils/token.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  durationToMs,
} from "../../../common/utils/jwt.js";
import { env } from "../../../config/env.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../../../common/utils/mail.js";
import type { RegisterInput, LoginInput } from "../schemas/auth.schema.js";
import { nanoid } from "nanoid";

interface RequestMeta {
  userAgent?: string;
  ip?: string;
}

async function issueTokenPair(
  userId: string,
  role: any,
  email: string,
  meta: RequestMeta,
) {
  const accessToken = signAccessToken({ sub: userId, role, email });

  // Each refresh token gets a unique DB row (tokenId) so it can be revoked individually.
  const tokenId = nanoid();
  const refreshToken = signRefreshToken({ sub: userId, tokenId });

  const expiresAt = new Date(
    Date.now() + durationToMs(env.JWT_REFRESH_EXPIRES_IN),
  );

  await AuthRepository.createRefreshToken({
    token: refreshToken,
    userId,
    expiresAt,
    userAgent: meta.userAgent,
    ip: meta.ip,
  });

  return { accessToken, refreshToken };
}

function sanitizeUser(user: any) {
  const { password, passwordResetToken, emailVerifyToken, ...safe } = user;
  return safe;
}

export const AuthService = {
  async register(input: RegisterInput) {
    if ((input.role as string) === "ADMIN") {
      throw AuthErrors.cannotSelfRegisterAsAdmin();
    }

    const existingEmail = await AuthRepository.findByEmail(input.email);
    if (existingEmail) throw AuthErrors.emailTaken();

    const existingUsername = await AuthRepository.findByUsername(
      input.username,
    );
    if (existingUsername) throw AuthErrors.usernameTaken();

    const hashedPassword = await hashPassword(input.password);
    const { rawToken, hashedToken } = generateSecureToken();
    const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const user = await AuthRepository.createUser({
      name: input.name,
      username: input.username,
      email: input.email,
      password: hashedPassword,
      role: input.role,
      phone: input.phone,
      emailVerifyToken: hashedToken,
      emailVerifyExpires,
    });

    await sendVerificationEmail(user.email, user.name, rawToken);

    return sanitizeUser(user);
  },

  async login(input: LoginInput, meta: RequestMeta) {
    const user = await AuthRepository.findByEmail(input.email);
    if (!user) throw AuthErrors.invalidCredentials();

    const passwordMatches = await comparePassword(
      input.password,
      user.password,
    );
    if (!passwordMatches) throw AuthErrors.invalidCredentials();

    if (!user.isActive) throw AuthErrors.accountInactive();

    const tokens = await issueTokenPair(user.id, user.role, user.email, meta);

    return { user: sanitizeUser(user), ...tokens };
  },

  async refresh(refreshToken: string, meta: RequestMeta) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw AuthErrors.invalidRefreshToken();
    }

    const storedToken = await AuthRepository.findRefreshToken(refreshToken);
    if (
      !storedToken ||
      storedToken.revoked ||
      storedToken.expiresAt < new Date()
    ) {
      throw AuthErrors.invalidRefreshToken();
    }

    const user = await AuthRepository.findById(payload.sub);
    if (!user || !user.isActive) throw AuthErrors.invalidRefreshToken();

    // Rotate: revoke the old refresh token, issue a brand new pair
    await AuthRepository.revokeRefreshToken(refreshToken);
    const tokens = await issueTokenPair(user.id, user.role, user.email, meta);

    return { user: sanitizeUser(user), ...tokens };
  },

  async logout(refreshToken: string | undefined) {
    if (refreshToken) {
      await AuthRepository.revokeRefreshToken(refreshToken);
    }
  },

  async forgotPassword(email: string) {
    const user = await AuthRepository.findByEmail(email);
    // Do not reveal whether the email exists - always respond success upstream
    if (!user) return;

    const { rawToken, hashedToken } = generateSecureToken();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await AuthRepository.setPasswordResetToken(user.id, hashedToken, expires);
    await sendPasswordResetEmail(user.email, user.name, rawToken);
  },

  async resetPassword(rawToken: string, newPassword: string) {
    const hashedToken = hashToken(rawToken);
    const user = await AuthRepository.findByValidResetToken(hashedToken);
    if (!user) throw AuthErrors.invalidResetToken();

    const hashedPassword = await hashPassword(newPassword);
    await AuthRepository.updatePassword(user.id, hashedPassword);

    // Invalidate all existing sessions after a password reset
    await AuthRepository.revokeAllUserTokens(user.id);
  },

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await AuthRepository.findById(userId);
    if (!user) throw AuthErrors.invalidCredentials();

    const matches = await comparePassword(currentPassword, user.password);
    if (!matches) throw AuthErrors.wrongCurrentPassword();

    const hashedPassword = await hashPassword(newPassword);
    await AuthRepository.updatePassword(userId, hashedPassword);
    await AuthRepository.revokeAllUserTokens(userId);
  },

  async verifyEmail(rawToken: string) {
    const hashedToken = hashToken(rawToken);
    const user = await AuthRepository.findByValidVerifyToken(hashedToken);
    if (!user) throw AuthErrors.invalidVerifyToken();

    await AuthRepository.markEmailVerified(user.id);
  },

  async getCurrentUser(userId: string) {
    const user = await AuthRepository.findById(userId);
    if (!user) throw AuthErrors.invalidCredentials();
    return sanitizeUser(user);
  },
};
