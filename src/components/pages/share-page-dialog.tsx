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
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pageUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${slug}`

  const handleOpenChange = (open: boolean) => {
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
        <Button ref={triggerRef} variant="outline" size="sm" className="gap-2 h-9 px-4 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-sm hover:shadow-md">
          <Share2 className="size-4" />
          <span className="font-medium">Compartilhar</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md overflow-hidden p-0 gap-0 border-none shadow-2xl rounded-2xl bg-background"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            duration: 0.2
          }}
          className="p-6"
        >
          <DialogHeader className="mb-6 text-center">
            <DialogTitle className="text-xl font-bold tracking-tight">Compartilhar Página</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm mt-1.5">
              Compartilhe sua página com o mundo!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* URL da página */}
            <div className="space-y-2">
              <Label htmlFor="page-url" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Link da página</Label>
              <div className="flex gap-2 p-1 bg-muted/30 rounded-xl border border-border/50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
                <Input
                  id="page-url"
                  value={pageUrl}
                  readOnly
                  className="flex-1 h-10 border-none bg-transparent focus-visible:ring-0 text-sm font-medium text-foreground"
                />
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleCopy}
                    className={`flex-shrink-0 h-10 w-10 rounded-lg transition-colors ${copied ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Check className="size-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0, rotate: 90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -90 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          <Copy className="size-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                variant="secondary"
                className="w-full gap-2 h-11 rounded-xl font-medium text-secondary-foreground bg-secondary/50 hover:bg-secondary/80 transition-colors"
                onClick={() => window.open(pageUrl, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="size-4" />
                Ver Página Pública
              </Button>
            </motion.div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Compartilhar em</Label>
              <div className="grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-10 rounded-lg hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-colors"
                    onClick={() => shareToSocial('twitter')}
                  >
                    <Twitter className="size-4" />
                    Twitter
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-10 rounded-lg hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-colors"
                    onClick={() => shareToSocial('facebook')}
                  >
                    <Facebook className="size-4" />
                    Facebook
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-10 rounded-lg hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-colors"
                    onClick={() => shareToSocial('linkedin')}
                  >
                    <Linkedin className="size-4" />
                    LinkedIn
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-10 rounded-lg hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]/30 transition-colors"
                    onClick={() => shareToSocial('whatsapp')}
                  >
                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </Button>
                </motion.div>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <Button
                variant="ghost"
                className="w-full gap-2 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={() => setShowQR(!showQR)}
              >
                <QrCode className="size-4" />
                {showQR ? 'Ocultar' : 'Mostrar'} QR Code
              </Button>
            </motion.div>

            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-muted/10 p-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      {/* Placeholder - adicionar biblioteca QR code depois */}
                      <div className="h-40 w-40 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                        <QrCode className="h-16 w-16 text-gray-300" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground text-center max-w-[200px]">
                      Escaneie este QR Code para acessar sua página instantaneamente
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
