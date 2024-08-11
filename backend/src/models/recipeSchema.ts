import { model, Schema, Types } from "mongoose";

const recipeSchema = new Schema({
  creator: {
    type: Types.ObjectId,
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
  tags: {
    cuisine: {
      type: String,
      trim: true,
    },
    mealType: {
      type: String,
      trim: true,
    },
    dietaryRestrictions: {
      type: String,
      trim: true,
    },
    cookingMethod: {
      type: String,
      trim: true,
    },
    mainIngredient: {
      type: String,
      trim: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

recipeSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
