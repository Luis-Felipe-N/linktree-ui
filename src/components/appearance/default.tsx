"use client"

import { useAppearanceContext } from '@/contexts/appearance'
import type { Link as LinkType, Page } from '@/lib/types'
import Link from 'next/link'
import Iphone15Pro from '../iphone-15'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { motion } from 'framer-motion'

interface TemplateProps {
  links: LinkType[]
  page: Page
}

export default function TemplateDefault({ links, page }: TemplateProps) {
  const theme = page?.theme

  console.log('Rendering TemplateDefault with theme:', theme)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="h-full flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-md w-full">
        <Iphone15Pro>
          <div
            className="w-full h-full flex flex-col items-center justify-start py-12 px-6 overflow-y-auto scrollbar-hide"
            style={theme.background?.properties}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center flex items-center flex-col mb-8 w-full"
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
              className="w-full space-y-4"
            >
              {links.map((link) => (
                <motion.div key={link.id} variants={itemVariants}>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-6 py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                    style={theme.button?.properties}
                  >
                    <span className="font-semibold text-sm sm:text-base truncate max-w-full">{link.title}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-auto pt-12 pb-6 text-center"
            >
              <p className="text-[10px] font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
                Linktree Clone
              </p>
            </motion.div>
          </div>
        </Iphone15Pro>
      </div>
    </div>
  )
}