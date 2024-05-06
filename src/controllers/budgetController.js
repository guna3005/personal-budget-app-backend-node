const Budget = require("../models/budget");

exports.getUserBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const budgets = await Budget.findByUserId(userId);
    res.json(budgets);
  } catch (error) {
    res.status(500).send("Failed to fetch budgets");
  }
};

exports.createBudget = async (req, res) => {
  try {
    const { name, cost, month, colour } = req.body;
    const userId = req.user.id;

    const budgetId = await Budget.create(userId, name, cost, month, colour);
    res.status(201).json({ message: "Budget created successfully", budgetId });
  } catch (error) {
    console.error("Failed to create budget:", error);
    res.status(500).send("Failed to create budget");
  }
};
