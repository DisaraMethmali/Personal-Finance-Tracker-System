const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  description: { type: String, required: true }, // Description of the goal
  targetAmount: { type: Number, required: true }, // Target savings goal
  currentAmount: { type: Number, default: 0 }, // Current savings amount
  goalType: { type: String, enum: ["savings", "investment", "debt"], required: true }, // Type of goal
  startDate: { type: Date, required: true }, // When the goal was started
  endDate: { type: Date, required: true }, // Target completion date
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
