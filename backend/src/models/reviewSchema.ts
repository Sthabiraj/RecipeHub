import { model, Schema, Types } from "mongoose";

const reviewSchema = new Schema({
  recipe: {
    type: Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  reviewer: {
    type: Types.ObjectId,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);

export default Review;
