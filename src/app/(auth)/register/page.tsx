'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod'
import { motion } from 'framer-motion'
import { Input as InputWithPrefix } from '@/components/form/input'
import { Input } from '@/components/ui/input'

const registerFormSchema = z.object({
  email: z
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

function RegisterForm() {
  const searchParams = useSearchParams()
  const username = searchParams.get('username') ?? ''
  const timeoutRef = useRef<NodeJS.Timeout>(null)
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
        const response = await api.get(`/users/search?email=${email}`)

        if (response.data.exists) {
          setError('email', {
            message: 'Esse email parece já estar sendo usado',
          })
        } else {
          setError('email', { message: '' })

        }
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

      router.push('/pages/new?username=' + credentials.username)
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8"
      >
        <strong className="text-xl font-bold tracking-tight">/my-links</strong>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Junte-se ao /my-links</h1>
          <p className="text-muted-foreground">Cadastre-se gratuitamente e comece a compartilhar</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleCreateAccount)}
        >
          {errors.root && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100"
            >
              {errors.root.message}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register('email')}
                placeholder="Email"
                autoComplete="email"
                className="h-12 bg-muted/30"
              />
              {errors.email && (
                <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative ">
                <InputWithPrefix
                  showPrefix
                  placeholder="Usuário"
                  className="h-12 bg-muted/30"
                  {...register('username')}
                  autoComplete="username"
                >
                  <span className="text-muted-foreground text-sm font-medium">mylinks.com/</span>

                </InputWithPrefix>
              </div>
              {errors.username && (
                <p className="text-xs text-red-500 ml-1">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                placeholder="Senha"
                className="h-12 bg-muted/30"
                type="password"
                {...register('password')}
                autoComplete="new-password"
              />
              {errors.password && (
                <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button
            className="w-full h-12 text-base font-semibold mt-6"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              <>
                Criar conta
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já possui uma conta?{' '}
          <Link className="text-primary font-semibold hover:underline underline-offset-4 transition-all" href="/login">
            Faça login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default function Register() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}
