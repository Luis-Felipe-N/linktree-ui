'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const createNewPageSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug deve ter no mínimo 3 caracteres")
    .max(30, "Slug deve ter no máximo 30 caracteres")
    .regex(/^[a-zA-Z0-9_-]+$/, "Slug deve conter apenas letras, números, _ e -"),
  title: z.string().max(100, "Título deve ter no máximo 100 caracteres").optional(),
  description: z.string().max(255, "Descrição deve ter no máximo 255 caracteres").optional(),
})

type CreateNewPageData = z.infer<typeof createNewPageSchema>

const MAX_DESCRIPTION_LENGTH = 255

function NewPageForm() {
  const router = useRouter()
  const [descriptionCount, setDescriptionCount] = useState(0)
  const searchParams = useSearchParams()
  const username = searchParams.get('username') ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateNewPageData>({
    resolver: zodResolver(createNewPageSchema),
    defaultValues: {
      slug: username,
    },
  })

  const handleCreatePage = async (data: CreateNewPageData) => {
    try {
      const response = await api.post('/pages', data)
      const newPage = response.data

      // Redirecionar para a página de aparência da nova página
      router.push(`/admin/${newPage.slug}/appearance/theme`)
    } catch (error) {
      console.error('Erro ao criar nova página:', error)
      alert('Erro ao criar nova página. Tente novamente.')
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Criar Nova Página</h1>
        <p className="text-muted-foreground mt-2">
          Preencha os campos abaixo para criar uma nova página
        </p>
      </div>

      <form onSubmit={handleSubmit(handleCreatePage)} className="space-y-6">
        {!username && (
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              placeholder="minha-pagina"
              {...register("slug")}
              aria-invalid={errors.slug ? "true" : "false"}
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{errors.slug.message}</p>
            )}
            <p className="text-muted-foreground text-xs">
              Este será o endereço da sua página: melinks.com/<strong>seu-slug</strong>
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            placeholder="Título da página"
            {...register("title")}
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Descrição da página (opcional)"
            {...register("description")}
            maxLength={MAX_DESCRIPTION_LENGTH}
            onChange={(e) => setDescriptionCount(e.target.value.length)}
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
          <p
            className="text-muted-foreground text-right text-xs"
            role="status"
            aria-live="polite"
          >
            <span className="tabular-nums">
              {MAX_DESCRIPTION_LENGTH - descriptionCount}
            </span>{" "}
            caracteres restantes
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 text-white"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Criar Página
          </Button>
        </div>
      </form>
    </main>
  )
}

export default function NewPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    }>
      <NewPageForm />
    </Suspense>
  )
}