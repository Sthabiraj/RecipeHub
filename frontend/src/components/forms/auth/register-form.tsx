'use client';

import CustomButton from '@/components/buttons/custom-button';
import CustomInput from '@/components/inputs/custom-input';
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
      router.push('/login');
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
        className='mt-2 w-full'
        type='submit'
        isLoading={registerMutation.isPending}
        loadingText='Creating Account...'
      >
        Create Account
      </CustomButton>
    </form>
  );
}
