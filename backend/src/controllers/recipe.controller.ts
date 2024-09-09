import { Request, Response } from "express";
import { Recipe, User } from "../models";

// Type for creating a new recipe
interface CreateRecipeInput {
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
interface UpdateRecipeInput
  extends Partial<Omit<CreateRecipeInput, "creator">> {}

// Create a new recipe
export const createRecipe = async (
  req: Request<{}, {}, CreateRecipeInput>,
  res: Response
) => {
  try {
    const recipe = req.body;

    // Check if the user exists
    const user = await User.findById(recipe.creator);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRecipe = await Recipe.create(recipe);

    await newRecipe.save();

    return res
      .status(201)
      .json({ message: "Recipe created", recipe: newRecipe });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating recipe",
      error: (error as Error).message,
    });
  }
};

// Get recipe by ID
export const getRecipeById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "creator",
      "name email"
    );
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recipe",
      error: (error as Error).message,
    });
  }
};

// Update recipe
export const updateRecipe = async (
  req: Request<{ id: string }, {}, UpdateRecipeInput>,
  res: Response
) => {
  try {
    const newRecipe = req.body;

    // Check if the recipe exists
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Update fields
    Object.assign(recipe, newRecipe);

    await recipe.save();

    return res.json({ message: "Recipe updated sucessfully", recipe });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating recipe",
      error: (error as Error).message,
    });
  }
};

// Delete recipe
export const deleteRecipe = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting recipe",
      error: (error as Error).message,
    });
  }
};

// Get all recipe (with pagination and optional filtering)
export const getAllRecipes = async (
  req: Request<
    {},
    {},
    {},
    { page?: string; limit?: string; creator?: string; tag?: string }
  >,
  res: Response
) => {
  try {
    const page = parseInt(req.query.page || "1");
    const limit = parseInt(req.query.limit || "10");
    const skip = (page - 1) * limit;

    let query: any = {};

    // Add filters if provided
    if (req.query.creator) {
      query.creator = req.query.creator;
    }
    if (req.query.tag) {
      query["tags.cuisine"] = req.query.tag; // Example: filtering by cuisine tag
    }

    const recipes = await Recipe.find(query)
      .populate("creator", "name email")
      .skip(skip)
      .limit(limit);

    const total = await Recipe.countDocuments(query);

    res.json({
      recipes,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecipes: total,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching recipes",
      error: (error as Error).message,
    });
  }
};
