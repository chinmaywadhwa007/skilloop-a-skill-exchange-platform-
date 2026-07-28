import mongoose from "mongoose";
import { Skill } from "../models/skill.model.js";
import { User } from "../models/user.model.js";
import { ApiError, asyncHandler } from "../utils/apiError.js";
import { applyCoinChange } from "../utils/coins.js";
import { ROLES } from "../config/roles.js";

const canManage = (skill, user) =>
  user.role === ROLES.ADMIN || skill.mentor.toString() === user._id.toString();

export const listSkills = asyncHandler(async (req, res) => {
  const { category, level, search, mentor } = req.query;
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 12, 50);

  const filter = { status: "approved" };
  if (category) filter.category = category;
  if (level) filter.level = level;
  if (mentor) filter.mentor = mentor;
  if (search) filter.$text = { $search: search };

  const [items, total] = await Promise.all([
    Skill.find(filter)
      .sort("-createdAt")
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("mentor", "name avatar role"),
    Skill.countDocuments(filter),
  ]);

  res.json({ success: true, data: items, meta: { page, limit, total } });
});

export const getSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id)
    .populate("mentor", "name avatar bio role")
    .populate("learners", "name avatar");
  if (!skill) throw new ApiError(404, "Skill not found");
  res.json({ success: true, data: skill });
});

export const createSkill = asyncHandler(async (req, res) => {
  const { title, description, category, level, coinCost, tags, coverImage } = req.body;
  const skill = await Skill.create({
    title,
    description,
    category,
    level,
    coinCost,
    tags,
    coverImage,
    mentor: req.user._id,
  });

  await User.findByIdAndUpdate(req.user._id, { $addToSet: { skillsOffered: skill._id } });
  res.status(201).json({ success: true, data: skill });
});

export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) throw new ApiError(404, "Skill not found");
  if (!canManage(skill, req.user)) throw new ApiError(403, "You can only edit your own skills");

  const fields = ["title", "description", "category", "level", "coinCost", "tags", "coverImage"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) skill[field] = req.body[field];
  });
  await skill.save();

  res.json({ success: true, data: skill });
});

export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) throw new ApiError(404, "Skill not found");
  if (!canManage(skill, req.user)) throw new ApiError(403, "You can only delete your own skills");

  await skill.deleteOne();
  await User.findByIdAndUpdate(skill.mentor, { $pull: { skillsOffered: skill._id } });
  res.json({ success: true, message: "Skill deleted" });
});

export const enrollInSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) throw new ApiError(404, "Skill not found");
  if (skill.status !== "approved") throw new ApiError(400, "Skill is not available yet");
  if (skill.mentor.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot enroll in your own skill");
  }
  if (skill.learners.some((id) => id.toString() === req.user._id.toString())) {
    throw new ApiError(409, "Already enrolled in this skill");
  }

  await applyCoinChange(req.user, {
    amount: -skill.coinCost,
    type: "skill_enrollment",
    reference: skill._id,
    note: `Enrolled in ${skill.title}`,
  });

  const mentor = await User.findById(skill.mentor);
  if (mentor) {
    await applyCoinChange(mentor, {
      amount: skill.coinCost,
      type: "skill_earning",
      reference: skill._id,
      note: `${req.user.name} enrolled in ${skill.title}`,
    });
  }

  skill.learners.push(req.user._id);
  await skill.save();

  res.json({ success: true, data: { skill, coins: req.user.coins } });
});

export const rateSkill = asyncHandler(async (req, res) => {
  const value = Number(req.body.rating);
  if (!Number.isFinite(value) || value < 1 || value > 5) {
    throw new ApiError(400, "rating must be a number between 1 and 5");
  }

  const skill = await Skill.findById(req.params.id);
  if (!skill) throw new ApiError(404, "Skill not found");
  if (!skill.learners.some((id) => id.toString() === req.user._id.toString())) {
    throw new ApiError(403, "Only enrolled learners can rate a skill");
  }

  skill.ratingSum += value;
  skill.ratingCount += 1;
  await skill.save();

  res.json({ success: true, data: skill });
});

export const listCategories = asyncHandler(async (_req, res) => {
  const categories = await Skill.distinct("category", { status: "approved" });
  res.json({ success: true, data: categories });
});

export const listMySkills = asyncHandler(async (req, res) => {
  const [teaching, learning] = await Promise.all([
    Skill.find({ mentor: req.user._id }),
    Skill.find({ learners: req.user._id }).populate("mentor", "name avatar"),
  ]);
  res.json({ success: true, data: { teaching, learning } });
});

export { mongoose };
