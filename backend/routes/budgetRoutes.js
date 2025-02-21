const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Create a new budget
router.post('/budget', budgetController.createBudget);

// Get user's budget
router.get('/budget', budgetController.getBudget);

// Update user's budget
router.put('/budget', budgetController.updateBudget);

module.exports = router;
