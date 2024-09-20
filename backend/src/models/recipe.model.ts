import { model, Schema, Types } from "mongoose";
import { IRecipe } from "../types";

const recipeSchema = new Schema<IRecipe>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    prepTime: {
      hours: {
        type: Number,
        min: 0,
        default: 0,
      },
      minutes: {
        type: Number,
        min: 0,
        max: 59,
        required: true,
      },
    },
    cookTime: {
      hours: {
        type: Number,
        min: 0,
        default: 0,
      },
      minutes: {
        type: Number,
        min: 0,
        max: 59,
        required: true,
      },
    },
    ingredients: [
      {
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        measurement: {
          type: String,
          required: true,
          trim: true,
        },
        item: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    instructions: [
      {
        step: {
          type: Number,
          required: true,
          min: 1,
        },
        instruction: {
          type: String,
          required: true,
        },
      },
    ],
    tags: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
