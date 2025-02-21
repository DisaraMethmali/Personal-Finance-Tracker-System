const Goal = require('../models/Goal');

// Create Goal
exports.createGoal = async (req, res) => {
  const { description, targetAmount, startDate, endDate } = req.body;

  try {
    const goal = new Goal({
      userId: req.userId,
      description,
      targetAmount,
      startDate,
      endDate,
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Error creating goal', error: err });
  }
};

// Get Goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching goals', error: err });
  }
};

// Update Goal
exports.updateGoal = async (req, res) => {
  const { goalId } = req.params;
  const { description, targetAmount, currentAmount, startDate, endDate } = req.body;

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    goal.description = description || goal.description;
    goal.targetAmount = targetAmount || goal.targetAmount;
    goal.currentAmount = currentAmount || goal.currentAmount;
    goal.startDate = startDate || goal.startDate;
    goal.endDate = endDate || goal.endDate;

    await goal.save();
    res.status(200).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Error updating goal', error: err });
  }
};

// Delete Goal
exports.deleteGoal = async (req, res) => {
  const { goalId } = req.params;

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });

    await goal.remove();
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting goal', error: err });
  }
};
