const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Expense", ExpenseSchema);
