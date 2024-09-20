'use client';

import CustomButton from '@/components/buttons/custom-button';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/useRegister';
import { RegisterFormData, registerSchema } from '@/schemas/registerSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import axios from 'axios';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
  FormLabel,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface RegisterField {
  label: string;
  type: string;
  placeholder: string;
  name: 'name' | 'email' | 'password';
}

const registerFields: RegisterField[] = [
  {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    name: 'name',
  },
  {
    label: 'E-mail Address',
    type: 'email',
    placeholder: 'Enter your e-mail',
    name: 'email',
  },
  {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    name: 'password',
  },
];

export default function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
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
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        {registerFields.map((registerField) => (
          <FormField
            key={registerField.name}
            control={form.control}
            name={registerField.name}
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className='text-base'>
                  {registerField.label}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn('py-6', error && 'border-destructive')}
                    placeholder={registerField.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <CustomButton
          className='mt-2 w-full'
          type='submit'
          isLoading={registerMutation.isPending}
          loadingText='Creating Account...'
        >
          Create Account
        </CustomButton>
      </form>
    </Form>
  );
}
