import api from '@/lib/api'
import { MovementRequest, BalanceResponse } from '@/types'

export const accountService = {
  async getBalance(): Promise<BalanceResponse> {
    const response = await api.get('/account/balance')
    return response.data
  },

  async getBalanceByAccountNumber(accountNumber: string): Promise<BalanceResponse> {
    const response = await api.get(`/account/balance/${accountNumber}`)
    return response.data
  },

  async createMovement(data: MovementRequest): Promise<void> {
    await api.post('/account/movement', data)
  },

  async checkAccountExists(accountNumber: string): Promise<boolean> {
    const response = await api.get(`/account/exists/${accountNumber}`)
    return response.data
  }
}
