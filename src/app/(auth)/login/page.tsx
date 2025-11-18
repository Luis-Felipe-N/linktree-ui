'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuário precisa conter no mínimo 3 letras' })
    .regex(/^([a-z\-]+)$/i, {
      message: 'Usuário deve conter apenas letras e hífen',
    })
    .transform((username) => username.toLowerCase()),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginFormSchema) })

  const { login } = useAuth()
  const router = useRouter()

  async function handleLogin(credentials: LoginFormData) {
    console.log('login', credentials)
    try {
      await login(credentials)
      router.push('/admin')
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Erro ao fazer login'
        setError('root', { message })
      } else {
        setError('root', { message: 'Erro inesperado ao fazer login' })
      }
    }
  }
  console.log('errors', errors)
  console.log('errors', isSubmitting)

  return (
    <div className="p-24">
      <div>
        <strong>/my-links</strong>
      </div>

      <div className="text-center mt-4 flex flex-col justify-center h-full max-w-xl mx-auto">
        <h1 className="text-4xl font-bold">Bem vindo de volta</h1>
        <p className="mt-2">Faça login no /my-links</p>

        <form
          className="mt-16 text-sm leading-none"
          onSubmit={handleSubmit(handleLogin)}
        >
          {errors.root && (
            <p className="text-start mt-2 text-sm text-red-400 mb-4 font-bold">
              {errors.root.message}
            </p>
          )}
          {errors.username && (
            <p className="text-start mt-2 text-sm text-red-400 mb-2 font-bold">
              {errors.username.message}
            </p>
          )}


          <Input
            {...register('username')}
            placeholder="Usuário"
            autoComplete="username"
          />

          {errors.password && (
            <p className="text-start mt-2 text-sm text-red-400  font-bold">
              {errors.password.message}
            </p>
          )}
          <Input
            {...register('password')}
            placeholder="Senha"
            type="password"
            className="mt-2"
            autoComplete="current-password"
          />


          <button
            className="flex items-center text-white justify-center gap-2 px-16 h-14 rounded-xl font-bold bg-slate-500 hover:bg-slate-600 transition-colors disabled:opacity-80 disabled:cursor-not-allowed w-full mt-4"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                Carregando
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-16 text-zinc-400">
          Não possui uma conta?{' '}
          <Link className="text-slate-600 hover:underline" href="/register">
            Faça seu cadastro
          </Link>
        </p>
      </div>
    </div>
  )
}
