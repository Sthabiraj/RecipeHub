'use client';

import { useMutation } from '@tanstack/react-query';
import { RegisterFormData } from '@/schemas/registerSchema';
import { authService } from '@/services';

export function useRegister() {
  return useMutation({
    mutationFn: (userData: RegisterFormData) => authService.register(userData),
  });
}
