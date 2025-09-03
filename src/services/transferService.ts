import api from '@/lib/api'
import { TransferRequest, TransferResponse } from '@/types'

export const transferService = {
  async createTransfer(data: TransferRequest): Promise<TransferResponse> {
    const response = await api.post('/transfer', data)
    return response.data
  }
}
