import { Transaction } from "../models/transaction.model.js";

/**
 * Applies a coin delta to a user document and records the transaction.
 * Rejects when the user cannot afford a debit.
 */
export const applyCoinChange = async (user, { amount, type, reference, note = "" }) => {
  const nextBalance = user.coins + amount;
  if (nextBalance < 0) {
    const error = new Error("Not enough coins for this action");
    error.statusCode = 400;
    throw error;
  }

  user.coins = nextBalance;
  await user.save();

  return Transaction.create({
    user: user._id,
    type,
    amount,
    balanceAfter: nextBalance,
    reference,
    note,
  });
};
