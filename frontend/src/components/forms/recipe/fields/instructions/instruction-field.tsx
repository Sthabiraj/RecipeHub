import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { RecipeFormData } from '@/schemas/recipeSchema';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical, CircleX } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CSS } from '@dnd-kit/utilities';

interface InstructionFieldProps {
  id: string;
  form: UseFormReturn<RecipeFormData>;
  index: number;
  remove: (index: number) => void;
  isRemovable: boolean;
  isDraggable: boolean;
}

export default function InstructionField({
  id,
  form,
  index,
  remove,
  isRemovable,
  isDraggable,
}: InstructionFieldProps) {
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
      <div className='grid grid-cols-[30px_1fr_30px] items-center gap-4'>
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
          name={`instructions.${index}.instruction`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={`Step ${index + 1}`}
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={
                    form.formState.errors.instructions?.[index]?.instruction
                  }
                />
              </FormControl>
            </FormItem>
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
      {form.formState.errors.instructions?.[index]?.instruction && (
        <FormDescription className='mt-2 !font-medium text-destructive'>
          {form.formState.errors.instructions[index].instruction?.message}
        </FormDescription>
      )}
    </div>
  );
}
