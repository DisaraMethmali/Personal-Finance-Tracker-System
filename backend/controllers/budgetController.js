const Budget = require('../models/Budget');

// Create Budget
exports.createBudget = async (req, res) => {
  const { monthlyBudget, categoryBudgets, currency } = req.body;

  try {
    const budget = new Budget({
      userId: req.userId,
      monthlyBudget,
      categoryBudgets,
      currency,
    });

    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Error creating budget', error: err });
  }
};

// Get User Budget
exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({ userId: req.userId });
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching budget', error: err });
  }
};

// Update Budget
exports.updateBudget = async (req, res) => {
  const { monthlyBudget, categoryBudgets, currency } = req.body;

  try {
    const budget = await Budget.findOne({ userId: req.userId });
    if (!budget) return res.status(404).json({ message: 'Budget not found' });

    budget.monthlyBudget = monthlyBudget || budget.monthlyBudget;
    budget.categoryBudgets = categoryBudgets || budget.categoryBudgets;
    budget.currency = currency || budget.currency;

    await budget.save();
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: 'Error updating budget', error: err });
  }
};
