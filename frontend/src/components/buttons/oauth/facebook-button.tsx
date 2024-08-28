import CustomButton from '../custom-button';
import FacebookIcon from '@/components/icons/facebook';
import { facebookOAuthAction } from '@/action';

export default function FacebookButton() {
  return (
    <form action={facebookOAuthAction}>
      <CustomButton variant={'outline'} className='w-full !font-normal'>
        <FacebookIcon className='mr-2 h-5 w-5' />
        Facebook
      </CustomButton>
    </form>
  );
}
