import { Recipe, Review, User } from '.';

export interface ApiResponse {
  success: boolean;
  message?: string;
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
