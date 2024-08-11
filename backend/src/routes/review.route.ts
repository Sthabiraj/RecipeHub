import { Router } from "express";
import * as review from "../controllers/review.controller";
import authenticate from "../middlewares/auth";

const reviewRoutes = Router();

reviewRoutes.post("/", authenticate, review.createReview);
reviewRoutes.get("/:recipeId", review.getReviews);
reviewRoutes.put("/:id", authenticate, review.updateReview);
reviewRoutes.delete("/:id", authenticate, review.deleteReview);

export default reviewRoutes;
