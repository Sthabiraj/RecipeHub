export interface IRecipe {
  _id?: string;
  creator: string;
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

// Type for creating a new recipe
export interface CreateRecipeInput {
  creator: string; // User ID
  title: string;
  description: string;
  coverImage: string;
  servings: number;
  prepTime: { hours: number; minutes: number };
  cookTime: { hours: number; minutes: number };
  ingredients: Array<{ quantity: number; measurement: string; item: string }>;
  instructions: Array<{ step: number; instruction: string }>;
  tags: string[];
}

// Type for updating a recipe
export interface UpdateRecipeInput
  extends Partial<Omit<CreateRecipeInput, "creator">> {}
