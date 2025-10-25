'use client'

import { Input } from '@/components/form/input'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Este email não parece válido. Tente outro' }),
  username: z
    .string()
    .min(3, { message: 'Usuário precisa conter no mínimo 3 letras' })
    .regex(/^([a-z\-]+)$/i, {
      message: 'Usuário deve conter apenas letras e hífen',
    })
    .transform((username) => username.toLowerCase()),
  password: z
    .string()
    .min(6, { message: 'Senha precisa conter no mínimo 6 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const searchParams = useSearchParams()
  const username = searchParams.get('username') ?? ''
  const timeoutRef = useRef<NodeJS.Timeout>()
  const router = useRouter()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username,
    },
  })

  const checkEmailExists = useCallback(
    async (email: string) => {
      try {
        await api.get(`/users/search?email=${email}`)
        setError('email', {
          message: 'Esse email parece já estar sendo usado',
        })
      } catch (error) {
        // Email não existe, tudo ok
      }
    },
    [setError],
  )

  useEffect(() => {
    const subscription = watch(({ email }, { name }) => {
      if (email && name === 'email') {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          checkEmailExists(email)
        }, 2000)
      }
    })

    return () => {
      subscription.unsubscribe()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [watch, checkEmailExists])

  async function handleCreateAccount(credentials: RegisterFormData) {
    try {
      await api.post('/users', credentials)
      
      // Auto-login após registro
      await login({
        username: credentials.username,
        password: credentials.password,
      })
      
      router.push('/admin')
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Erro ao criar conta'
        setError('root', { message })
      } else {
        setError('root', { message: 'Erro inesperado ao criar conta' })
      }
    }
  }

  return (
    <div className="p-24">
      <div>
        <strong>/my-links</strong>
      </div>

      <div className="text-center mt-4 flex flex-col justify-center h-full max-w-xl mx-auto">
        <h1 className="text-4xl font-bold">Junte-se ao /my-links</h1>
        <p className="mt-2 text-zinc-400">Cadastre-se gratuitamente</p>

        <form
          className="mt-16 text-sm leading-none"
          onSubmit={handleSubmit(handleCreateAccount)}
        >
          {errors.root && (
            <p className="text-start mt-2 text-sm text-red-400 mb-4 font-bold">
              {errors.root.message}
            </p>
          )}
          <Input
            {...register('email')}
            placeholder="Email"
            errors={errors.email}
            autoComplete="email"
          />
          <Input
            placeholder="Usuário"
            className="mt-4"
            prefix="melinks.com/"
            {...register('username')}
            errors={errors.username}
            autoComplete="username"
          />
          <Input
            placeholder="Senha"
            className="mt-4"
            type="password"
            {...register('password')}
            errors={errors.password}
            autoComplete="new-password"
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
              'Criar conta'
            )}
          </button>
        </form>

        <p className="mt-16 text-zinc-400">
          Já possui uma conta?{' '}
          <Link className="text-green-400 hover:underline" href="/login">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
