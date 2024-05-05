const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.get('/budgets', authenticateToken, budgetController.getUserBudgets);
router.post('/budgets', authenticateToken, budgetController.createBudget);

module.exports = router;
