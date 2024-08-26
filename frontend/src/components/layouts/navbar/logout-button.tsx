import { logoutAction } from '@/action';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type='submit' className='w-full'>
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </button>
    </form>
  );
}
