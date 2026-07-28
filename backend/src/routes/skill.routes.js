import { Router } from "express";
import {
  createSkill,
  deleteSkill,
  enrollInSkill,
  getSkill,
  listCategories,
  listMySkills,
  listSkills,
  rateSkill,
  updateSkill,
} from "../controllers/skill.controller.js";
import { protect, requireMinRole } from "../middleware/auth.middleware.js";
import { ROLES } from "../config/roles.js";

const router = Router();

router.get("/", listSkills);
router.get("/categories", listCategories);
router.get("/mine", protect, listMySkills);
router.get("/:id", getSkill);

router.post("/", protect, requireMinRole(ROLES.MENTOR), createSkill);
router.patch("/:id", protect, requireMinRole(ROLES.MENTOR), updateSkill);
router.delete("/:id", protect, requireMinRole(ROLES.MENTOR), deleteSkill);

router.post("/:id/enroll", protect, enrollInSkill);
router.post("/:id/rate", protect, rateSkill);

export default router;
