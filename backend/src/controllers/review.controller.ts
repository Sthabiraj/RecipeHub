import { Request, Response } from "express";
import { Recipe, Review } from "../models";
import {
  ApiResponse,
  IReview,
  CreateReviewInput,
  UpdateReviewInput,
} from "../types";
import { Types } from "mongoose";

// Create new review
export const createReview = async (
  req: Request<{}, {}, CreateReviewInput>,
  res: Response<ApiResponse<IReview>>
) => {
  try {
    const { recipeId, rating, review } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    if (!Types.ObjectId.isValid(recipeId) || !Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid recipe or user ID" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ success: false, error: "Rating must be between 1 and 5" });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe not found" });
    }

    const existingReview = await Review.findOne({
      recipe: recipeId,
      reviewer: userId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ success: false, error: "Review already exists" });
    }

    const newReview = new Review({
      recipe: recipeId,
      reviewer: userId,
      rating,
      review,
    });

    await newReview.save();

    // Update recipe's average rating and review count
    recipe.reviewCount += 1;
    recipe.averageRating =
      (recipe.averageRating * (recipe.reviewCount - 1) + rating) /
      recipe.reviewCount;
    await recipe.save();

    return res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error creating review",
    });
  }
};

// Get all reviews of the recipe
export const getReviews = async (
  req: Request<{ recipeId: string }>,
  res: Response<ApiResponse<IReview[]>>
) => {
  try {
    const { recipeId } = req.params;

    if (!Types.ObjectId.isValid(recipeId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid recipe ID" });
    }

    //   Check if the recipe exist
    const recipeExists = await Recipe.findById(recipeId);
    if (!recipeExists) {
      return res
        .status(400)
        .json({ success: false, error: "Recipe not found" });
    }

    //   Get all reviews of the recipe
    const reviews = await Review.find({ recipe: recipeId }).populate(
      "reviewer"
    );

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error getting reviews",
    });
  }
};

// Update review
export const updateReview = async (
  req: Request<{ reviewId: string }, {}, UpdateReviewInput>,
  res: Response<ApiResponse<IReview>>
) => {
  try {
    const { reviewId } = req.params;
    const { rating, review } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    if (!Types.ObjectId.isValid(reviewId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid review ID" });
    }

    //   Check if the review exist
    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res
        .status(400)
        .json({ success: false, error: "Review not found" });
    }

    //   Check if the user is the owner of the review
    if (existingReview.reviewer.toString() !== userId) {
      return res.status(401).json({
        success: false,
        error: "You are not authorized to update this review",
      });
    }

    const oldRating = existingReview.rating;
    existingReview.rating = rating || existingReview.rating;
    existingReview.review = review || existingReview.review;

    await existingReview.save();

    // Update recipe's average rating
    const recipe = await Recipe.findById(existingReview.recipe);
    if (recipe) {
      recipe.averageRating =
        (recipe.averageRating * recipe.reviewCount -
          oldRating +
          existingReview.rating) /
        recipe.reviewCount;
      await recipe.save();
    }

    return res.status(200).json({
      success: true,
      data: existingReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error updating review",
    });
  }
};

// Delete review
export const deleteReview = async (
  req: Request<{ reviewId: string }>,
  res: Response<ApiResponse<null>>
) => {
  try {
    const { reviewId } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "User not authenticated",
      });
    }

    if (!Types.ObjectId.isValid(reviewId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid review ID" });
    }

    //   Check if the review exist
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(400).json({
        success: false,
        error: "Review not found",
      });
    }

    //   Check if the user is the owner of the review
    if (review.reviewer.toString() !== userId) {
      return res.status(401).json({
        success: false,
        error: "You are not authorized to delete this review",
      });
    }

    await Review.findByIdAndDelete(reviewId);

    // Update recipe's average rating and review count
    const recipe = await Recipe.findById(review.recipe);
    if (recipe) {
      recipe.reviewCount -= 1;
      if (recipe.reviewCount > 0) {
        recipe.averageRating =
          (recipe.averageRating * (recipe.reviewCount + 1) - review.rating) /
          recipe.reviewCount;
      } else {
        recipe.averageRating = 0;
      }
      await recipe.save();
    }

    return res.json({
      success: true,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error deleting review",
    });
  }
};
