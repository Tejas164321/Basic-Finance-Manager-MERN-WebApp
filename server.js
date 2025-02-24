require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./backend/config/db");
const path = require("path");

const app = express();

console.log('Initializing database connection...');
connectDB();
console.log('Database connection initialized');


app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./backend/routes/authRoutes"));

app.use("/api/expenses", require("./backend/routes/expenseRoutes"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Error handling middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'backend/frontend/build')));

  // Serve index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'backend', 'frontend', 'build', 'index.html'));
  });
} else {
  // Handle 404 in development
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Resource not found'
    });
  });
}


const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET /api/health - Health check');
  console.log('  POST /api/auth/register - User registration');
  console.log('  POST /api/auth/login - User login');
  console.log('  GET /api/expenses - Get all expenses');
  console.log('  POST /api/expenses - Add new expense');
  console.log('  PUT /api/expenses/:id - Update expense');
  console.log('  DELETE /api/expenses/:id - Delete expense');
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
