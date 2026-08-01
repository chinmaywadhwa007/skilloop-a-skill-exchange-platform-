import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/auth.service.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { env, isProd } from "../../../config/env.js";
import { durationToMs } from "../../../common/utils/jwt.js";
import { sendSuccess } from "../../../common/utils/ApiResponse.js";
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  VerifyEmailInput,
} from "../schemas/auth.schema.js";

const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
  maxAge: Math.floor(maxAge / 1000), // fastify/cookie expects seconds
});

function setAuthCookies(
  reply: FastifyReply,
  accessToken: string,
  refreshToken: string,
) {
  reply.setCookie(
    "accessToken",
    accessToken,
    cookieOptions(durationToMs(env.JWT_ACCESS_EXPIRES_IN)),
  );
  reply.setCookie(
    "refreshToken",
    refreshToken,
    cookieOptions(durationToMs(env.JWT_REFRESH_EXPIRES_IN)),
  );
}

function clearAuthCookies(reply: FastifyReply) {
  reply.clearCookie("accessToken", { path: "/" });
  reply.clearCookie("refreshToken", { path: "/" });
}

function requestMeta(request: FastifyRequest) {
  return {
    userAgent: request.headers["user-agent"],
    ip: request.ip,
  };
}

export const AuthController = {
  async register(
    request: FastifyRequest<{ Body: RegisterInput }>,
    reply: FastifyReply,
  ) {
    const user = await AuthService.register(request.body);
    return sendSuccess(reply, {
      statusCode: 201,
      message:
        "Registration successful. Please check your email to verify your account.",
      data: user,
    });
  },

  async login(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply,
  ) {
    const { user, accessToken, refreshToken } = await AuthService.login(
      request.body,
      requestMeta(request),
    );
    setAuthCookies(reply, accessToken, refreshToken);
    return sendSuccess(reply, {
      message: "Login successful",
      data: { user, accessToken },
    });
  },

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies?.refreshToken;
    const {
      user,
      accessToken,
      refreshToken: newRefreshToken,
    } = await AuthService.refresh(refreshToken ?? "", requestMeta(request));
    setAuthCookies(reply, accessToken, newRefreshToken);
    return sendSuccess(reply, {
      message: "Token refreshed successfully",
      data: { user, accessToken },
    });
  },

  async logout(request: FastifyRequest, reply: FastifyReply) {
    const refreshToken = request.cookies?.refreshToken;
    await AuthService.logout(refreshToken);
    clearAuthCookies(reply);
    return sendSuccess(reply, { message: "Logged out successfully" });
  },

  async forgotPassword(
    request: FastifyRequest<{ Body: ForgotPasswordInput }>,
    reply: FastifyReply,
  ) {
    await AuthService.forgotPassword(request.body.email);
    // Always return success - never reveal if an email exists in the system
    return sendSuccess(reply, {
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  },

  async resetPassword(
    request: FastifyRequest<{ Body: ResetPasswordInput }>,
    reply: FastifyReply,
  ) {
    await AuthService.resetPassword(
      request.body.token,
      request.body.newPassword,
    );
    return sendSuccess(reply, {
      message:
        "Password reset successful. Please log in with your new password.",
    });
  },

  async changePassword(
    request: FastifyRequest<{ Body: ChangePasswordInput }>,
    reply: FastifyReply,
  ) {
    await AuthService.changePassword(
      request.user!.id,
      request.body.currentPassword,
      request.body.newPassword,
    );
    clearAuthCookies(reply);
    return sendSuccess(reply, {
      message: "Password changed successfully. Please log in again.",
    });
  },

  async verifyEmail(
    request: FastifyRequest<{ Body: VerifyEmailInput }>,
    reply: FastifyReply,
  ) {
    await AuthService.verifyEmail(request.body.token);
    return sendSuccess(reply, { message: "Email verified successfully" });
  },

  async me(request: FastifyRequest, reply: FastifyReply) {
    const user = await AuthService.getCurrentUser(request.user!.id);
    return sendSuccess(reply, { message: "Current user fetched", data: user });
  },
};
