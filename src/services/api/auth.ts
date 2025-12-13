import apiClient, { ApiResponse } from '@/lib/api';
import { AxiosError, AxiosResponse } from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const authApi = {
  // Register new user
  register: async (data: RegisterRequest): Promise<{ token: string; user: User }> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/users/register', data);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed');
      }
      
      const token = response.data.data!.token;
      
      // After getting token, fetch user details
      localStorage.setItem('auth_token', token);
      const userResponse = await apiClient.get<ApiResponse<User>>('/users/me');
      
      return {
        token,
        user: userResponse.data.data!,
      };
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Registration failed');
    }
  },

  // Login user
  login: async (data: LoginRequest): Promise<{ token: string; user: User }> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/users/login', data);      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }
      
      const token = response.data.data!.token;
      
      // After getting token, fetch user details
      localStorage.setItem('auth_token', token);
      const userResponse = await apiClient.get<ApiResponse<User>>('/users/me');
      
      return {
        token,
        user: userResponse.data.data!,
      };
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Login failed');
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/users/me');
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch user');
      }
      return response.data.data!;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch user');
    }
  },
};

