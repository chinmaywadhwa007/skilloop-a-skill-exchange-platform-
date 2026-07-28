import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length >= 2 && v.length <= 6,
        message: "A question needs between 2 and 6 options",
      },
    },
    correctIndex: { type: Number, required: true, min: 0 },
  },
  { _id: true }
);

questionSchema.pre("validate", function checkIndex(next) {
  if (this.correctIndex >= this.options.length) {
    return next(new Error("correctIndex is out of range for the given options"));
  }
  next();
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: "", maxlength: 1000 },
    skill: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", index: true },
    questions: {
      type: [questionSchema],
      validate: {
        validator: (v) => v.length > 0,
        message: "A quiz needs at least one question",
      },
    },
    passingScore: { type: Number, default: 70, min: 1, max: 100 },
    coinReward: { type: Number, default: 20, min: 0 },
    xpReward: { type: Number, default: 50, min: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Answers must never be exposed to learners taking the quiz.
quizSchema.methods.toPublicJSON = function toPublicJSON() {
  const quiz = this.toObject({ virtuals: true });
  quiz.questions = quiz.questions.map(({ correctIndex, ...rest }) => rest);
  return quiz;
};

export const Quiz = mongoose.model("Quiz", quizSchema);
