import { z } from 'zod';

const recipeSchema = z.object({
  coverImage: z
    .string()
    .url()
    .refine((value) => value.length > 0, {
      message: 'Cover image URL is required',
    }),
  title: z.string().refine((value) => value.length > 0, {
    message: 'Title is required',
  }),
  description: z.string().refine((value) => value.length > 0, {
    message: 'Description is required',
  }),
  servings: z
    .number()
    .int()
    .positive()
    .refine((value) => value > 0, {
      message: 'Servings must be a positive number',
    }),
  prepTime: z.object({
    hours: z
      .number()
      .int()
      .nonnegative()
      .refine((value) => value >= 0, {
        message: 'Prep time hours must be a non-negative number',
      }),
    minutes: z
      .number()
      .int()
      .min(0)
      .max(59)
      .refine((value) => value >= 0 && value <= 59, {
        message: 'Prep time minutes must be between 0 and 59',
      }),
  }),
  cookTime: z.object({
    hours: z
      .number()
      .int()
      .nonnegative()
      .refine((value) => value >= 0, {
        message: 'Cook time hours must be a non-negative number',
      }),
    minutes: z
      .number()
      .int()
      .min(0)
      .max(59)
      .refine((value) => value >= 0 && value <= 59, {
        message: 'Cook time minutes must be between 0 and 59',
      }),
  }),
  ingredients: z.array(
    z.object({
      quantity: z
        .number()
        .int()
        .positive()
        .refine((value) => value > 0, {
          message: 'Ingredient quantity must be a positive number',
        }),
      measurement: z.string().refine((value) => value.length > 0, {
        message: 'Ingredient measurement is required',
      }),
      item: z.string().refine((value) => value.length > 0, {
        message: 'Ingredient item is required',
      }),
    })
  ),
  instructions: z.array(
    z.object({
      step: z
        .number()
        .int()
        .positive()
        .refine((value) => value > 0, {
          message: 'Instruction step must be a positive number',
        }),
      instruction: z.string().refine((value) => value.length > 0, {
        message: 'Instruction is required',
      }),
    })
  ),
  tags: z.array(
    z
      .object({
        cuisine: z.string().refine((value) => value.length > 0, {
          message: 'Cuisine is required',
        }),
        mealType: z.string().refine((value) => value.length > 0, {
          message: 'Meal type is required',
        }),
        dietaryRestrictions: z.string().refine((value) => value.length > 0, {
          message: 'Dietary restrictions is required',
        }),
        cookingMethod: z.string().refine((value) => value.length > 0, {
          message: 'Cooking method is required',
        }),
        mainIngredient: z.string().refine((value) => value.length > 0, {
          message: 'Main ingredient is required',
        }),
      })
      .optional()
  ),
});

export default recipeSchema;
export type RecipeFormData = z.infer<typeof recipeSchema>;
