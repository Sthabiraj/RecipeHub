import CustomButton from '../custom-button';
import FacebookIcon from '@/components/icons/facebook';
import { signIn } from '@/auth';

export default function FacebookButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('facebook', { redirectTo: '/' });
      }}
    >
      <CustomButton variant={'outline'} className='w-full !font-normal'>
        <FacebookIcon className='mr-2 h-5 w-5' />
        Facebook
      </CustomButton>
    </form>
  );
}
