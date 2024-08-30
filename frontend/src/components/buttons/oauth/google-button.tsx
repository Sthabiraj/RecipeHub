import GoogleIcon from '@/components/icons/google';
import CustomButton from '../custom-button';
import { signIn } from '@/auth';

export default function GoogleButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: '/' });
      }}
    >
      <CustomButton variant={'outline'} className='w-full !font-normal'>
        <GoogleIcon className='mr-2 h-5 w-5' />
        Google
      </CustomButton>
    </form>
  );
}
