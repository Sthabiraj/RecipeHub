'use client';

import React, { useState, useRef, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { RecipeFormData } from '@/schemas/recipeSchema';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const predefinedTags = [
  'American',
  'Chinese',
  'Indian',
  'Italian',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Bake',
  'Boil',
  'Fry',
  'Grill',
  'Chicken',
  'Beef',
  'Pork',
  'Fish',
];

export default function TagsField({
  form,
}: {
  form: UseFormReturn<RecipeFormData>;
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedTags = form.watch('tags') || [];

  const addTag = (tag: string) => {
    const normalizedTag = tag.trim().toLowerCase();
    if (normalizedTag && !selectedTags.includes(normalizedTag)) {
      form.setValue('tags', [...selectedTags, normalizedTag], {
        shouldValidate: true,
      });
    }
    setInputValue('');
    setOpen(false);
    inputRef.current?.focus();
  };

  const removeTag = (tag: string) => {
    form.setValue(
      'tags',
      selectedTags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  const filteredTags = predefinedTags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(tag.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && inputValue) {
        e.preventDefault();
        addTag(inputValue);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <FormField
      control={form.control}
      name='tags'
      render={() => (
        <FormItem className='flex flex-col'>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <div
              className={cn(
                'flex flex-wrap items-center gap-2 rounded-md border border-input',
                'px-3 py-2 text-sm ring-offset-background',
                'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
                'transition-all duration-200'
              )}
            >
              {selectedTags.map((tag) => (
                <TooltipProvider key={tag}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant='secondary'
                        className='text-sm duration-200 animate-in fade-in-50'
                      >
                        {tag}
                        <button
                          type='button'
                          onClick={() => removeTag(tag)}
                          className='ml-1 text-muted-foreground transition-colors hover:text-foreground'
                        >
                          <X className='h-3 w-3' />
                        </button>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to remove</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              <Command className='overflow-visible bg-transparent'>
                <div className='flex items-center'>
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setTimeout(() => setOpen(false), 200)}
                    className='flex w-full bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
                    placeholder='Add tags...'
                  />
                </div>
                {open && (
                  <div className='relative mt-2'>
                    <CommandList className='absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-80 slide-in-from-top-5'>
                      <CommandEmpty>No tags found.</CommandEmpty>
                      <CommandGroup>
                        {filteredTags.map((tag) => (
                          <CommandItem key={tag} onSelect={() => addTag(tag)}>
                            <Plus className='mr-2 h-4 w-4' />
                            {tag}
                          </CommandItem>
                        ))}
                        {inputValue && !filteredTags.includes(inputValue) && (
                          <CommandItem onSelect={() => addTag(inputValue)}>
                            <Plus className='mr-2 h-4 w-4' />
                            Add &quot;{inputValue}&quot;
                          </CommandItem>
                        )}
                      </CommandGroup>
                    </CommandList>
                  </div>
                )}
              </Command>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
