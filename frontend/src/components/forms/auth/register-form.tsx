'use client';

import CustomButton from '@/components/buttons/custom-button';
import CustomInput from '@/components/inputs/custom-input';
import GoogleIcon from '@/components/icons/google';
import FacebookIcon from '@/components/icons/facebook';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/useRegister';
import { RegisterFormData, registerSchema } from '@/schemas/registerSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import axios from 'axios';

export default function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log(data);
      await registerMutation.mutateAsync(data);
      // Registration successful
      toast.success('Account created successfully');
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
          placeholder='blur'
          blurDataURL='https://utfs.io/f/855c288a-a77f-4af1-addc-652a473eab48-1nq2cb.webp'
        />
        <div className='absolute inset-0 bg-black/50' />
      </figure>
      <form
        className='flex min-h-screen items-center justify-center bg-white px-8 py-8 lg:rounded-l-3xl'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full max-w-lg space-y-6'>
          <h1 className='text-2xl font-semibold sm:text-3xl'>
            Create an Account
          </h1>
          <div className='space-y-4'>
            <CustomInput
              label='Full Name'
              placeholder='Enter your full name'
              {...register('name')}
              error={errors.name}
            />
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
              isLoading={registerMutation.isPending}
              loadingText='Creating Account...'
            >
              Create Account
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
      </form>
    </main>
  );
}
