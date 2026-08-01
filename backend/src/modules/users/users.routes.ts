import type { FastifyInstance } from "fastify";
import { AuthController } from "../auth/controllers/auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";

import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  verifyEmailSchema,
} from "../auth/schemas/auth.schema.js";

import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
  VerifyEmailInput,
} from "../auth/schemas/auth.schema.js";

export default async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: RegisterInput }>(
    "/register",
    {
      schema: { tags: ["Auth"] },
      preHandler: [validate({ body: registerSchema })],
    },
    AuthController.register,
  );

  app.post<{ Body: LoginInput }>(
    "/login",
    {
      schema: { tags: ["Auth"] },
      preHandler: [validate({ body: loginSchema })],
      config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
    },
    AuthController.login,
  );

  app.post(
    "/refresh-token",
    { schema: { tags: ["Auth"] } },
    AuthController.refresh,
  );

  app.post(
    "/logout",
    {
      schema: { tags: ["Auth"] },
      preHandler: [authenticate],
    },
    AuthController.logout,
  );

  app.post<{ Body: ForgotPasswordInput }>(
    "/forgot-password",
    {
      schema: { tags: ["Auth"] },
      preHandler: [validate({ body: forgotPasswordSchema })],
      config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
    },
    AuthController.forgotPassword,
  );

  app.post<{ Body: ResetPasswordInput }>(
    "/reset-password",
    {
      schema: { tags: ["Auth"] },
      preHandler: [validate({ body: resetPasswordSchema })],
    },
    AuthController.resetPassword,
  );

  app.post<{ Body: ChangePasswordInput }>(
    "/change-password",
    {
      schema: { tags: ["Auth"] },
      preHandler: [authenticate, validate({ body: changePasswordSchema })],
    },
    AuthController.changePassword,
  );

  app.post<{ Body: VerifyEmailInput }>(
    "/verify-email",
    {
      schema: { tags: ["Auth"] },
      preHandler: [validate({ body: verifyEmailSchema })],
    },
    AuthController.verifyEmail,
  );

  app.get(
    "/me",
    {
      schema: { tags: ["Auth"] },
      preHandler: [authenticate],
    },
    AuthController.me,
  );
}
