import { Router } from "express";
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";

const reviewRoutes = Router();

reviewRoutes.post("/", createReview);
reviewRoutes.get("/:recipeId", getReviews);
reviewRoutes.put("/:id", updateReview);
reviewRoutes.delete("/:id", deleteReview);

export default reviewRoutes;
