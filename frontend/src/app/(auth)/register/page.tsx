import OAuthButtons from '@/components/buttons/oauth/oauth-buttons';
import RegisterForm from '@/components/forms/auth/register-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <section className='flex min-h-screen items-center justify-center bg-white px-8 py-8 lg:rounded-l-3xl'>
      <div className='w-full max-w-lg space-y-6'>
        <h1 className='text-2xl font-semibold sm:text-3xl'>
          Create an Account
        </h1>
        <RegisterForm />
        <div className='flex w-full items-center gap-3 text-[#A3A3A3]'>
          <hr className='w-full' />
          <span className='whitespace-nowrap text-sm'>OR</span>
          <hr className='w-full' />
        </div>
        <OAuthButtons />
        <p className='text-center text-sm'>
          Already have an account?{' '}
          <Link
            href='/login'
            className={cn(
              buttonVariants({ variant: 'link' }),
              'p-0 text-[#2E5834]'
            )}
          >
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
