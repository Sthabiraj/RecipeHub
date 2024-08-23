'use client';

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { RegisterFormData } from '@/schemas/registerSchema';

interface RegisterResponse {
  success: boolean;
  message: string;
  error?: string;
  user?: any;
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterFormData>({
    mutationFn: (userData) =>
      api
        .post<RegisterResponse>('/auth/register', userData, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });
}
