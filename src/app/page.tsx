'use client'

import Link from 'next/link'
import { CreditCard, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            BankMore
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Seu banco digital completo e seguro
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Criar Conta
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Conta Digital</h3>
            <p className="text-gray-600">
              Conta corrente gratuita com cartão de débito
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Transferências</h3>
            <p className="text-gray-600">
              Transfira dinheiro de forma rápida e segura
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Segurança</h3>
            <p className="text-gray-600">
              Tecnologia de ponta para proteger seus dados
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Por que escolher o BankMore?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Facilidade</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interface intuitiva e moderna</li>
                <li>• Acesso 24/7 pelo celular ou computador</li>
                <li>• Suporte ao cliente especializado</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Economia</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Conta digital gratuita</li>
                <li>• Tarifas transparentes</li>
                <li>• Sem taxas escondidas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
