'use client';

import CustomButton from '@/components/buttons/custom-button';
import CustomInput from '@/components/inputs/custom-input';
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
      await loginMutation.mutateAsync(data);
      // Login successful
      toast.success('Logged in successfully');
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
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
}
