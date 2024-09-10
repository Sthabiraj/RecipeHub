'use server';

import { auth, signIn, signOut } from './auth';
import { LoginFormData } from './schemas/loginSchema';
import { RecipeFormData } from './schemas/recipeSchema';
import { recipeService } from './services';

export const loginAction = async (userData: LoginFormData) => {
  await signIn('credentials', userData);
};

export const logoutAction = async () => {
  await signOut();
};

export const createRecipeAction = async (recipeData: RecipeFormData) => {
  const session = await auth();

  return await recipeService.createRecipe({
    ...recipeData,
    coverImage: recipeData.coverImage as string,
    creator: session?.user.id as string,
  });
};
