'use client'

// import { useAuth } from '@/contexts/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../contexts/auth'
import { ClaimUsernameForm } from '../components/auth/claim-username-form'

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/admin')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-[3fr_2fr] grid-cols-1">
      <div className="p-24">
        <div className="mt-4 flex flex-col justify-center h-full max-w-xl mx-auto">
          <h1 className="text-6xl font-black">
            Escolha seu nome de usuário
          </h1>

          <p className="mt-4">
            Experimente algo semelhante às suas redes sociais para facilitar o reconhecimento.
          </p>

          <ClaimUsernameForm />
        </div>
      </div>

      <div className="h-screen hidden lg:block">
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/8609315/pexels-photo-8609315.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Background"
        />
      </div>
    </main>
  )
}
