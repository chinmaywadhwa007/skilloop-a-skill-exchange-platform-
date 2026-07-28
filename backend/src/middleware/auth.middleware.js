import { User } from "../models/user.model.js";
import { ApiError, asyncHandler } from "../utils/apiError.js";
import { verifyToken } from "../utils/token.js";
import { hasAtLeastRole } from "../config/roles.js";

export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) throw new ApiError(401, "Authentication required");

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findById(payload.id);
  if (!user) throw new ApiError(401, "User no longer exists");
  if (!user.isActive) throw new ApiError(403, "Account has been deactivated");

  req.user = user;
  next();
});

/** Allows only the listed roles. */
export const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!req.user) return next(new ApiError(401, "Authentication required"));
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, `Requires one of the roles: ${roles.join(", ")}`));
    }
    next();
  };

/** Allows the given role and anything above it in the hierarchy. */
export const requireMinRole = (minimum) => (req, _res, next) => {
  if (!req.user) return next(new ApiError(401, "Authentication required"));
  if (!hasAtLeastRole(req.user.role, minimum)) {
    return next(new ApiError(403, `Requires at least the ${minimum} role`));
  }
  next();
};
