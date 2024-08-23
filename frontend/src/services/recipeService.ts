import { RecipeResponse, Recipe } from '@/types';
import { api } from '@/lib/api';

export const recipeService = {
  createRecipe: async (recipeData: Recipe) => {
    const response = await api.post<RecipeResponse>('/recipe', recipeData);
    return response.data;
  },
  getRecipe: async (id: string) => {
    const response = await api.get<RecipeResponse>(`/recipe/${id}`);
    return response.data;
  },
  updateRecipe: async (id: string, recipeData: Partial<Recipe>) => {
    const response = await api.put<RecipeResponse>(`/recipe/${id}`, recipeData);
    return response.data;
  },
  deleteRecipe: async (id: string) => {
    const response = await api.delete<RecipeResponse>(`/recipe/${id}`);
    return response.data;
  },
  getAllRecipes: async () => {
    const response = await api.get<RecipeResponse>('/recipe');
    return response.data;
  },
};
