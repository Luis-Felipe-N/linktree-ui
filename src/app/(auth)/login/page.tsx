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

          <Input
            {...register('username')}
            placeholder="Usuário"
            autoComplete="username"
          />
          <Input
            {...register('password')}
            placeholder="Senha"
            type="password"
            className="mt-4"
            autoComplete="current-password"
          />

          <button
            className="flex items-center justify-center gap-2 mt-8 px-4 h-14 w-full rounded-full font-bold bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
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
          <Link className="text-green-400 hover:underline" href="/register">
            Faça seu cadastro
          </Link>
        </p>
      </div>
    </div>
  )
}
