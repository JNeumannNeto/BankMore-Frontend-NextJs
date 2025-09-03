export interface User {
  cpf: string
  name: string
  accountNumber: string
}

export interface LoginRequest {
  cpf: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterRequest {
  cpf: string
  name: string
  password: string
}

export interface CreateAccountResponse {
  accountNumber: string
  message: string
}

export interface MovementRequest {
  requestId: string
  accountNumber: string
  amount: number
  type: 'C' | 'D'
}

export interface BalanceResponse {
  accountNumber: string
  balance: number
  name: string
}

export interface TransferRequest {
  requestId: string
  destinationAccountNumber: string
  amount: number
}

export interface TransferResponse {
  id: number
  sourceAccountNumber: string
  destinationAccountNumber: string
  amount: number
  createdAt: string
  requestId: string
}

export interface Fee {
  id: number
  accountNumber: string
  amount: number
  type: string
  description: string
  createdAt: string
  requestId: string
}

export interface ErrorResponse {
  type: string
  message: string
}
