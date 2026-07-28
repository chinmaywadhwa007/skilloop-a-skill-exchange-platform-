import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    answers: [{ type: Number }],
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    coinsEarned: { type: Number, default: 0 },
    xpEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);
