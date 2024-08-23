export interface Recipe {
  creator: string; // User ID
  title: string;
  description: string;
  coverImage: string;
  servings: number;
  prepTime: { hours: number; minutes: number };
  cookTime: { hours: number; minutes: number };
  ingredients: Array<{ quantity: number; measurement: string; item: string }>;
  instructions: Array<{ step: number; instruction: string }>;
  tags: {
    cuisine?: string;
    mealType?: string;
    dietaryRestrictions?: string;
    cookingMethod?: string;
    mainIngredient?: string;
  };
}
