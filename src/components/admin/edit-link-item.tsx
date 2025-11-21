'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Trash2, Save, X, GripVertical, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react'
import { useUpdateLink, useDeleteLink } from '@/hooks/use-links'
import type { Link } from '@/lib/types'
import { addLinkBodySchema, type AddLinkBody } from '@/lib/schemas'

interface EditLinkItemProps {
  link: Link
  pageId: string
}

export function EditLinkItem({ link, pageId }: EditLinkItemProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isActive, setIsActive] = useState(link.active !== false) // Default true

  const updateLink = useUpdateLink(pageId)
  const deleteLink = useDeleteLink(pageId)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<AddLinkBody>({
    resolver: zodResolver(addLinkBodySchema),
    defaultValues: {
      url: link.url,
      title: link.title || '',
      thumbnailUrl: link.thumbnailUrl || '',
      highlightEffect: link.highlightEffect || '',
    },
  })

  const handleUpdate = async (data: AddLinkBody) => {
    try {
      await updateLink.mutateAsync({
        linkId: link.id,
        data: {
          ...data,
          active: isActive,
        },
      })
    } catch (error) {
      console.error('Erro ao atualizar link:', error)
      alert('Erro ao atualizar link. Tente novamente.')
    }
  }

  const handleActiveToggle = async (checked: boolean) => {
    setIsActive(checked)
    try {
      await updateLink.mutateAsync({
        linkId: link.id,
        data: { active: checked },
      })
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      setIsActive(!checked) // Revert on error
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este link?')) return

    try {
      setIsDeleting(true)
      await deleteLink.mutateAsync(link.id)
    } catch (error) {
      console.error('Erro ao excluir link:', error)
      alert('Erro ao excluir link. Tente novamente.')
      setIsDeleting(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group/card"
    >
      <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
        <CardContent className="p-4 sm:p-5">
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
            {/* Header com ações */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  className="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-foreground p-1 rounded-md hover:bg-accent transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Reordenar link"
                >
                  <GripVertical className="size-5" />
                </motion.button>

                <div className="flex items-center gap-2 bg-muted/30 p-1.5 rounded-lg border border-transparent hover:border-border/50 transition-colors">
                  <Switch
                    id={`active-${link.id}`}
                    checked={isActive}
                    onCheckedChange={handleActiveToggle}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Label
                    htmlFor={`active-${link.id}`}
                    className="text-xs font-medium cursor-pointer flex items-center gap-1.5 select-none text-muted-foreground"
                  >
                    {isActive ? (
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        <Eye className="size-3.5" />
                        Ativo
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <EyeOff className="size-3.5" />
                        Inativo
                      </span>
                    )}
                  </Label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isDirty && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex gap-2"
                  >
                    <Button
                      type="submit"
                      size="sm"
                      disabled={updateLink.isPending}
                      className="h-8 px-3 text-xs font-medium transition-all"
                    >
                      <Save className="size-3.5 mr-1.5" />
                      Salvar
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => window.location.reload()}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      aria-label="Cancelar alterações"
                    >
                      <X className="size-4" />
                    </Button>
                  </motion.div>
                )}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="h-8 w-8 p-0 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="Excluir link"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>

            {/* Campos principais */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor={`url-${link.id}`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={`url-${link.id}`}
                  placeholder="https://exemplo.com"
                  {...register('url')}
                  className="h-10 bg-muted/20 border-border/50 focus:bg-background transition-colors"
                />
                {errors.url && (
                  <p className="text-xs text-destructive font-medium mt-1 animate-in slide-in-from-top-1">{errors.url.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`title-${link.id}`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Título
                </Label>
                <Input
                  id={`title-${link.id}`}
                  placeholder="Título do link"
                  {...register('title')}
                  className="h-10 bg-muted/20 border-border/50 focus:bg-background transition-colors"
                />
                {errors.title && (
                  <p className="text-xs text-destructive font-medium mt-1 animate-in slide-in-from-top-1">{errors.title.message}</p>
                )}
              </div>
            </div>

            {/* Opções avançadas */}
            <div className="pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full justify-between h-9 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                aria-expanded={showAdvanced}
                aria-controls={`advanced-options-${link.id}`}
              >
                Opções avançadas
                {showAdvanced ? (
                  <ChevronUp className="size-3.5" />
                ) : (
                  <ChevronDown className="size-3.5" />
                )}
              </Button>

              <div id={`advanced-options-${link.id}`}>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 mt-4 pt-2 border-t border-border/30"
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor={`thumbnail-${link.id}`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        URL da Miniatura
                      </Label>
                      <Input
                        id={`thumbnail-${link.id}`}
                        placeholder="https://exemplo.com/imagem.jpg"
                        {...register('thumbnailUrl')}
                        className="h-9 text-sm bg-muted/20 border-border/50 focus:bg-background"
                      />
                      {errors.thumbnailUrl && (
                        <p className="text-xs text-destructive font-medium mt-1">
                          {errors.thumbnailUrl.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor={`effect-${link.id}`} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Efeito de Destaque
                      </Label>
                      <Input
                        id={`effect-${link.id}`}
                        placeholder="Ex: glow, pulse, bounce"
                        {...register('highlightEffect')}
                        className="h-9 text-sm bg-muted/20 border-border/50 focus:bg-background"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
