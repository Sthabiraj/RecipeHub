import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipe.controller";
import { verifyToken } from "../middlewares";
import { getReviews } from "../controllers/review.controller";

const recipeRoutes = Router();

recipeRoutes.post("/", verifyToken, createRecipe);
recipeRoutes.get("/:id", getRecipeById);
recipeRoutes.put("/:id", verifyToken, updateRecipe);
recipeRoutes.delete("/:id", verifyToken, deleteRecipe);
recipeRoutes.get("/", getAllRecipes);
recipeRoutes.get("/:recipeId/reviews", getReviews);

export default recipeRoutes;
