'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeButton() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {theme === 'light' ? (
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className='mr-2 h-4 w-4' />
          <span>Dark mode</span>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className='mr-2 h-4 w-4' />
          <span>Light mode</span>
        </DropdownMenuItem>
      )}
    </>
  );
}
