import OAuthButtons from '@/components/buttons/oauth/oauth-buttons';
import LoginForm from '@/components/forms/auth/login-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className='flex min-h-screen items-center justify-center bg-background px-8 py-8 lg:rounded-l-3xl'>
      <div className='w-full max-w-lg space-y-6'>
        <h1 className='text-2xl font-semibold sm:text-3xl'>Log In</h1>
        <LoginForm />
        <div className='flex w-full items-center gap-3 text-muted-foreground/50'>
          <hr className='w-full' />
          <span className='whitespace-nowrap text-sm'>OR</span>
          <hr className='w-full' />
        </div>
        <OAuthButtons />
        <p className='text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link
            href='/register'
            className={cn(
              buttonVariants({ variant: 'link' }),
              'p-0 text-primary'
            )}
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
