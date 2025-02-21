const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

// Create a new goal
router.post('/goals', goalController.createGoal);

// Get all goals for a user
router.get('/goals', goalController.getGoals);

// Update a goal by ID
router.put('/goals/:goalId', goalController.updateGoal);

// Delete a goal by ID
router.delete('/goals/:goalId', goalController.deleteGoal);

module.exports = router;
