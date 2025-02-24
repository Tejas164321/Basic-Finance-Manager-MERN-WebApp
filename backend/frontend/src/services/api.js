import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getExpenses = (userId) => API.get(`/expenses/${userId}`);
export const addExpense = (data) => API.post("/expenses/add", data);
export const updateExpense = (id, data) => API.put(`/expenses/update/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/delete/${id}`);
