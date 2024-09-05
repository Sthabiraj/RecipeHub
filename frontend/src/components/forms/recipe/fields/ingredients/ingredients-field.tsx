'use client';

import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { RecipeFormData } from '@/schemas/recipeSchema';
import { Plus } from 'lucide-react';
import IngredientField from './ingredient-field';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function IngredientsField({
  form,
}: {
  form: UseFormReturn<RecipeFormData>;
}) {
  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
    move: ingredientMove,
  } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = ingredientFields.findIndex(
        (field) => field.id === active.id
      );
      const newIndex = ingredientFields.findIndex(
        (field) => field.id === over?.id
      );
      ingredientMove(oldIndex, newIndex);
    }
  };

  const isMultipleIngredients = ingredientFields.length > 1;

  return (
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
            measurements (cups, spoons), and any prep details (chopped, sifted)
            along with the item. Let your creativity flow in every detail!
          </FormDescription>
          {isMultipleIngredients ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={ingredientFields.map((field) => field.id)}
                strategy={verticalListSortingStrategy}
              >
                {ingredientFields.map((field, index) => (
                  <IngredientField
                    key={field.id}
                    id={field.id}
                    form={form}
                    index={index}
                    remove={ingredientRemove}
                    isRemovable={ingredientFields.length === 1}
                    isDraggable={isMultipleIngredients}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            ingredientFields.map((field, index) => (
              <IngredientField
                key={field.id}
                id={field.id}
                form={form}
                index={index}
                remove={ingredientRemove}
                isRemovable={ingredientFields.length === 1}
                isDraggable={false}
              />
            ))
          )}
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
        </FormItem>
      )}
    />
  );
}
