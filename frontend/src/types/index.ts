export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  bio: string;
  address: string;
  profileImage: string;
  socialLinks: {
    name: string;
    url: string;
  }[];
  recipes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface AuthResponse extends ApiResponse {
  user?: User;
}

export interface UserResponse extends ApiResponse {
  user?: User;
}

export interface RecipeResponse extends ApiResponse {
  recipe?: Recipe;
}

export interface ReviewResponse extends ApiResponse {
  review?: Review;
}

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

export interface Review {
  recipe: string; // Recipe ID
  reviewer: string; // User ID
  rating: number;
  review?: string;
}
