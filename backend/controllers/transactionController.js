const Transaction = require('../models/Transaction');

// Create Transaction
exports.createTransaction = async (req, res) => {
  const { type, amount, category, tags, recurring, description, date, currency, exchangeRate } = req.body;

  try {
    const transaction = new Transaction({
      userId: req.userId,
      type,
      amount,
      category,
      tags,
      recurring,
      description,
      date,
      currency,
      exchangeRate,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error creating transaction', error: err });
  }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
};

// Update Transaction
exports.updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const { type, amount, category, tags, recurring, description, date, currency, exchangeRate } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    transaction.type = type || transaction.type;
    transaction.amount = amount || transaction.amount;
    transaction.category = category || transaction.category;
    transaction.tags = tags || transaction.tags;
    transaction.recurring = recurring || transaction.recurring;
    transaction.description = description || transaction.description;
    transaction.date = date || transaction.date;
    transaction.currency = currency || transaction.currency;
    transaction.exchangeRate = exchangeRate || transaction.exchangeRate;

    await transaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error updating transaction', error: err });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    await transaction.remove();
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting transaction', error: err });
  }
};
