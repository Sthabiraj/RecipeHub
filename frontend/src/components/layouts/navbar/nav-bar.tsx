import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NavButtons from './nav-buttons';
import { Plus } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className='sticky left-0 right-0 top-0 z-10 flex items-center justify-between px-24 py-4 shadow'>
      <div className='flex items-center gap-6'>
        <h1 className='text-3xl font-bold'>
          Recipe<span className='text-[#407948]'>Hub</span>
        </h1>
        <div className='flex gap-4'>
          <Link href='#' className={cn(buttonVariants({ variant: 'link' }))}>
            Popular
          </Link>
          <Link href='#' className={cn(buttonVariants({ variant: 'link' }))}>
            Ingredients
          </Link>
          <Link href='#' className={cn(buttonVariants({ variant: 'link' }))}>
            Meals & Dishes
          </Link>
          <Link href='#' className={cn(buttonVariants({ variant: 'link' }))}>
            Diets
          </Link>
          <Link href='#' className={cn(buttonVariants({ variant: 'link' }))}>
            Occasions
          </Link>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          className='flex items-center gap-1 rounded-full text-base'
        >
          <Plus className='size-4' />
          <span>Add a recipe</span>
        </Button>
        <NavButtons />
      </div>
    </nav>
  );
}
