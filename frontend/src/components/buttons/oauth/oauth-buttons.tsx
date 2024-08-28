import FacebookButton from './facebook-button';
import GoogleButton from './google-button';

export default function OAuthButtons() {
  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
      <FacebookButton />
      <GoogleButton />
    </div>
  );
}
