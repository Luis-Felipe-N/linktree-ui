'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Share2,
  Copy,
  Check,
  QrCode,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ExternalLink,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SharePageDialogProps {
  slug: string
  title?: string
}

export function SharePageDialog({ slug, title }: SharePageDialogProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [triggerPosition, setTriggerPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pageUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${slug}`

  const handleOpenChange = (open: boolean) => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const viewportCenterX = window.innerWidth / 2
      const viewportCenterY = window.innerHeight / 2

      setTriggerPosition({
        x: ((centerX - viewportCenterX) / viewportCenterX) * 50, // Convert to percentage for transform-origin
        y: ((centerY - viewportCenterY) / viewportCenterY) * 50,
      })
    }
    setIsOpen(open)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  const shareToSocial = (platform: string) => {
    const text = title ? `Confira minha página: ${title}` : 'Confira minha página'
    const encodedUrl = encodeURIComponent(pageUrl)
    const encodedText = encodeURIComponent(text)

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    }

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=400')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button ref={triggerRef} variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Compartilhar
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md overflow-visible"
        style={{
          transformOrigin: `calc(50% + ${triggerPosition.x}px) calc(50% + ${triggerPosition.y}px)`
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            duration: 0.2
          }}
        >
          <DialogHeader>
            <DialogTitle>Compartilhar Página</DialogTitle>
            <DialogDescription>
              Compartilhe sua página com o mundo!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* URL da página */}
            <div className="space-y-2">
              <Label htmlFor="page-url">Link da página</Label>
              <div className="flex gap-2">
                <Input
                  id="page-url"
                  value={pageUrl}
                  readOnly
                  className="flex-1 h-10"
                />
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleCopy}
                    className="flex-shrink-0"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          <Check className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -180 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          <Copy className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Botão Ver Página */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => window.open(pageUrl, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="h-4 w-4" />
                Ver Página Pública
              </Button>
            </motion.div>

            {/* Compartilhar em Redes Sociais */}
            <div className="space-y-3">
              <Label>Compartilhar em</Label>
              <div className="grid grid-cols-2 gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => shareToSocial('twitter')}
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => shareToSocial('facebook')}
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => shareToSocial('linkedin')}
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => shareToSocial('whatsapp')}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* QR Code (placeholder - pode adicionar biblioteca QR depois) */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => setShowQR(!showQR)}
              >
                <QrCode className="h-4 w-4" />
                {showQR ? 'Ocultar' : 'Mostrar'} QR Code
              </Button>
            </motion.div>

            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-3 rounded-lg border p-4"
                >
                  <div className="bg-white p-4 rounded-lg">
                    {/* Placeholder - adicionar biblioteca QR code depois */}
                    <div className="h-48 w-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Escaneie este QR Code para acessar sua página
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
