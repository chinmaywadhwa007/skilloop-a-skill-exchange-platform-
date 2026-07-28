import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLES, ROLE_VALUES } from "../config/roles.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^@\s]+@[^@\s]+\.[^@\s]+$/, "Invalid email address"],
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ROLE_VALUES, default: ROLES.USER },
    bio: { type: String, default: "", maxlength: 500 },
    avatar: { type: String, default: "" },
    coins: { type: Number, default: 100, min: 0 },
    xp: { type: Number, default: 0, min: 0 },
    skillsOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    badges: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.index({ xp: -1, coins: -1 });

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function comparePassword(plain) {
  return bcrypt.compare(plain, this.password);
};

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
