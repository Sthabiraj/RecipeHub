import React, { useEffect } from 'react';
import { RecipeFormData } from '@/schemas/recipeSchema';
import { ControllerRenderProps } from 'react-hook-form';
import { FormItem, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ImageInput({
  field,
}: {
  field: ControllerRenderProps<RecipeFormData>;
}) {
  const [preview, setPreview] = React.useState<string | null>(null);

  useEffect(() => {
    if (typeof field.value === 'string') {
      setPreview(field.value);
    }
  }, [field.value]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        field.onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    field.onChange(null);
  };

  return (
    <FormItem>
      <div
        className={cn(
          'relative flex flex-col items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-foreground/40 bg-primary/10',
          preview ? 'h-80' : 'h-36'
        )}
      >
        {preview ? (
          <div className='relative h-full w-full'>
            <Image
              src={preview}
              alt='Cover'
              layout='fill'
              objectFit='cover'
              className='rounded-md'
            />
            <Button
              type='button'
              variant='destructive'
              size='icon'
              className='absolute right-2 top-2 z-auto'
              onClick={handleRemove}
            >
              <X className='size-4' />
            </Button>
          </div>
        ) : (
          <div className='flex h-full flex-col items-center justify-center'>
            <Button
              type='button'
              className='mb-2 rounded-full'
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <Upload className='mr-2 size-6' />
              Upload Cover Image
            </Button>
            <p className='text-sm text-foreground/60'>
              Recommended size: 1200x800 px
            </p>
          </div>
        )}
        <input
          id='fileInput'
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleFileSelect}
        />
      </div>
      <FormMessage />
    </FormItem>
  );
}
