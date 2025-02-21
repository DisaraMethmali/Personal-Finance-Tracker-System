const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "USD" },  // Default currency is USD, but it can be any supported currency
  category: { type: String, required: true },
  tags: [{ type: String }], // Custom Tags like #vacation, #work
  recurring: {
    isRecurring: { type: Boolean, default: false },
    frequency: { type: String, enum: ["daily", "weekly", "monthly"] },
    endDate: { type: Date },
  },
  date: { type: Date, default: Date.now },
  description: { type: String },
  exchangeRate: { type: Number, default: 1 }, // The exchange rate used to convert the currency to base currency (e.g., USD)
});

module.exports = mongoose.model("Transaction", TransactionSchema);
