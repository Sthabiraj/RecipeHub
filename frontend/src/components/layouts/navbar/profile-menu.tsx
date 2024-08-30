'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  ChevronUp,
  CircleUser,
  Moon,
  Settings,
  User,
} from 'lucide-react';
import LogoutButton from './logout-button';
import { cn, getInitials } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useState } from 'react';
import { User as IUser } from 'next-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileMenu({ user }: { user: IUser }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', className: 'px-1' }),
          'flex items-center gap-1 focus-visible:ring-0'
        )}
      >
        <CircleUser className='size-7' strokeWidth={1.5} />
        {isOpen ? (
          <ChevronUp className='size-5' strokeWidth={1.5} />
        ) : (
          <ChevronDown className='size-5' strokeWidth={1.5} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-fit' align='end' forceMount>
        <DropdownMenuLabel className='flex items-center gap-2 font-normal'>
          <Avatar className='size-8'>
            <AvatarImage src={user.image as string} alt={user.name as string} />
            <AvatarFallback>{getInitials(user.name as string)}</AvatarFallback>
          </Avatar>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user.name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className='mr-2 h-4 w-4' />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className='mr-2 h-4 w-4' />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Moon className='mr-2 h-4 w-4' />
          <span>Dark mode</span>
        </DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
