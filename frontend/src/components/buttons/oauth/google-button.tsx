import GoogleIcon from '@/components/icons/google';
import CustomButton from '../custom-button';
import { googleOAuthAction } from '@/action';

export default function GoogleButton() {
  return (
    <form action={googleOAuthAction}>
      <CustomButton variant={'outline'} className='w-full !font-normal'>
        <GoogleIcon className='mr-2 h-5 w-5' />
        Google
      </CustomButton>
    </form>
  );
}
