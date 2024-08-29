import { LoginFormData } from '@/schemas/loginSchema';
import { AuthResponse, RegisterOAuth } from '@/types';
import { api } from '@/lib/api';
import { RegisterFormData } from '@/schemas/registerSchema';

export const authService = {
  register: async (userData: RegisterFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },
  loginWithOAuth: async (userData: RegisterOAuth): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/oauth', userData);
    return response.data;
  },
  login: async (userData: LoginFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', userData, {
      withCredentials: true,
    });
    return response.data;
  },
  logout: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/logout');
    return response.data;
  },
  checkAuth: async (): Promise<AuthResponse> => {
    const response = await api.get<AuthResponse>('/auth/check-auth');
    return response.data;
  },
};
