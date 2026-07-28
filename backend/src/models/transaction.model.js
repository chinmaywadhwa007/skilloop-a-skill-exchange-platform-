import mongoose from "mongoose";

export const TRANSACTION_TYPES = [
  "signup_bonus",
  "skill_enrollment",
  "skill_earning",
  "quiz_reward",
  "admin_adjustment",
];

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: TRANSACTION_TYPES, required: true },
    // Positive credits the user, negative debits them.
    amount: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    reference: { type: mongoose.Schema.Types.ObjectId },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
