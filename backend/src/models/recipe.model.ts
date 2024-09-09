import { model, Schema, Types } from "mongoose";

export interface IRecipe {
  _id: string;
  creator: Types.ObjectId;
  coverImage: string;
  title: string;
  description: string;
  servings: number;
  prepTime: {
    hours: number;
    minutes: number;
  };
  cookTime: {
    hours: number;
    minutes: number;
  };
  ingredients: {
    quantity: number;
    measurement: string;
    item: string;
  }[];
  instructions: {
    step: number;
    instruction: string;
  }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

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
  },
  {
    timestamps: true,
  }
);

recipeSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
