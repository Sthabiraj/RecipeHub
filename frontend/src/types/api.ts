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

export type RecipeResponse =
  | { success: true; data: Recipe }
  | { success: false; error: string };

export type ReviewResponse =
  | { success: true; data: Review }
  | { success: false; error: string };
