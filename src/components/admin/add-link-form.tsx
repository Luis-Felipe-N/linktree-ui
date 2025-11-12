'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addLinkBodySchema, type AddLinkBody } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateLink } from '@/hooks/use-links'
import { Loader2, Pen, Plus } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '../ui/card'

interface AddLinkFormProps {
  pageId: string
  onSuccess?: () => void
}

export function AddLinkForm({ pageId, onSuccess }: AddLinkFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const createLink = useCreateLink(pageId)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<AddLinkBody>({
    resolver: zodResolver(addLinkBodySchema),
    defaultValues: {
      type: 'link',
    },
  })

  const linkType = watch('type')

  const onSubmit = async (data: AddLinkBody) => {
    try {
      await createLink.mutateAsync(data)
      reset()
      onSuccess?.()
    } catch (error) {
      console.error('Error creating link:', error)
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} >
          {errors.url && (
            <p className="text-sm text-red-500">{errors.url.message}</p>
          )}
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
          <div className="space-y-2">
            <div className='flex items-center'>
              <input
                className="border-none h-8 outline-none px-0 text-base placeholder:text-muted-foreground md:text-sm"
                id="title"
                type="text"
                placeholder="Título do link"
                {...register('title')}
                maxLength={100}
                aria-invalid={errors.title ? 'true' : 'false'}
              />
              <Pen className="h-4 w-4 text-muted-foreground" />
            </div>

          </div>
          <div className="space-y-2">
            <div className='flex items-center'>

              <input
                className="border-none h-8 outline-none px-0 text-base placeholder:text-muted-foreground md:text-sm"
                id="url"
                type="url"
                placeholder="https://exemplo.com"
                {...register('url')}
                aria-invalid={errors.url ? 'true' : 'false'}
              />
              <Pen className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>


          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs"
          >
            {showAdvanced ? 'Ocultar' : 'Mostrar'} opções avançadas
          </Button>

          {showAdvanced && (
            <>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Select
                  value={linkType}
                  onValueChange={(value) => setValue('type', value as 'link' | 'embed' | 'header')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="embed">Embed</SelectItem>
                    <SelectItem value="header">Header</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">URL da Miniatura</Label>
                <Input
                  id="thumbnailUrl"
                  type="url"
                  placeholder="https://exemplo.com/image.jpg"
                  {...register('thumbnailUrl')}
                  aria-invalid={errors.thumbnailUrl ? 'true' : 'false'}
                />
                {errors.thumbnailUrl && (
                  <p className="text-sm text-red-500">{errors.thumbnailUrl.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="highlightEffect">Efeito de Destaque</Label>
                <Input
                  id="highlightEffect"
                  type="text"
                  placeholder="Ex: glow, pulse"
                  {...register('highlightEffect')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduledStart">Início Agendado</Label>
                  <Input
                    id="scheduledStart"
                    type="datetime-local"
                    {...register('scheduledStart')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduledEnd">Fim Agendado</Label>
                  <Input
                    id="scheduledEnd"
                    type="datetime-local"
                    {...register('scheduledEnd')}
                  />
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || createLink.isPending}
            className="w-full"
          >
            {(isSubmitting || createLink.isPending) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Link
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
