import api from '@/lib/api'
import { Fee } from '@/types'

export const feeService = {
  async getFeesByAccount(accountNumber: string): Promise<Fee[]> {
    const response = await api.get(`/fee/${accountNumber}`)
    return response.data
  },

  async getFeeById(id: number): Promise<Fee> {
    const response = await api.get(`/fee/fee/${id}`)
    return response.data
  }
}
