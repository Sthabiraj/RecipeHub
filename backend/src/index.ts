import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import { authRoutes, recipeRoutes, reviewRoutes, userRoutes } from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/reviews", reviewRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

startServer();
