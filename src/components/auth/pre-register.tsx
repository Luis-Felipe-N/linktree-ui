import { Input } from '../form/input'
import { z } from 'zod'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

const registerFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Este email não parece válido. Tente outro' }),
  username: z
    .string()
    .min(3, { message: 'Usuário precisa conter no mínimo 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Usuário deve conter apenas letras e hífen',
    })
    .transform((username) => username.toLowerCase()),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export function PreRegister() {
  const preRegisterForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = preRegisterForm

  async function handleCreateAccount(data: RegisterFormData) {
    const response = await api.post('/users', data)

    console.log(response)
  }

  return (
    <form
      className="mt-16 text-sm leading-none	"
      onSubmit={handleSubmit(handleCreateAccount)}
    >
      <FormProvider {...preRegisterForm}>
        <Input
          {...register('email')}
          placeholder="Email"
          errors={errors.email}
        />
        <Input
          placeholder="Usuário"
          className="mt-4"
          prefix="Me-links/"
          {...register('username')}
          errors={errors.username}
        />
      </FormProvider>
      <button className="mt-8 px-4 h-14 w-full rounded-full font-bold bg-green-500">
        Criar conta
      </button>
    </form>
  )
}
