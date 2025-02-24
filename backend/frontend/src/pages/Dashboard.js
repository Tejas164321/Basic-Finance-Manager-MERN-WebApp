import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setExpenses(res.data);
      } catch (error) {
        alert("Session expired! Please log in again.");
        navigate("/");
      }
    };
    fetchExpenses();
  }, [navigate]);



  return (
    <div>
      <h2>Expense Dashboard</h2>
      <button onClick={() => navigate("/add-expense")}>Add Expense</button>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
             {expense.title} - ₹{expense.amount}
            <button onClick={() => navigate(`/edit-expense/${expense._id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
