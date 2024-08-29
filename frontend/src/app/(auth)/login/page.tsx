import OAuthButtons from '@/components/buttons/oauth/oauth-buttons';
import LoginForm from '@/components/forms/auth/login-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className='min-h-screen bg-[#0D0C0C] lg:grid lg:grid-cols-2'>
      <figure className='relative hidden lg:block lg:h-full'>
        <Image
          src={
            'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt='Food Image'
          className='object-cover'
          loading='eager'
          priority
          quality={100}
          fill
          sizes='50vw'
        />
        <div className='absolute inset-0 bg-black/50' />
      </figure>
      <section className='flex min-h-screen items-center justify-center bg-white px-8 py-8 lg:rounded-l-3xl'>
        <div className='w-full max-w-lg space-y-6'>
          <h1 className='text-2xl font-semibold sm:text-3xl'>Log In</h1>
          <LoginForm />
          <div className='flex w-full items-center gap-3 text-[#A3A3A3]'>
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
                'p-0 text-[#2E5834]'
              )}
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
