'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { CircleX, GripVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@radix-ui/react-select';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AddRecipeForm() {
  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      coverImage: '',
      title: '',
      description: '',
      servings: 0,
      prepTime: {
        hours: 0,
        minutes: 0,
      },
      cookTime: {
        hours: 0,
        minutes: 0,
      },
      ingredients: [{ quantity: 1, measurement: '', item: '' }],
      instructions: [],
      tags: [],
    },
  });

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const {
    fields: instructionFields,
    append: instructionAppend,
    remove: instruction,
  } = useFieldArray({
    control: form.control,
    name: 'instructions',
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
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Recipe Title <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Enter your recipe title' {...field} />
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
            <FormItem className='grid grid-cols-[100px_1fr] items-center'>
              <FormLabel>
                Servings <span className='text-red-500'>*</span>
              </FormLabel>
              <FormControl className='max-w-40'>
                <Input type='number' placeholder='e.g. 4' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='prepTime'
          render={() => (
            <FormItem className='grid grid-cols-[100px_1fr] items-center'>
              <FormLabel>
                Prep Time <span className='text-red-500'>*</span>
              </FormLabel>
              <div className='flex max-w-40 gap-4'>
                <FormField
                  control={form.control}
                  name='prepTime.hours'
                  render={({ field }) => (
                    <FormControl>
                      <Input type='number' placeholder='hrs' {...field} />
                    </FormControl>
                  )}
                />
                <FormField
                  control={form.control}
                  name='prepTime.minutes'
                  render={({ field }) => (
                    <FormControl>
                      <Input type='number' placeholder='mins' {...field} />
                    </FormControl>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='cookTime'
          render={() => (
            <FormItem className='grid grid-cols-[100px_1fr] items-center'>
              <FormLabel>
                Cook Time <span className='text-red-500'>*</span>
              </FormLabel>
              <div className='flex max-w-40 gap-4'>
                <FormField
                  control={form.control}
                  name='cookTime.hours'
                  render={({ field }) => (
                    <FormControl>
                      <Input type='number' placeholder='hrs' {...field} />
                    </FormControl>
                  )}
                />
                <FormField
                  control={form.control}
                  name='cookTime.minutes'
                  render={({ field }) => (
                    <FormControl>
                      <Input type='number' placeholder='mins' {...field} />
                    </FormControl>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name='ingredients'
          render={() => (
            <FormItem>
              <FormLabel>
                Ingredients <span className='text-red-500'>*</span>
              </FormLabel>
              <FormDescription>
                List one ingredient per line, specifying quantities (1, 2),
                measurements (cups, spoons), and any prep details (chopped,
                sifted) along with the item. Let your creativity flow in every
                detail!
              </FormDescription>
              {ingredientFields.map((field, index) => (
                <div
                  key={field.id}
                  className='mb-4 grid grid-cols-[30px_100px_200px_1fr_30px] items-center gap-4'
                >
                  <GripVertical size={24} className='cursor-grab' />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Qty'
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.measurement`}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Measurement' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='(none)'>(none)</SelectItem>
                          <SelectItem value='cups'>cups</SelectItem>
                          <SelectItem value='dash'>dash</SelectItem>
                          <SelectItem value='grams (g)'>grams (g)</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.item`}
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder='Item' {...field} />
                      </FormControl>
                    )}
                  />
                  <Button
                    type='button'
                    size='icon'
                    variant='ghost'
                    className='text-red-500 hover:text-red-600'
                    onClick={() => ingredientRemove(index)}
                    disabled={index === 0 && ingredientFields.length === 1}
                  >
                    <CircleX />
                  </Button>
                </div>
              ))}
              <Button
                type='button'
                className='!mt-4 flex items-center gap-2'
                onClick={() =>
                  ingredientAppend({ quantity: 1, measurement: '', item: '' })
                }
              >
                <Plus size={14} />
                Add Ingredient
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name='instructions'
          render={() => (
            <FormItem>
              <FormLabel>
                Instructions <span className='text-red-500'>*</span>
              </FormLabel>
              <FormDescription>
                Break down your recipe into clear, step-by-step instructions.
              </FormDescription>
              <FormField />
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
