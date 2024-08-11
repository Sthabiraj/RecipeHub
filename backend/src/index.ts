import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import { authRoutes, recipeRoutes, reviewRoutes, userRoutes } from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/review", reviewRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

startServer();
