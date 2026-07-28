import { Router } from "express";
import {
  getDashboard,
  getLeaderboard,
  getProfile,
  getTransactions,
  updateProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/leaderboard", getLeaderboard);
router.get("/me/dashboard", protect, getDashboard);
router.get("/me/transactions", protect, getTransactions);
router.patch("/me", protect, updateProfile);
router.get("/:id", getProfile);

export default router;
