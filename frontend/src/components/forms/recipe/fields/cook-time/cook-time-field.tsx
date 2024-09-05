import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RecipeFormData } from '@/schemas/recipeSchema';
import { UseFormReturn } from 'react-hook-form';

export default function CookTimeField({
  form,
}: {
  form: UseFormReturn<RecipeFormData>;
}) {
  return (
    <FormField
      control={form.control}
      name='cookTime'
      render={() => (
        <FormItem className='grid grid-cols-[100px_160px_1fr] items-center'>
          <FormLabel>
            Cook Time <span className='text-red-500'>*</span>
          </FormLabel>
          <div className='flex max-w-40 gap-4'>
            <FormField
              control={form.control}
              name='cookTime.hours'
              render={({ field }) => (
                <FormControl>
                  <Input
                    type='number'
                    placeholder='hrs'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={form.formState.errors.cookTime?.hours}
                  />
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name='cookTime.minutes'
              render={({ field }) => (
                <FormControl>
                  <Input
                    type='number'
                    placeholder='mins'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={form.formState.errors.cookTime?.minutes}
                  />
                </FormControl>
              )}
            />
          </div>
          {form.formState.errors.cookTime && (
            <FormDescription className='ml-4 mt-2 list-inside list-disc !font-medium text-destructive'>
              {form.formState.errors.cookTime.hours?.message && (
                <li>{form.formState.errors.cookTime.hours.message}</li>
              )}
              {form.formState.errors.cookTime.minutes?.message && (
                <li>{form.formState.errors.cookTime.minutes.message}</li>
              )}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
