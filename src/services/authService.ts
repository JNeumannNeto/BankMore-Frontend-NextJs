import api from '@/lib/api'
import { LoginRequest, LoginResponse, RegisterRequest, CreateAccountResponse } from '@/types'

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post('/account/login', data)
    return response.data
  },

  async register(data: RegisterRequest): Promise<CreateAccountResponse> {
    const response = await api.post('/account/register', data)
    return response.data
  },

  async deactivateAccount(password: string): Promise<void> {
    await api.put('/account/deactivate', { password })
  }
}
