import { Types } from "mongoose";

export interface IReview {
  recipe: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  review: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReviewInput {
  recipeId: string;
  rating: number;
  review: string;
}

export interface UpdateReviewInput
  extends Partial<Omit<CreateReviewInput, "recipeId">> {}
