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
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            {/* Header com ações */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GripVertical className="h-5 w-5" />
                </motion.button>
                
                <div className="flex items-center gap-2">
                  <Switch
                    id={`active-${link.id}`}
                    checked={isActive}
                    onCheckedChange={handleActiveToggle}
                  />
                  <Label 
                    htmlFor={`active-${link.id}`} 
                    className="text-xs font-medium cursor-pointer flex items-center gap-1"
                  >
                    {isActive ? (
                      <>
                        <Eye className="h-3 w-3" />
                        Ativo
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3 w-3" />
                        Inativo
                      </>
                    )}
                  </Label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isDirty && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex gap-2"
                  >
                    <Button
                      type="submit"
                      size="sm"
                      disabled={updateLink.isPending}
                      className="h-8"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Salvar
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => window.location.reload()}
                      className="h-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="h-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Campos principais */}
            <div className="space-y-3">
              <div>
                <Label htmlFor={`url-${link.id}`} className="text-xs">
                  URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`url-${link.id}`}
                  placeholder="https://exemplo.com"
                  {...register('url')}
                  className="h-9"
                />
                {errors.url && (
                  <p className="text-xs text-red-500 mt-1">{errors.url.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor={`title-${link.id}`} className="text-xs">
                  Título
                </Label>
                <Input
                  id={`title-${link.id}`}
                  placeholder="Título do link"
                  {...register('title')}
                  className="h-9"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
                )}
              </div>
            </div>

            {/* Opções avançadas */}
            <div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full justify-between h-8 text-xs"
              >
                Opções avançadas
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 mt-3"
                >
                  <div>
                    <Label htmlFor={`thumbnail-${link.id}`} className="text-xs">
                      URL da Miniatura
                    </Label>
                    <Input
                      id={`thumbnail-${link.id}`}
                      placeholder="https://exemplo.com/imagem.jpg"
                      {...register('thumbnailUrl')}
                      className="h-9"
                    />
                    {errors.thumbnailUrl && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.thumbnailUrl.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`effect-${link.id}`} className="text-xs">
                      Efeito de Destaque
                    </Label>
                    <Input
                      id={`effect-${link.id}`}
                      placeholder="Ex: glow, pulse, bounce"
                      {...register('highlightEffect')}
                      className="h-9"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
