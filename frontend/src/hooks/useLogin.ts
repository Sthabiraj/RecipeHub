'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { LoginFormData } from '@/schemas/loginSchema';

interface LoginResponse {
  success: boolean;
  message: string;
  error?: string;
  user?: any;
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: (userData) =>
      api
        .post<LoginResponse>('/auth/login', userData, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });
}
