import React, { forwardRef } from 'react';
import { Input, InputProps } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';

interface CustomInputProps extends InputProps {
  label: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: FieldError;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    { label, className, labelClassName, inputClassName, error, ...props },
    ref
  ) => {
    return (
      <div className={cn('space-y-1', className)}>
        <Label className={cn('text-base', labelClassName)}>{label}</Label>
        <Input
          ref={ref}
          className={cn('py-6', inputClassName, error && 'border-red-500')}
          {...props}
        />
        {error && <p className='text-sm text-red-500'>{error.message}</p>}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
