import { UserResponse, User } from '@/types';
import { api } from '@/lib/api';

export const userService = {
  getUser: async (id: string): Promise<UserResponse> => {
    const response = await api.get<UserResponse>(`/user/${id}`);
    return response.data;
  },
  getUserByEmail: async (email: string): Promise<UserResponse> => {
    const response = await api.get<UserResponse>(`/user?email=${email}`);
    return response.data;
  },
  updateUser: async (
    id: string,
    userData: Partial<User>
  ): Promise<UserResponse> => {
    const response = await api.put<UserResponse>(`/user/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id: string): Promise<UserResponse> => {
    const response = await api.delete<UserResponse>(`/user/${id}`);
    return response.data;
  },
  changePassword: async (
    id: string,
    oldPassword: string,
    newPassword: string
  ): Promise<UserResponse> => {
    const response = await api.patch<UserResponse>(`/user/${id}`, {
      oldPassword,
      newPassword,
    });
    return response.data;
  },
};
