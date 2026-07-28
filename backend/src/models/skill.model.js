import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, maxlength: 2000 },
    category: { type: String, required: true, trim: true, index: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    coinCost: { type: Number, default: 10, min: 0 },
    coverImage: { type: String, default: "" },
    tags: [{ type: String, trim: true }],
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    learners: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    ratingSum: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
      index: true,
    },
  },
  { timestamps: true }
);

skillSchema.virtual("rating").get(function rating() {
  return this.ratingCount ? Number((this.ratingSum / this.ratingCount).toFixed(2)) : 0;
});

skillSchema.virtual("learnerCount").get(function learnerCount() {
  return this.learners.length;
});

skillSchema.index({ title: "text", description: "text", tags: "text" });
skillSchema.set("toJSON", { virtuals: true });

export const Skill = mongoose.model("Skill", skillSchema);
