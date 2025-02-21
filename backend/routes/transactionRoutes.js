const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create a new transaction
router.post('/transactions', transactionController.createTransaction);

// Get all transactions for a user
router.get('/transactions', transactionController.getTransactions);

// Update a transaction by ID
router.put('/transactions/:transactionId', transactionController.updateTransaction);

// Delete a transaction by ID
router.delete('/transactions/:transactionId', transactionController.deleteTransaction);

module.exports = router;
