import type { ApiError } from '@/types/api';
import { useAuthStore } from '@/stores/auth';

class ApiClient {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = useAuthStore.getState().token;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`/api/v1${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
