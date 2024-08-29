import { auth } from '@/auth';

import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import ProfileMenu from './profile-menu';
import { Bookmark, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function NavButtons() {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <div className='flex gap-2'>
          <Link
            href='#'
            className={cn(buttonVariants({ variant: 'ghost' }), 'px-1')}
          >
            <Bookmark className='size-7' strokeWidth={1.3} />
          </Link>
          <Link
            href='#'
            className={cn(buttonVariants({ variant: 'ghost' }), 'px-1')}
          >
            <ShoppingCart className='size-7' strokeWidth={1.3} />
          </Link>
          <ProfileMenu user={session.user} />
        </div>
      ) : (
        <Link href='/login'>
          <Button className='rounded-full text-base'>Login / Sign Up</Button>
        </Link>
      )}
    </>
  );
}
