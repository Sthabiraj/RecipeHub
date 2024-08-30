'use client';

import { useMutation } from '@tanstack/react-query';
import { LoginFormData } from '@/schemas/loginSchema';
import { loginAction } from '@/action';

export function useLogin() {
  return useMutation({
    mutationFn: (userData: LoginFormData) => loginAction(userData),
  });
}
