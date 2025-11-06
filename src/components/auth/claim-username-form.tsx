'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Input } from '../form/input'
import { api } from '@/lib/api'

const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Usuário precisa conter no mínimo 3 letras' })
    .regex(/^([a-z\-]+)$/i, {
      message: 'Usuário deve conter apenas letras e hífen',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    try {
      const response = await api.get(`/users/search?username=${username}`)

      if (response.data.existing) {
        setError('username', {
          message: 'Esse nome de usuário parece já estar sendo usado',
        })
      } else {
        router.push(`/register?username=${username}`)
      }
    } catch (error) {
      // Se a API retornar erro, assumimos que o usuário não existe
      router.push(`/register?username=${username}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleClaimUsername)}
      className="flex mt-8 gap-2"
    >
      <Input
        placeholder="usuário"
        className="flex-1 text-slate-700"
        prefix="melinks.com/"
        {...register('username')}
        errors={errors.username}
        autoComplete="username"
      />

      <button
        className="flex items-center text-white justify-center gap-2 px-16 h-14 rounded-xl font-bold bg-slate-500 hover:bg-slate-600 transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          'Reservar'
        )}
      </button>
    </form>
  )
}
