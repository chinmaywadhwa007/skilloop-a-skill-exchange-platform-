import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiError, asyncHandler } from "../utils/apiError.js";
import { signToken } from "../utils/token.js";
import { ROLES } from "../config/roles.js";

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, bio } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "name, email and password are required");
  }
  if (!PASSWORD_RULE.test(password)) {
    throw new ApiError(
      400,
      "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
    );
  }
  if (await User.exists({ email: email.toLowerCase() })) {
    throw new ApiError(409, "Email already registered");
  }

  // Self-signup can never create an admin; only mentors and learners.
  const safeRole = role === ROLES.MENTOR ? ROLES.MENTOR : ROLES.USER;

  const user = await User.create({ name, email, password, role: safeRole, bio });
  await Transaction.create({
    user: user._id,
    type: "signup_bonus",
    amount: user.coins,
    balanceAfter: user.coins,
    note: "Welcome bonus",
  });

  res.status(201).json({ success: true, data: { user, token: signToken(user) } });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "email and password are required");

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }
  if (!user.isActive) throw new ApiError(403, "Account has been deactivated");

  user.password = undefined;
  res.json({ success: true, data: { user, token: signToken(user) } });
});

export const me = asyncHandler(async (req, res) => {
  const user = await req.user.populate("skillsOffered", "title category level");
  res.json({ success: true, data: user });
});
