const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  monthlyBudget: { type: Number, required: true }, // Monthly budget
  currency: { type: String, default: "USD" }, // User's selected currency
  baseCurrency: { type: String, default: "USD" }, // Standardized reporting currency
  exchangeRate: { type: Number, default: 1 }, // Conversion rate to base currency
  convertedBudget: { type: Number }, // Converted monthly budget
  categoryBudgets: { type: Map, of: Number }, // Budget per category (e.g., Food: 300, Rent: 500)
  totalSpent: { type: Number, default: 0 }, // Total spent in the month
  categorySpending: { type: Map, of: Number, default: {} }, // Spending by category
  budgetWarnings: { type: Boolean, default: false }, // Flag for exceeding budget
  recommendations: { type: String, default: "" }, // Recommendations for budget adjustments
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Automatically updates the converted budget and checks for overspending
BudgetSchema.pre("save", function (next) {
  this.convertedBudget = this.monthlyBudget * this.exchangeRate;
  this.updatedAt = new Date();

  const budgetLimit = this.monthlyBudget * 0.9; // 90% threshold for warning
  this.budgetWarnings = this.totalSpent >= budgetLimit;

  if (this.totalSpent > this.monthlyBudget) {
    this.recommendations = "Consider reducing spending in high-expenditure categories.";
  } else if (this.totalSpent > budgetLimit) {
    this.recommendations = "You're nearing your budget limit. Monitor spending carefully!";
  } else {
    this.recommendations = "";
  }

  next();
});

module.exports = mongoose.model("Budget", BudgetSchema);
