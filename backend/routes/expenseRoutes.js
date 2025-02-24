const express = require("express");
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all expenses for a user
router.get("/", authMiddleware, async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.userId });
  res.json(expenses);
});

// Add an expense
router.post("/", authMiddleware, async (req, res) => {
  const { title, amount } = req.body;
  const newExpense = new Expense({ title, amount, userId: req.user.userId });
  await newExpense.save();
  res.json(newExpense);
});

// Update an expense
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, amount } = req.body;
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    { title, amount },
    { new: true }
  );
  res.json(updatedExpense);
});

// Delete an expense
router.delete("/:id", authMiddleware, async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense deleted!" });
});

module.exports = router;
