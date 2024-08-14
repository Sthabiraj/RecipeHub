import { LoginFormData } from '@/schemas/loginSchema';
import { RegisterFormData } from '@/schemas/registerSchema';
import { api } from '@/utils/api';

interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  bio: string;
  address: string;
  profileImage: string;
  socialLinks: {
    name: string;
    url: string;
  }[];
  recipes: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
  user?: User;
}

export const authService = {
  register: async (userData: RegisterFormData): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/register', userData);
    return response.data;
  },
  login: async (userData: LoginFormData): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/login', userData);
    return response.data;
  },
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/logout');
    return response.data;
  },
  checkAuth: async (): Promise<ApiResponse> => {
    const response = await api.get<ApiResponse>('/auth/check-auth');
    return response.data;
  },
};
