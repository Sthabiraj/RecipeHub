'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { LoginFormData } from '@/schemas/loginSchema';
import { loginAction } from '@/action';

// interface LoginResponse {
//   success: boolean;
//   message: string;
//   error?: string;
//   user?: any;
// }

export function useLogin() {
  return useMutation({
    mutationFn: (userData: LoginFormData) => loginAction(userData),
  });
}
