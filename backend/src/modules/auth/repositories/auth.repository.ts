import { prisma } from "../../../config/database.js";
import type { Role } from "@prisma/client";

interface CreateUserData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  emailVerifyToken: string;
  emailVerifyExpires: Date;
}

export const AuthRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findByUsername(username: string) {
    return prisma.user.findUnique({ where: { username } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  async createUser(data: CreateUserData) {
    const user = await prisma.user.create({ data });

    // Auto-create the role-specific profile so it always exists
    if (data.role === "CREATOR") {
      await prisma.creatorProfile.create({
        data: { creatorId: user.id, skills: [] },
      });
    } else if (data.role === "LEARNER") {
      await prisma.learnerProfile.create({
        data: { learnerId: user.id, interests: [], learningGoals: [] },
      });
    }

    return user;
  },

  updatePassword(userId: string, hashedPassword: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });
  },

  setPasswordResetToken(userId: string, hashedToken: string, expires: Date) {
    return prisma.user.update({
      where: { id: userId },
      data: { passwordResetToken: hashedToken, passwordResetExpires: expires },
    });
  },

  findByValidResetToken(hashedToken: string) {
    return prisma.user.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { gt: new Date() },
      },
    });
  },

  findByValidVerifyToken(hashedToken: string) {
    return prisma.user.findFirst({
      where: {
        emailVerifyToken: hashedToken,
        emailVerifyExpires: { gt: new Date() },
      },
    });
  },

  markEmailVerified(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        isVerified: true,
        emailVerifyToken: null,
        emailVerifyExpires: null,
      },
    });
  },

  // --- Refresh token management ---

  createRefreshToken(data: {
    token: string;
    userId: string;
    expiresAt: Date;
    userAgent?: string;
    ip?: string;
  }) {
    return prisma.refreshToken.create({ data });
  },

  findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({ where: { token } });
  },

  revokeRefreshToken(token: string) {
    return prisma.refreshToken.updateMany({
      where: { token },
      data: { revoked: true },
    });
  },

  revokeAllUserTokens(userId: string) {
    return prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  },
};
