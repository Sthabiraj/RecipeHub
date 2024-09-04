import { z } from 'zod';

// Custom refinement function to check if value is a File
const isFile = (value: any): value is File => value instanceof File;

const recipeSchema = z.object({
  coverImage: z
    .union([
      z.custom<File>(isFile, {
        message: 'Cover image must be a file',
      }),
      z.string().url({
        message: 'Cover image must be a valid URL when not a file',
      }),
    ])
    .refine((value) => value !== null && value !== undefined, {
      message: 'Cover image is required',
    }),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  servings: z.number().int().positive('Servings must be a positive number'),
  prepTime: z.object({
    hours: z
      .number()
      .int()
      .nonnegative('Prep time hours must be a non-negative number'),
    minutes: z
      .number()
      .int()
      .min(0)
      .max(59, 'Prep time minutes must be between 0 and 59'),
  }),
  cookTime: z.object({
    hours: z
      .number()
      .int()
      .nonnegative('Cook time hours must be a non-negative number'),
    minutes: z
      .number()
      .int()
      .min(0)
      .max(59, 'Cook time minutes must be between 0 and 59'),
  }),
  ingredients: z.array(
    z.object({
      quantity: z
        .number()
        .positive('Ingredient quantity must be a positive number'),
      measurement: z.string().min(1, 'Ingredient measurement is required'),
      item: z.string().min(1, 'Ingredient item is required'),
    })
  ),
  instructions: z.array(
    z.object({
      step: z
        .number()
        .int()
        .positive('Instruction step must be a positive number'),
      instruction: z.string().min(1, 'Instruction is required'),
    })
  ),
  tags: z.object({
    cuisine: z.string().optional(),
    mealType: z.string().optional(),
    dietaryRestrictions: z.string().optional(),
    cookingMethod: z.string().optional(),
    mainIngredient: z.string().optional(),
  }),
});

export default recipeSchema;
export type RecipeFormData = z.infer<typeof recipeSchema>;
