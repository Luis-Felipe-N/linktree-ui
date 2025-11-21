'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { Loader2, LogIn } from 'lucide-react'
import { motion } from 'framer-motion'

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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Bem vindo de volta</h1>
          <p className="text-muted-foreground">Faça login no /my-links para continuar</p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(handleLogin)}
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
          {errors.username && (
            <p className="text-start mt-2 text-sm text-red-400 mb-2 font-bold">
              {errors.username.message}
            </p>
          )}


<<<<<<< HEAD
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register('username')}
                placeholder="Usuário"
                autoComplete="username"
                className="h-12 bg-muted/30"
              />
              {errors.username && (
                <p className="text-xs text-red-500 ml-1">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                {...register('password')}
                placeholder="Senha"
                type="password"
                autoComplete="current-password"
                className="h-12 bg-muted/30"
              />
              {errors.password && (
                <p className="text-xs text-red-500 ml-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button
            className="w-full h-12 text-base font-semibold mt-6"
=======
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
>>>>>>> 971ed5d9f53b85f136fa466c708fa90ff8cfcec1
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                Login
                <LogIn className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Não possui uma conta?{' '}
          <Link className="text-primary font-semibold hover:underline underline-offset-4 transition-all" href="/register">
            Faça seu cadastro
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
