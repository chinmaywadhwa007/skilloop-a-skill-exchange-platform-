import { Router } from "express";
import {
  adjustCoins,
  getStats,
  listUsers,
  setSkillStatus,
  setUserActive,
  updateUserRole,
} from "../controllers/admin.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = Router();

router.use(protect, authorize(ROLES.ADMIN));

router.get("/stats", getStats);
router.get("/users", listUsers);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/active", setUserActive);
router.patch("/users/:id/coins", adjustCoins);
router.patch("/skills/:id/status", setSkillStatus);

export default router;
