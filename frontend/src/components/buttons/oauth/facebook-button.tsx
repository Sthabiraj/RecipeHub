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
        {/* <FacebookIcon className='mr-2 h-5 w-5' /> */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='36'
          height='36'
          viewBox='0 0 36 36'
          fill='none'
          className='mr-2 h-5 w-5'
        >
          <path
            d='M18.0003 2.1665C13.8011 2.1665 9.77379 3.83465 6.80447 6.80398C3.83514 9.7733 2.16699 13.8006 2.16699 17.9998C2.16699 22.1991 3.83514 26.2264 6.80447 29.1957C9.77379 32.165 13.8011 33.8332 18.0003 33.8332C22.1996 33.8332 26.2269 32.165 29.1962 29.1957C32.1655 26.2264 33.8337 22.1991 33.8337 17.9998C33.8337 13.8006 32.1655 9.7733 29.1962 6.80398C26.2269 3.83465 22.1996 2.1665 18.0003 2.1665Z'
            fill='#039BE5'
          />
          <path
            d='M20.143 22.1967H24.2405L24.8839 18.0342H20.1422V15.7592C20.1422 14.03 20.7072 12.4966 22.3247 12.4966H24.9239V8.86415C24.4672 8.80248 23.5014 8.66748 21.6764 8.66748C17.8655 8.66748 15.6314 10.68 15.6314 15.265V18.0342H11.7139V22.1967H15.6314V33.6375C16.4072 33.7542 17.193 33.8333 17.9997 33.8333C18.7289 33.8333 19.4405 33.7667 20.143 33.6717V22.1967Z'
            fill='white'
          />
        </svg>
        Facebook
      </CustomButton>
    </form>
  );
}
