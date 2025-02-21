import express from 'express';  // Import Express
import dotenv from 'dotenv';    // Import dotenv to load environment variables
import connectDB from './config/db.js';  // Import the database connection function

// Initialize dotenv to read .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();  // Create an instance of Express
const PORT = process.env.PORT || 3000;  // Set the port from environment variables or default to 3000

// Middleware to parse JSON data in the request body
app.use(express.json());

// Import the routes here
import goalRoutes from './routes/goalRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Use the routes
app.use('/api/goals', goalRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

