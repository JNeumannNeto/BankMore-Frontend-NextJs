'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { ArrowLeft, Receipt, User, Calendar, DollarSign } from 'lucide-react'
import { feeService } from '@/services/feeService'
import { Fee, User as UserType } from '@/types'

export default function Fees() {
  const [user, setUser] = useState<UserType | null>(null)
  const [fees, setFees] = useState<Fee[]>([])
  const [isLoading, setIsLoading] = useState(true)
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
      loadFees(userData.accountNumber)
    } catch (error) {
      router.push('/login')
    }
  }, [router])

  const loadFees = async (accountNumber: string) => {
    try {
      const feesData = await feeService.getFeesByAccount(accountNumber)
      setFees(feesData)
    } catch (error) {
      toast.error('Erro ao carregar tarifas')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTotalFees = () => {
    return fees.reduce((total, fee) => total + fee.amount, 0)
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Receipt className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Tarifas</h2>
          </div>
          <p className="text-gray-600">Histórico de tarifas cobradas na sua conta</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Tarifas</p>
                <p className="text-2xl font-bold text-red-600">
                  R$ {getTotalFees().toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Quantidade</p>
                <p className="text-2xl font-bold text-gray-900">
                  {fees.length}
                </p>
              </div>
              <Receipt className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conta</p>
                <p className="text-lg font-bold text-gray-900">
                  {user?.accountNumber}
                </p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Histórico de Tarifas</h3>
          </div>

          {fees.length === 0 ? (
            <div className="p-8 text-center">
              <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma tarifa encontrada</h3>
              <p className="text-gray-500">Você ainda não possui tarifas cobradas em sua conta.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {fees.map((fee) => (
                <div key={fee.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            {fee.type}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {fee.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 ml-13">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(fee.createdAt)}</span>
                        </div>
                        <div>
                          ID: {fee.requestId.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">
                        -R$ {fee.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        #{fee.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {fees.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Informações sobre Tarifas:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Tarifas são cobradas automaticamente após operações</li>
              <li>• Transferências têm tarifa de R$ 5,00</li>
              <li>• As tarifas são debitadas imediatamente da sua conta</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}
