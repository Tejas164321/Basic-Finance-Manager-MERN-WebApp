const Expense = require('../models/Expence');

// @desc    Get all expenses
// @access  Private
const getExpenses = async (userId) => {
  try {
    const expenses = await Expense.find({ user: userId });
    return expenses;
  } catch (error) {
    throw error;
  }
};

// @desc    Add new expense
// @access  Private
const addExpense = async (expenseData) => {
  try {
    const expense = new Expense(expenseData);
    const savedExpense = await expense.save();
    return savedExpense;
  } catch (error) {
    throw error;
  }
};

// @desc    Update expense
// @access  Private
const updateExpense = async (expenseId, updateData) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      updateData,
      { new: true }
    );
    return updatedExpense;
  } catch (error) {
    throw error;
  }
};

// @desc    Delete expense
// @access  Private
const deleteExpense = async (expenseId) => {
  try {
    await Expense.findByIdAndDelete(expenseId);
    return { message: 'Expense deleted successfully' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
};
