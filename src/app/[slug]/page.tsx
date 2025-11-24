'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { usePage } from '@/hooks/use-pages'
import type { Link as LinkType } from '@/lib/types'

export default function PublicPage() {
  const params = useParams()
  const slug = params.slug as string
  const { data: page } = usePage(slug)

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-muted-foreground" />
      </div>
    )
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const handleLinkClick = (link: LinkType) => {
    api.post(`/links/${link.id}/click`).catch(() => { })
    window.open(link.url, '_blank', 'noopener,noreferrer')
  }

  console.log(page)

  return (
    <div
      className="min-h-screen py-12 px-4 w-full flex flex-col items-center"
      style={page.theme?.background?.properties}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center flex items-center flex-col mb-8"
      >
        <Avatar className='w-24 h-24 mb-4 ring-4 ring-white/20 shadow-xl'>
          <AvatarImage src={page?.imageUrl || ''} alt={page?.title || 'Avatar'} className="object-cover" />
          <AvatarFallback className='bg-white/10 text-white text-3xl font-bold backdrop-blur-sm'>
            {page?.title?.charAt(0).toUpperCase() || 'N'}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-bold mb-2 tracking-tight drop-shadow-sm" >
          {page?.title || ''}
        </h1>
        <p className="text-sm opacity-90 font-medium max-w-[280px] leading-relaxed drop-shadow-sm" >
          {page?.description || ''}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full space-y-4 flex-1"
      >
        {page.links && page.links.map((link) => (
          <motion.div key={link.id} variants={itemVariants}>
            <Link
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-6 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
              style={page.theme.button?.properties}
            >
              <span className="font-semibold text-sm sm:text-base truncate max-w-full">{link.title}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-16 text-center text-sm opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className='text-[10px] font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity'>Criado por <Link href="https://biosite.vercel/">biosite</Link></p>
      </motion.div>
    </div >
  )
}
