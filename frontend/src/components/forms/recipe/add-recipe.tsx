'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import recipeSchema, { RecipeFormData } from '@/schemas/recipeSchema';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import ImageInput from '@/components/inputs/image-input';
import IngredientsField from './fields/ingredients/ingredients-field';
import InstructionsField from './fields/instructions/instructions-field';
import PrepTimeField from './fields/prep-time/prep-time-field';
import CookTimeField from './fields/cook-time/cook-time-field';
import TagsField from './fields/tags/tags-field';

export default function AddRecipeForm() {
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      coverImage: '', // This will be updated when an image is selected
      title: '',
      description: '',
      servings: 1, // Set a default value of 1
      prepTime: {
        hours: 0,
        minutes: 0,
      },
      cookTime: {
        hours: 0,
        minutes: 0,
      },
      ingredients: [{ quantity: 1, measurement: '', item: '' }],
      instructions: [{ step: 1, instruction: '' }],
      tags: {
        cuisine: '',
        mealType: '',
        dietaryRestrictions: '',
        cookingMethod: '',
        mainIngredient: '',
      },
    },
  });

  function onSubmit(data: RecipeFormData) {
    console.log(data);
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Separator />
        <FormField
          control={form.control}
          name='coverImage'
          render={({ field }) => <ImageInput field={field} form={form} />}
        />
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Recipe Title <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your recipe title'
                  error={form.formState.errors.title}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe your recipe in a way that makes mouths water.'
                  {...field}
                  rows={4}
                  error={form.formState.errors.description}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name='servings'
          render={({ field }) => (
            <FormItem className='grid grid-cols-[100px_160px_1fr] items-center'>
              <FormLabel>
                Servings <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='e.g. 4'
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={form.formState.errors.servings}
                />
              </FormControl>
              <FormMessage className='ml-4' />
            </FormItem>
          )}
        />
        <PrepTimeField form={form} />
        <CookTimeField form={form} />
        <Separator />
        <IngredientsField form={form} />
        <Separator />
        <InstructionsField form={form} />
        <Separator />
        <TagsField form={form} />
        <div className='flex justify-end gap-4'>
          <Button variant='outline'>Cancel</Button>
          <Button>Submit Recipe</Button>
        </div>
        <Separator />
        <FormDescription>
          If you&rsquo;ve come across this recipe in a magazine, cookbook, or on
          another website, we&rsquo;re unable to publish it here. Our platform
          thrives on originality, and published recipes must adhere to our Terms
          of Service. Let&rsquo;s keep the kitchen creativity flowing with your
          unique recipes.
        </FormDescription>
      </form>
    </Form>
  );
}
