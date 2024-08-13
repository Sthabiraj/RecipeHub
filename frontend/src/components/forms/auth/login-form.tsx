'use client';

import CustomButton from '../custom/custom-button';
import CustomInput from '../custom/custom-input';
import GoogleIcon from '../icons/google';
import FacebookIcon from '../icons/facebook';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import axios from 'axios';
import { LoginFormData, loginSchema } from '@/schemas/loginSchema';
import { useLogin } from '@/hooks/useLogin';

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log(data);
      const res = await loginMutation.mutateAsync(data);
      // Login successful
      toast.success(res.message || 'Logged in successfully');
      router.push('/');
    } catch (error) {
      // Extract error message from response
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'An error occurred. Please try again';
      toast.error(errorMessage);
      console.log(axios.isAxiosError(error) && error.response?.data?.error);
    }
  };

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
      <form
        className='flex min-h-screen items-center justify-center bg-white px-8 py-8 lg:rounded-l-3xl'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full max-w-lg space-y-6'>
          <h1 className='text-2xl font-semibold sm:text-3xl'>Log In</h1>
          <div className='space-y-4'>
            <CustomInput
              label='E-mail Address'
              placeholder='Enter your e-mail'
              {...register('email')}
              error={errors.email}
            />
            <CustomInput
              label='Password'
              placeholder='Enter your password'
              type='password'
              {...register('password')}
              error={errors.password}
            />
            <CustomButton
              className='disabled:bg- mt-2 w-full bg-[#2E5834] hover:bg-[#2E5834]/90 disabled:opacity-50'
              type='submit'
              isLoading={loginMutation.isPending}
              loadingText='Logging In...'
            >
              Log In
            </CustomButton>
          </div>
          <div className='flex w-full items-center gap-3 text-[#A3A3A3]'>
            <hr className='w-full' />
            <span className='whitespace-nowrap text-sm'>OR</span>
            <hr className='w-full' />
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <CustomButton variant={'outline'} className='w-full !font-normal'>
              <FacebookIcon className='mr-2 h-5 w-5' />
              Facebook
            </CustomButton>
            <CustomButton variant={'outline'} className='w-full !font-normal'>
              <GoogleIcon className='mr-2 h-5 w-5' />
              Google
            </CustomButton>
          </div>
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
      </form>
    </main>
  );
}
