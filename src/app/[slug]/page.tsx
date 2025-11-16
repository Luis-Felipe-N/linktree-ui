'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Loader2, ExternalLink } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Link {
  id: string
  url: string
  title?: string
  thumbnailUrl?: string
  type?: 'link' | 'embed' | 'header'
  highlightEffect?: string
}

interface PageData {
  id: string
  slug: string
  title?: string
  description?: string
  avatarUrl?: string
  theme?: {
    backgroundColor?: string
    buttonColor?: string
    buttonTextColor?: string
    textColor?: string
  }
  links: Link[]
}

export default function PublicPage() {
  const params = useParams()
  const slug = params.slug as string
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/pages/${slug}`)
        setPageData(response.data)
        setError(null)
      } catch (err) {
        console.error('Erro ao buscar página:', err)
        setError('Página não encontrada')
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error || !pageData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">404</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {error || 'Página não encontrada'}
          </p>
        </motion.div>
      </div>
    )
  }

  const theme = pageData.theme || {}
  const backgroundColor = theme.backgroundColor || '#ffffff'
  const buttonColor = theme.buttonColor || '#000000'
  const buttonTextColor = theme.buttonTextColor || '#ffffff'
  const textColor = theme.textColor || '#000000'

  const handleLinkClick = (link: Link) => {
    // Registrar clique na API (analytics)
    api.post(`/links/${link.id}/click`).catch(() => { })

    // Abrir link
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }
  console.log('Rendering PublicPage with data:', pageData)
  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Header com Avatar e Informações */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {pageData.avatarUrl && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <Avatar className="mx-auto h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={pageData.avatarUrl} alt={pageData.title || pageData.slug} />
                <AvatarFallback className="text-2xl">
                  {(pageData.title || pageData.slug).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}

          {pageData.title && (
            <motion.h1
              className="mt-4 text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {pageData.title}
            </motion.h1>
          )}

          {pageData.description && (
            <motion.p
              className="mt-2 text-lg opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {pageData.description}
            </motion.p>
          )}
        </motion.div>

        {/* Lista de Links */}
        <div className="space-y-4">
          {pageData.links.map((link, index) => {
            if (link.type === 'header') {
              return (
                <motion.h2
                  key={link.id}
                  className="text-2xl font-bold text-center mt-8 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  {link.title}
                </motion.h2>
              )
            }

            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleLinkClick(link)}
                  className="relative w-full h-auto min-h-[60px] p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                  style={{
                    backgroundColor: buttonColor,
                    color: buttonTextColor,
                  }}
                >
                  <div className="flex items-center justify-between w-full gap-4">
                    {link.thumbnailUrl && (
                      <img
                        src={link.thumbnailUrl}
                        alt={link.title || 'Link thumbnail'}
                        className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                      />
                    )}

                    <span className="flex-1 text-left font-medium">
                      {link.title || link.url}
                    </span>

                    <ExternalLink className="h-5 w-5 flex-shrink-0" />
                  </div>
                </Button>
              </motion.div>
            )
          })}
        </div>

        {pageData.links.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="text-lg opacity-60">Nenhum link adicionado ainda</p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          className="mt-16 text-center text-sm opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>Criado com <Link href="https://biosites.vercel.app/">biosites</Link></p>
        </motion.div>
      </div>
    </div>
  )
}
