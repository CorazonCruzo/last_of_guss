import { apiClient } from './client'
import type { LoginRequest, LoginResponse, User } from '@/types/api'

export const authApi = {
  login(data: LoginRequest) {
    return apiClient.post<LoginResponse>('/auth/login', data)
  },

  me() {
    return apiClient.get<User>('/auth/me')
  },

  logout() {
    return apiClient.post<{ success: boolean }>('/auth/logout')
  },
}
