import { Router } from "express";
import {
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";
import { verifyToken } from "../middlewares";

const reviewRoutes = Router();

reviewRoutes.post("/", verifyToken, createReview);
reviewRoutes.put("/:reviewId", verifyToken, updateReview);
reviewRoutes.delete("/:reviewId", verifyToken, deleteReview);

export default reviewRoutes;
