'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addLinkBodySchema, type AddLinkBody } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateLink } from '@/hooks/use-links'
import { ChevronDown, ChevronUp, Loader2, Plus, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { motion, AnimatePresence } from 'framer-motion'

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
      setShowAdvanced(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error creating link:', error)
    }
  }

  return (
    <Card className="bg-card border-dashed border-2 border-border/60 shadow-none hover:border-primary/50 transition-colors duration-200">
      <CardContent className="p-4 sm:p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <LinkIcon className="size-4" />
            </div>
            <h3 className="font-semibold text-sm">Adicionar novo link</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="url" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://exemplo.com"
                {...register('url')}
                className="h-10 bg-background"
                aria-invalid={errors.url ? 'true' : 'false'}
              />
              {errors.url && (
                <p className="text-xs text-destructive font-medium mt-1 animate-in slide-in-from-top-1">{errors.url.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Título
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Título do link"
                {...register('title')}
                maxLength={100}
                className="h-10 bg-background"
                aria-invalid={errors.title ? 'true' : 'false'}
              />
              {errors.title && (
                <p className="text-xs text-destructive font-medium mt-1 animate-in slide-in-from-top-1">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full justify-between h-9 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
              aria-expanded={showAdvanced}
            >
              Opções avançadas
              {showAdvanced ? (
                <ChevronUp className="size-3.5" />
              ) : (
                <ChevronDown className="size-3.5" />
              )}
            </Button>

            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 mt-4 pt-2 border-t border-border/30">
                    <div className="space-y-1.5">
                      <Label htmlFor="type" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tipo</Label>
                      <Select
                        value={linkType}
                        onValueChange={(value) => setValue('type', value as 'link' | 'embed' | 'header')}
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="link">Link</SelectItem>
                          <SelectItem value="embed">Embed</SelectItem>
                          <SelectItem value="header">Header</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="thumbnailUrl" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">URL da Miniatura</Label>
                      <Input
                        id="thumbnailUrl"
                        type="url"
                        placeholder="https://exemplo.com/image.jpg"
                        {...register('thumbnailUrl')}
                        className="h-9 text-sm"
                      />
                      {errors.thumbnailUrl && (
                        <p className="text-xs text-destructive font-medium mt-1">{errors.thumbnailUrl.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="highlightEffect" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Efeito de Destaque</Label>
                      <Input
                        id="highlightEffect"
                        type="text"
                        placeholder="Ex: glow, pulse"
                        {...register('highlightEffect')}
                        className="h-9 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="scheduledStart" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Início Agendado</Label>
                        <Input
                          id="scheduledStart"
                          type="datetime-local"
                          {...register('scheduledStart')}
                          className="h-9 text-sm"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="scheduledEnd" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fim Agendado</Label>
                        <Input
                          id="scheduledEnd"
                          type="datetime-local"
                          {...register('scheduledEnd')}
                          className="h-9 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || createLink.isPending}
            className="w-full h-10 font-medium transition-all active:scale-[0.98]"
          >
            {(isSubmitting || createLink.isPending) ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Plus className="mr-2 size-4" />
            )}
            Adicionar Link
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
