import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RecipeFormData } from '@/schemas/recipeSchema';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';

const tagFields = [
  {
    name: 'tags.cuisine',
    placeholder: 'Cuisine',
    options: ['American', 'Chinese', 'Indian', 'Italian'],
  },
  {
    name: 'tags.mealType',
    placeholder: 'Meal Type',
    options: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
  },
  {
    name: 'tags.dietaryRestrictions',
    placeholder: 'Dietary',
    options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
  },
  {
    name: 'tags.cookingMethod',
    placeholder: 'Cooking Method',
    options: ['Bake', 'Boil', 'Fry', 'Grill'],
  },
  {
    name: 'tags.mainIngredient',
    placeholder: 'Main Ingredient',
    options: ['Chicken', 'Beef', 'Pork', 'Fish'],
  },
];

export default function TagsField({
  form,
}: {
  form: UseFormReturn<RecipeFormData>;
}) {
  return (
    <FormField
      control={form.control}
      name='tags'
      render={() => (
        <FormItem className='space-y-4'>
          <FormLabel className='flex items-center gap-2 text-lg font-semibold'>
            Tags
          </FormLabel>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
            {tagFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as any}
                render={({ field: formField }) => (
                  <Select
                    onValueChange={formField.onChange}
                    value={formField.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full border-primary/20 bg-background transition-colors hover:border-primary/40'>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {field.options.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className='cursor-pointer hover:bg-primary/10'
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
