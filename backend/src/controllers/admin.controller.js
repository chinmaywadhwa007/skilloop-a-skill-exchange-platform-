import { User } from "../models/user.model.js";
import { Skill } from "../models/skill.model.js";
import { Quiz } from "../models/quiz.model.js";
import { QuizAttempt } from "../models/quizAttempt.model.js";
import { ApiError, asyncHandler } from "../utils/apiError.js";
import { applyCoinChange } from "../utils/coins.js";
import { ROLE_VALUES } from "../config/roles.js";

export const getStats = asyncHandler(async (_req, res) => {
  const [users, mentors, skills, quizzes, attempts] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "mentor" }),
    Skill.countDocuments(),
    Quiz.countDocuments(),
    QuizAttempt.countDocuments(),
  ]);
  res.json({ success: true, data: { users, mentors, skills, quizzes, attempts } });
});

export const listUsers = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  if (req.query.search) filter.name = new RegExp(req.query.search, "i");

  const [items, total] = await Promise.all([
    User.find(filter).sort("-createdAt").skip((page - 1) * limit).limit(limit),
    User.countDocuments(filter),
  ]);
  res.json({ success: true, data: items, meta: { page, limit, total } });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!ROLE_VALUES.includes(role)) throw new ApiError(400, "Invalid role");
  if (req.params.id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot change your own role");
  }

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, data: user });
});

export const setUserActive = asyncHandler(async (req, res) => {
  if (req.params.id === req.user._id.toString()) {
    throw new ApiError(400, "You cannot deactivate your own account");
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: Boolean(req.body.isActive) },
    { new: true }
  );
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, data: user });
});

export const adjustCoins = asyncHandler(async (req, res) => {
  const amount = Number(req.body.amount);
  if (!Number.isFinite(amount) || amount === 0) {
    throw new ApiError(400, "amount must be a non-zero number");
  }
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  await applyCoinChange(user, {
    amount,
    type: "admin_adjustment",
    note: req.body.note || `Adjusted by admin ${req.user.name}`,
  });
  res.json({ success: true, data: user });
});

export const setSkillStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!["pending", "approved", "rejected"].includes(status)) {
    throw new ApiError(400, "Invalid status");
  }
  const skill = await Skill.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!skill) throw new ApiError(404, "Skill not found");
  res.json({ success: true, data: skill });
});
