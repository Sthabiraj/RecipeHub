import { model, Schema } from "mongoose";
import { IReview } from "../types/review";

const reviewSchema = new Schema<IReview>(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

export default Review;
