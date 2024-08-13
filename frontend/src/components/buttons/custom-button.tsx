import React from 'react';
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
}

export default function CustomButton({
  children,
  className,
  isLoading,
  loadingText,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn(className, 'py-6 text-base font-medium')}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoaderCircle className='mr-2 h-6 w-6 animate-spin' />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
