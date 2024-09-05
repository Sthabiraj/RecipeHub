'use client';

import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { RecipeFormData } from '@/schemas/recipeSchema';
import { Plus } from 'lucide-react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
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
import InstructionField from './instruction-field';

export default function InstructionsField({
  form,
}: {
  form: UseFormReturn<RecipeFormData>;
}) {
  const {
    fields: instructionFields,
    append: instructionAppend,
    remove: instructionRemove,
    move: instructionMove,
    update: instructionUpdate,
  } = useFieldArray({
    control: form.control,
    name: 'instructions',
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
      const oldIndex = instructionFields.findIndex(
        (field) => field.id === active.id
      );
      const newIndex = instructionFields.findIndex(
        (field) => field.id === over?.id
      );

      instructionMove(oldIndex, newIndex);

      // Update step numbers for all instructions
      instructionFields.forEach((field, index) => {
        instructionUpdate(index, { ...field, step: index + 1 });
      });
    }
  };

  const isMultipleInstructions = instructionFields.length > 1;

  return (
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
          {isMultipleInstructions ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={instructionFields.map((field) => field.id)}
                strategy={verticalListSortingStrategy}
              >
                {instructionFields.map((field, index) => (
                  <InstructionField
                    key={field.id}
                    id={field.id}
                    form={form}
                    index={index}
                    remove={instructionRemove}
                    isRemovable={instructionFields.length === 1}
                    isDraggable={isMultipleInstructions}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            instructionFields.map((field, index) => (
              <InstructionField
                key={field.id}
                id={field.id}
                form={form}
                index={index}
                remove={instructionRemove}
                isRemovable={instructionFields.length === 1}
                isDraggable={false}
              />
            ))
          )}
          <Button
            type='button'
            className='!mt-4 flex items-center gap-2'
            onClick={() =>
              instructionAppend({
                step: instructionFields.length + 1,
                instruction: '',
              })
            }
          >
            <Plus size={14} />
            Add Instruction
          </Button>
        </FormItem>
      )}
    />
  );
}
