import { Request, Response } from "express";
import { Recipe, User, Review } from "../models";

interface CreateReviewInput {
  recipe: string;
  reviewer: string;
  rating: number;
  review?: string;
}

interface UpdateReviewInput
  extends Partial<Omit<CreateReviewInput, "recipe">> {}

// Create new review
const createReview = async (
  req: Request<{}, {}, CreateReviewInput>,
  res: Response
) => {
  try {
    const { recipe, reviewer, rating, review } = req.body;

    //   Check if the recipe exist
    const recipeExists = await Recipe.findById(recipe);
    if (!recipeExists) {
      return res.status(400).json({ error: "Recipe not found" });
    }

    //   Check if the reviewer exist
    const reviewerExists = await User.findById(reviewer);
    if (!reviewerExists) {
      return res.status(400).json({ error: "Reviewer not found" });
    }

    //   Create new review
    const newReview = await Review.create({
      recipe,
      reviewer,
      rating,
      review,
    });

    return res
      .status(201)
      .json({ message: "Review created sucessfully", newReview });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating review",
      error: (error as Error).message,
    });
  }
};

// Get all reviews of the recipe
const getReviews = async (
  req: Request<{ recipeId: string }>,
  res: Response
) => {
  try {
    const { recipeId } = req.params;

    //   Check if the recipe exist
    const recipeExists = await Recipe.findById(recipeId);
    if (!recipeExists) {
      return res.status(400).json({ error: "Recipe not found" });
    }

    //   Get all reviews of the recipe
    const reviews = await Review.find({ recipe: recipeId }).populate(
      "reviewer"
    );

    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting reviews",
      error: (error as Error).message,
    });
  }
};

// Update review
const updateReview = async (
  req: Request<{ id: string }, {}, UpdateReviewInput>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const review = req.body;

    //   Check if the review exist
    const reviewExists = await Review.findById(id);
    if (!reviewExists) {
      return res.status(400).json({ error: "Review not found" });
    }

    //   Update fields
    Object.assign(reviewExists, review);

    await reviewExists.save();

    return res.json({
      message: "Review updated sucessfully",
      review: reviewExists,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating review",
      error: (error as Error).message,
    });
  }
};

// Delete review
const deleteReview = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    //   Check if the review exist
    const reviewExists = await Review.findByIdAndDelete(id);
    if (!reviewExists) {
      return res.status(400).json({ error: "Review not found" });
    }

    return res.json({ message: "Review deleted sucessfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting review",
      error: (error as Error).message,
    });
  }
};

export { createReview, getReviews, updateReview, deleteReview };
