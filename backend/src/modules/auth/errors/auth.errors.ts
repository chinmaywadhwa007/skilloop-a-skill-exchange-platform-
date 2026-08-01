import { ApiError } from "../../../common/utils/ApiError.js";

export const AuthErrors = {
  emailTaken: () =>
    ApiError.conflict("An account with this email already exists"),
  usernameTaken: () => ApiError.conflict("This username is already taken"),
  invalidCredentials: () => ApiError.unauthorized("Invalid email or password"),
  accountInactive: () =>
    ApiError.forbidden("Your account has been deactivated"),
  emailNotVerified: () =>
    ApiError.forbidden("Please verify your email before logging in"),
  invalidRefreshToken: () =>
    ApiError.unauthorized("Invalid or expired refresh token"),
  invalidResetToken: () =>
    ApiError.badRequest("Invalid or expired password reset token"),
  invalidVerifyToken: () =>
    ApiError.badRequest("Invalid or expired verification token"),
  wrongCurrentPassword: () =>
    ApiError.badRequest("Current password is incorrect"),
  cannotSelfRegisterAsAdmin: () =>
    ApiError.forbidden("You cannot register directly as an admin"),
};
