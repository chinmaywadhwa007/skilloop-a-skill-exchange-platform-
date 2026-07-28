import { Router } from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuiz,
  listQuizzes,
  myAttempts,
  submitQuiz,
  updateQuiz,
} from "../controllers/quiz.controller.js";
import { protect, requireMinRole } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = Router();

router.get("/", listQuizzes);
router.get("/me/attempts", protect, myAttempts);
router.get("/:id", getQuiz);

router.post("/", protect, requireMinRole(ROLES.MENTOR), createQuiz);
router.patch("/:id", protect, requireMinRole(ROLES.MENTOR), updateQuiz);
router.delete("/:id", protect, requireMinRole(ROLES.MENTOR), deleteQuiz);

router.post("/:id/submit", protect, submitQuiz);

export default router;
