import { Request, Response } from "express";
import { Recipe, User } from "../models";
import {
  ApiResponse,
  CreateRecipeInput,
  IRecipe,
  UpdateRecipeInput,
} from "../types";

// Create a new recipe
export const createRecipe = async (
  req: Request<{}, {}, CreateRecipeInput>,
  res: Response<ApiResponse<IRecipe>>
) => {
  try {
    const recipe = req.body;

    // Check if the user exists
    const user = await User.findById(recipe.creator);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const newRecipe = await Recipe.create(recipe);

    await newRecipe.save();

    return res.status(201).json({
      success: true,
      data: newRecipe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error creating recipe",
    });
  }
};

// Get recipe by ID
export const getRecipeById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IRecipe>>
) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "creator",
      "name email"
    );
    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: "Recipe not found",
      });
    }
    res.json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching recipe",
    });
  }
};

// Update recipe
export const updateRecipe = async (
  req: Request<{ id: string }, {}, UpdateRecipeInput>,
  res: Response<ApiResponse<IRecipe>>
) => {
  try {
    const newRecipe = req.body;

    // Check if the recipe exists
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: "Recipe not found",
      });
    }

    // Update fields
    Object.assign(recipe, newRecipe);

    await recipe.save();

    return res.json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error updating recipe",
    });
  }
};

// Delete recipe
export const deleteRecipe = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<null>>
) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: "Recipe not found",
      });
    }
    res.json({
      success: true,
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error deleting recipe",
    });
  }
};

export const getAllRecipes = async (
  req: Request<
    {},
    {},
    {},
    { page?: string; limit?: string; creator?: string; tag?: string }
  >,
  res: Response<ApiResponse<IRecipe[]>>
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
      success: true,
      data: recipes,
      // currentPage: page,
      // totalPages: Math.ceil(total / limit),
      // totalRecipes: total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error fetching recipes",
    });
  }
};
