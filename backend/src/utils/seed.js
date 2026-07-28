import "dotenv/config";
import { connectDB } from "../config/db.js";
import { User } from "../models/user.model.js";
import { Skill } from "../models/skill.model.js";
import { Quiz } from "../models/quiz.model.js";
import { QuizAttempt } from "../models/quizAttempt.model.js";
import { Transaction } from "../models/transaction.model.js";
import { ROLES } from "../config/roles.js";
import mongoose from "mongoose";

const run = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Skill.deleteMany({}),
    Quiz.deleteMany({}),
    QuizAttempt.deleteMany({}),
    Transaction.deleteMany({}),
  ]);

  const [admin, mentor, learner] = await User.create([
    { name: "Admin", email: "admin@skilloop.dev", password: "Admin@1234", role: ROLES.ADMIN, coins: 1000 },
    { name: "Maya Mentor", email: "mentor@skilloop.dev", password: "Mentor@1234", role: ROLES.MENTOR, xp: 320 },
    { name: "Leo Learner", email: "learner@skilloop.dev", password: "Learner@1234", role: ROLES.USER, xp: 120 },
  ]);

  const skill = await Skill.create({
    title: "React Fundamentals",
    description: "Components, hooks and state management from scratch.",
    category: "Web Development",
    level: "beginner",
    coinCost: 15,
    tags: ["react", "frontend"],
    mentor: mentor._id,
  });
  mentor.skillsOffered.push(skill._id);
  await mentor.save();

  await Quiz.create({
    title: "React Basics Quiz",
    description: "Check your React fundamentals.",
    skill: skill._id,
    createdBy: mentor._id,
    questions: [
      { prompt: "What hook manages local state?", options: ["useState", "useMemo", "useRef"], correctIndex: 0 },
      { prompt: "JSX compiles to?", options: ["HTML strings", "React.createElement calls", "CSS"], correctIndex: 1 },
    ],
  });

  console.log("Seeded users:", [admin.email, mentor.email, learner.email].join(", "));
  await mongoose.connection.close();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
