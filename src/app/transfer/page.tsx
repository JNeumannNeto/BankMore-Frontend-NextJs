'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Send, User, CreditCard } from 'lucide-react'
import { transferService } from '@/services/transferService'
import { accountService } from '@/services/accountService'
import { TransferRequest, User as UserType } from '@/types'

interface TransferFormData {
  destinationAccountNumber: string
  amount: number
}

export default function Transfer() {
  const [user, setUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [destinationAccountExists, setDestinationAccountExists] = useState<boolean | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TransferFormData>()

  const destinationAccount = watch('destinationAccountNumber')

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
    } catch (error) {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    const checkAccount = async () => {
      if (destinationAccount && destinationAccount.length >= 6) {
        try {
          const exists = await accountService.checkAccountExists(destinationAccount)
          setDestinationAccountExists(exists)
        } catch (error) {
          setDestinationAccountExists(false)
        }
      } else {
        setDestinationAccountExists(null)
      }
    }

    const timeoutId = setTimeout(checkAccount, 500)
    return () => clearTimeout(timeoutId)
  }, [destinationAccount])

  const onSubmit = async (data: TransferFormData) => {
    if (!user) return

    if (data.destinationAccountNumber === user.accountNumber) {
      toast.error('Não é possível transferir para a própria conta')
      return
    }

    if (!destinationAccountExists) {
      toast.error('Conta de destino não encontrada')
      return
    }

    setIsLoading(true)
    try {
      const transferData: TransferRequest = {
        requestId: crypto.randomUUID(),
        destinationAccountNumber: data.destinationAccountNumber,
        amount: data.amount
      }

      await transferService.createTransfer(transferData)
      toast.success('Transferência realizada com sucesso!')
      router.push('/dashboard')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao realizar transferência'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </Link>
              <h1 className="text-2xl font-bold text-blue-600">BankMore</h1>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Send className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Transferência</h2>
            <p className="text-gray-600">Transfira dinheiro para outra conta</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="destinationAccountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Conta de Destino
              </label>
              <div className="relative">
                <input
                  {...register('destinationAccountNumber', {
                    required: 'Conta de destino é obrigatória',
                    minLength: {
                      value: 6,
                      message: 'Número da conta deve ter pelo menos 6 dígitos'
                    }
                  })}
                  type="text"
                  id="destinationAccountNumber"
                  placeholder="Digite o número da conta de destino"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              
              {destinationAccount && destinationAccount.length >= 6 && (
                <div className="mt-2">
                  {destinationAccountExists === true && (
                    <p className="text-green-600 text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Conta encontrada
                    </p>
                  )}
                  {destinationAccountExists === false && (
                    <p className="text-red-600 text-sm flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      Conta não encontrada
                    </p>
                  )}
                </div>
              )}
              
              {errors.destinationAccountNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.destinationAccountNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Valor da Transferência
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                <input
                  {...register('amount', {
                    required: 'Valor é obrigatório',
                    min: {
                      value: 0.01,
                      message: 'Valor deve ser maior que zero'
                    }
                  })}
                  type="number"
                  step="0.01"
                  min="0.01"
                  id="amount"
                  placeholder="0,00"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-800 mb-2">Informações Importantes:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• A transferência será processada imediatamente</li>
                <li>• Uma tarifa de R$ 5,00 será cobrada automaticamente</li>
                <li>• Verifique os dados antes de confirmar</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors text-center"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={isLoading || !destinationAccountExists}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Transferir
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
