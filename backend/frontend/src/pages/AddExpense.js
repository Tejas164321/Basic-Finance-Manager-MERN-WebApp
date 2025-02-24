import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/expenses", { title, amount });
    alert("Expense Added!");
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="Expense Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
