import { Quiz } from "../models/quiz.model.js";
import { QuizAttempt } from "../models/quizAttempt.model.js";
import { ApiError, asyncHandler } from "../utils/apiError.js";
import { applyCoinChange } from "../utils/coins.js";
import { ROLES } from "../config/roles.js";

const canManage = (quiz, user) =>
  user.role === ROLES.ADMIN || quiz.createdBy.toString() === user._id.toString();

export const listQuizzes = asyncHandler(async (req, res) => {
  const filter = { isPublished: true };
  if (req.query.skill) filter.skill = req.query.skill;

  const quizzes = await Quiz.find(filter).populate("skill", "title category").sort("-createdAt");
  res.json({
    success: true,
    data: quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      skill: quiz.skill,
      questionCount: quiz.questions.length,
      passingScore: quiz.passingScore,
      coinReward: quiz.coinReward,
      xpReward: quiz.xpReward,
    })),
  });
});

export const getQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate("skill", "title category");
  if (!quiz || !quiz.isPublished) throw new ApiError(404, "Quiz not found");
  res.json({ success: true, data: quiz.toPublicJSON() });
});

export const createQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: quiz });
});

export const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) throw new ApiError(404, "Quiz not found");
  if (!canManage(quiz, req.user)) throw new ApiError(403, "You can only edit your own quizzes");

  const fields = [
    "title",
    "description",
    "skill",
    "questions",
    "passingScore",
    "coinReward",
    "xpReward",
    "isPublished",
  ];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) quiz[field] = req.body[field];
  });
  await quiz.save();

  res.json({ success: true, data: quiz });
});

export const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) throw new ApiError(404, "Quiz not found");
  if (!canManage(quiz, req.user)) throw new ApiError(403, "You can only delete your own quizzes");
  await quiz.deleteOne();
  res.json({ success: true, message: "Quiz deleted" });
});

export const submitQuiz = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz || !quiz.isPublished) throw new ApiError(404, "Quiz not found");
  if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
    throw new ApiError(400, `answers must be an array of ${quiz.questions.length} option indexes`);
  }

  const correct = quiz.questions.reduce(
    (total, question, index) => total + (question.correctIndex === answers[index] ? 1 : 0),
    0
  );
  const score = Math.round((correct / quiz.questions.length) * 100);
  const passed = score >= quiz.passingScore;

  // Rewards are only granted the first time a user passes a given quiz.
  const alreadyRewarded = await QuizAttempt.exists({
    quiz: quiz._id,
    user: req.user._id,
    passed: true,
  });

  let coinsEarned = 0;
  let xpEarned = 0;
  if (passed && !alreadyRewarded) {
    coinsEarned = quiz.coinReward;
    xpEarned = quiz.xpReward;
    req.user.xp += xpEarned;
    await applyCoinChange(req.user, {
      amount: coinsEarned,
      type: "quiz_reward",
      reference: quiz._id,
      note: `Passed ${quiz.title}`,
    });
  }

  const attempt = await QuizAttempt.create({
    quiz: quiz._id,
    user: req.user._id,
    answers,
    score,
    passed,
    coinsEarned,
    xpEarned,
  });

  res.status(201).json({
    success: true,
    data: {
      attempt,
      correct,
      total: quiz.questions.length,
      coins: req.user.coins,
      xp: req.user.xp,
    },
  });
});

export const myAttempts = asyncHandler(async (req, res) => {
  const attempts = await QuizAttempt.find({ user: req.user._id })
    .sort("-createdAt")
    .populate("quiz", "title passingScore");
  res.json({ success: true, data: attempts });
});
