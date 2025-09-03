'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  DollarSign, 
  Receipt,
  LogOut,
  User,
  Plus,
  Minus
} from 'lucide-react'
import { accountService } from '@/services/accountService'
import { BalanceResponse, User as UserType, MovementRequest } from '@/types'

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null)
  const [balance, setBalance] = useState<BalanceResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showMovementModal, setShowMovementModal] = useState(false)
  const [movementType, setMovementType] = useState<'C' | 'D'>('C')
  const [movementAmount, setMovementAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userCookie = Cookies.get('user')
    const token = Cookies.get('token')

    if (!userCookie || !token) {
      router.push('/login')
      return
    }

    try {
      const userData = JSON.parse(userCookie)
      setUser(userData)
      loadBalance()
    } catch (error) {
      router.push('/login')
    }
  }, [router])

  const loadBalance = async () => {
    try {
      const balanceData = await accountService.getBalance()
      setBalance(balanceData)
    } catch (error) {
      toast.error('Erro ao carregar saldo')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('user')
    router.push('/')
  }

  const handleMovement = async () => {
    if (!movementAmount || !user) return

    const amount = parseFloat(movementAmount)
    if (amount <= 0) {
      toast.error('Valor deve ser maior que zero')
      return
    }

    setIsProcessing(true)
    try {
      const movementData: MovementRequest = {
        requestId: crypto.randomUUID(),
        accountNumber: user.accountNumber,
        amount,
        type: movementType
      }

      await accountService.createMovement(movementData)
      toast.success(
        movementType === 'C' 
          ? 'Depósito realizado com sucesso!' 
          : 'Saque realizado com sucesso!'
      )
      setShowMovementModal(false)
      setMovementAmount('')
      loadBalance()
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao processar movimentação'
      toast.error(message)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">BankMore</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Gerencie sua conta bancária</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Saldo Atual</p>
                <p className="text-2xl font-bold text-gray-900">
                  R$ {balance?.balance.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conta</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.accountNumber}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CPF</p>
                <p className="text-lg font-bold text-gray-900">
                  {user?.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-lg font-bold text-green-600">Ativa</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => {
              setMovementType('C')
              setShowMovementModal(true)
            }}
            className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Depósito</span>
          </button>

          <button
            onClick={() => {
              setMovementType('D')
              setShowMovementModal(true)
            }}
            className="bg-red-600 text-white p-4 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Minus className="w-5 h-5" />
            <span>Saque</span>
          </button>

          <button
            onClick={() => router.push('/transfer')}
            className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowUpRight className="w-5 h-5" />
            <span>Transferir</span>
          </button>

          <button
            onClick={() => router.push('/fees')}
            className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Receipt className="w-5 h-5" />
            <span>Tarifas</span>
          </button>
        </div>
      </main>

      {showMovementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {movementType === 'C' ? 'Depósito' : 'Saque'}
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={movementAmount}
                onChange={(e) => setMovementAmount(e.target.value)}
                placeholder="0,00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowMovementModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleMovement}
                disabled={isProcessing || !movementAmount}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
