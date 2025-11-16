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
import { motion } from "framer-motion"

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
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Criar Nova Página</h1>
        <p className="text-muted-foreground mt-2">
          Preencha os campos abaixo para criar uma nova página
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit(handleCreatePage)}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {!username && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
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
              <motion.p
                className="text-sm text-red-500"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {errors.slug.message}
              </motion.p>
            )}
            <p className="text-muted-foreground text-xs">
              Este será o endereço da sua página: melinks.com/<strong>seu-slug</strong>
            </p>
          </motion.div>
        )}

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            placeholder="Título da página"
            {...register("title")}
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && (
            <motion.p
              className="text-sm text-red-500"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.title.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
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
            <motion.p
              className="text-sm text-red-500"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {errors.description.message}
            </motion.p>
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
        </motion.div>

        <motion.div
          className="flex gap-3 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
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
        </motion.div>
      </motion.form>
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