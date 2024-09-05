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

export default function PrepTimeField({
  form,
}: {
  form: UseFormReturn<RecipeFormData>;
}) {
  return (
    <FormField
      control={form.control}
      name='prepTime'
      render={() => (
        <FormItem className='grid grid-cols-[100px_160px_1fr] items-center'>
          <FormLabel>
            Prep Time <span className='text-red-500'>*</span>
          </FormLabel>
          <div className='flex max-w-40 gap-4'>
            <FormField
              control={form.control}
              name='prepTime.hours'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='hrs'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      error={form.formState.errors.prepTime?.hours}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='prepTime.minutes'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='mins'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      error={form.formState.errors.prepTime?.minutes}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {form.formState.errors.prepTime && (
            <FormDescription className='ml-4 mt-2 list-inside list-disc !font-medium text-destructive'>
              {form.formState.errors.prepTime.hours?.message && (
                <li>{form.formState.errors.prepTime.hours.message}</li>
              )}
              {form.formState.errors.prepTime.minutes?.message && (
                <li>{form.formState.errors.prepTime.minutes.message}</li>
              )}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
