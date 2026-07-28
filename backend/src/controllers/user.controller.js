import { User } from "../models/user.model.js";
import { Transaction } from "../models/transaction.model.js";
import { Skill } from "../models/skill.model.js";
import { QuizAttempt } from "../models/quizAttempt.model.js";
import { ApiError, asyncHandler } from "../utils/apiError.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    "skillsOffered",
    "title category level coinCost"
  );
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, data: user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, avatar } = req.body;
  const user = req.user;
  if (name !== undefined) user.name = name;
  if (bio !== undefined) user.bio = bio;
  if (avatar !== undefined) user.avatar = avatar;
  await user.save();
  res.json({ success: true, data: user });
});

export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const [teaching, learning, attempts, transactions] = await Promise.all([
    Skill.find({ mentor: userId }).select("title category learners coinCost status"),
    Skill.find({ learners: userId }).select("title category mentor").populate("mentor", "name"),
    QuizAttempt.find({ user: userId }).sort("-createdAt").limit(5).populate("quiz", "title"),
    Transaction.find({ user: userId }).sort("-createdAt").limit(10),
  ]);

  res.json({
    success: true,
    data: {
      user: req.user,
      stats: {
        coins: req.user.coins,
        xp: req.user.xp,
        skillsTeaching: teaching.length,
        skillsLearning: learning.length,
        quizzesPassed: attempts.filter((a) => a.passed).length,
      },
      teaching,
      learning,
      recentAttempts: attempts,
      recentTransactions: transactions,
    },
  });
});

export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).sort("-createdAt");
  res.json({ success: true, data: transactions });
});

export const getLeaderboard = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const users = await User.find({ isActive: true })
    .sort({ xp: -1, coins: -1 })
    .limit(limit)
    .select("name avatar role coins xp badges");

  res.json({
    success: true,
    data: users.map((user, index) => ({ rank: index + 1, ...user.toJSON() })),
  });
});
