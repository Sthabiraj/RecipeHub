import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../controllers/recipe.controller";
import authenticate from "../middlewares/auth";

const recipeRoutes = Router();

recipeRoutes.post("/", authenticate, createRecipe);
recipeRoutes.get("/:id", getRecipeById);
recipeRoutes.put("/:id", authenticate, updateRecipe);
recipeRoutes.delete("/:id", authenticate, deleteRecipe);
recipeRoutes.get("/", getAllRecipes);

export default recipeRoutes;
