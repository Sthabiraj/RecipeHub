'use client';

import CustomButton from '@/components/buttons/custom-button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import axios from 'axios';
import { LoginFormData, loginSchema } from '@/schemas/loginSchema';
import { useLogin } from '@/hooks/useLogin';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LoginField {
  label: string;
  type: string;
  placeholder: string;
  name: 'email' | 'password';
}

const loginFields: LoginField[] = [
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

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        {loginFields.map((loginField) => (
          <FormField
            key={loginField.name}
            control={form.control}
            name={loginField.name}
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel className='text-base'>{loginField.label}</FormLabel>
                <FormControl>
                  <Input
                    className={cn('py-6', error && 'border-destructive')}
                    placeholder={loginField.placeholder}
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
          isLoading={loginMutation.isPending}
          loadingText='Logging In...'
        >
          Log In
        </CustomButton>
      </form>
    </Form>
  );
}
