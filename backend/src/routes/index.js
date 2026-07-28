import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import skillRoutes from "./skill.routes.js";
import quizRoutes from "./quiz.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.get("/health", (_req, res) => res.json({ success: true, status: "ok" }));
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/skills", skillRoutes);
router.use("/quizzes", quizRoutes);
router.use("/admin", adminRoutes);

export default router;
