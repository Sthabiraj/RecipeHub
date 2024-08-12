import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipe.controller";

const recipeRoutes = Router();

recipeRoutes.post("/", createRecipe);
recipeRoutes.get("/:id", getRecipeById);
recipeRoutes.put("/:id", updateRecipe);
recipeRoutes.delete("/:id", deleteRecipe);
recipeRoutes.get("/", getAllRecipes);

export default recipeRoutes;
