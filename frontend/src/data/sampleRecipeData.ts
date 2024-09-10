import { RecipeFormData } from '@/schemas/recipeSchema';

const sampleRecipeData: RecipeFormData = {
  coverImage:
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Example URL for the cover image
  title: 'Fluffy Pancakes',
  description:
    'A simple recipe for fluffy, homemade pancakes that are perfect for breakfast.',
  servings: 4,
  prepTime: {
    hours: 0,
    minutes: 15,
  },
  cookTime: {
    hours: 0,
    minutes: 20,
  },
  ingredients: [
    {
      quantity: 1.5,
      measurement: 'cups',
      item: 'all-purpose flour',
    },
    {
      quantity: 1,
      measurement: 'tbsp',
      item: 'sugar',
    },
    {
      quantity: 1,
      measurement: 'tbsp',
      item: 'baking powder',
    },
    {
      quantity: 0.5,
      measurement: 'tsp',
      item: 'salt',
    },
    {
      quantity: 1,
      measurement: 'cup',
      item: 'milk',
    },
    {
      quantity: 1,
      measurement: 'unit',
      item: 'large egg',
    },
    {
      quantity: 2,
      measurement: 'tbsp',
      item: 'unsalted butter, melted',
    },
    {
      quantity: 1,
      measurement: 'tsp',
      item: 'vanilla extract',
    },
  ],
  instructions: [
    {
      step: 1,
      instruction:
        'In a large bowl, whisk together the flour, sugar, baking powder, and salt.',
    },
    {
      step: 2,
      instruction:
        'In another bowl, whisk together the milk, egg, melted butter, and vanilla extract.',
    },
    {
      step: 3,
      instruction:
        'Pour the wet ingredients into the dry ingredients and stir until just combined.',
    },
    {
      step: 4,
      instruction:
        'Heat a non-stick skillet over medium heat. Grease lightly with butter or oil.',
    },
    {
      step: 5,
      instruction:
        'Pour 1/4 cup of batter onto the skillet for each pancake. Cook until bubbles form on the surface, then flip and cook until golden brown on the other side.',
    },
    {
      step: 6,
      instruction:
        'Serve warm with your favorite toppings like maple syrup, fresh berries, or whipped cream.',
    },
  ],
  tags: ['breakfast', 'pancakes', 'easy', 'quick', 'family-friendly'],
};

export default sampleRecipeData;
