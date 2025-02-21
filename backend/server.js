import express from "express";
import connectDB from "./config/db.js"; // Import the connection function
import dotenv from "dotenv";

dotenv.config();
connectDB(); // Call the function to connect

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
