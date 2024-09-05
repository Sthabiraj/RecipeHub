'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormField, FormControl, FormDescription } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { GripVertical, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { RecipeFormData } from '@/schemas/recipeSchema';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IngredientFieldProps {
  id: string;
  form: UseFormReturn<RecipeFormData>;
  index: number;
  remove: (index: number) => void;
  isRemovable: boolean;
  isDraggable: boolean;
}

const IngredientField = ({
  id,
  form,
  index,
  remove,
  isRemovable,
  isDraggable,
}: IngredientFieldProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !isDraggable,
  });

  const style = isDraggable
    ? {
        transform: CSS.Transform.toString(transform),
        transition,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'mb-4 rounded-md p-2',
        isDragging && 'z-10 border bg-background shadow-lg'
      )}
    >
      <div className='grid grid-cols-[30px_100px_200px_1fr_30px] items-center gap-4'>
        <div
          {...attributes}
          {...listeners}
          className={cn(
            isDraggable
              ? 'cursor-grab active:cursor-grabbing'
              : 'cursor-default',
            isDragging && 'cursor-grabbing'
          )}
        >
          <GripVertical
            size={24}
            className={isDraggable ? '' : 'text-muted-foreground'}
          />
        </div>
        <FormField
          control={form.control}
          name={`ingredients.${index}.quantity`}
          render={({ field }) => (
            <FormControl>
              <Input
                type='number'
                placeholder='Qty'
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={form.formState.errors.ingredients?.[index]?.quantity}
              />
            </FormControl>
          )}
        />
        <FormField
          control={form.control}
          name={`ingredients.${index}.measurement`}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger
                  className={cn(
                    form.formState.errors.ingredients?.[index]?.measurement &&
                      'border-destructive/40 bg-destructive/10 text-destructive/90 focus-visible:ring-destructive'
                  )}
                >
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
              <Input
                placeholder='Item'
                {...field}
                error={form.formState.errors.ingredients?.[index]?.item}
              />
            </FormControl>
          )}
        />
        <Button
          type='button'
          size='icon'
          variant='ghost'
          className='text-destructive hover:text-red-600'
          onClick={() => remove(index)}
          disabled={isRemovable}
        >
          <CircleX />
        </Button>
      </div>
      {form.formState.errors.ingredients?.[index] && (
        <FormDescription className='mt-2 list-inside list-disc !font-medium text-destructive'>
          {form.formState.errors.ingredients[index].quantity?.message && (
            <li>{form.formState.errors.ingredients[index].quantity.message}</li>
          )}
          {form.formState.errors.ingredients[index].measurement?.message && (
            <li>
              {form.formState.errors.ingredients[index].measurement.message}
            </li>
          )}
          {form.formState.errors.ingredients[index].item?.message && (
            <li>{form.formState.errors.ingredients[index].item.message}</li>
          )}
        </FormDescription>
      )}
    </div>
  );
};

export default IngredientField;
