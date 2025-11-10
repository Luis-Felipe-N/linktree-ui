"use client"

import { useAppearanceContext } from '@/contexts/appearance'
import { cn } from '@/lib/utils'
import type { Link as LinkType, Page } from '@/lib/types'
import Link from 'next/link'
import Iphone15Pro from '../iphone-15'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface TemplateProps {
  links: LinkType[]
  page: Page
}

export default function TemplateDefault({ links, page }: TemplateProps) {
  const { theme } = useAppearanceContext()

  const backgroundToStyle = (bg: any) => {
    if (!bg) return {}
    if (bg.type === 'IMAGE' && bg.imageUrl) {
      return {
        backgroundImage: `url(${bg.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    }
    if (bg.type === 'GRADIENT') {
      const start = bg.gradientStart ?? '#ffffff'
      const end = bg.gradientEnd ?? '#000000'
      const dir = bg.gradientDirection ?? 'to right'
      return { background: `linear-gradient(${dir}, ${start}, ${end})` }
    }
    if (bg.type === 'COLOR') {
      return { backgroundColor: bg.color ?? '#ffffff' }
    }
    return bg?.properties || {}
  }

  const buttonStyleFrom = (bs: any) => {
    if (!bs) return {}
    return {
      ...bs?.backgroundStyle?.properties,
      ...bs?.textStyle?.properties,
      ...bs?.shapeStyle?.properties,
      ...bs?.shadowStyle?.properties,
    }
  }

  const containerStyle = backgroundToStyle(theme?.background)
  const linkButtonStyle = buttonStyleFrom(theme?.buttonStyle)
  const textColor = theme?.typeface?.color || '#000000'

  console.log('TemplateDefault render:', { page })

  return (
    <div className="h-full flex items-center justify-center p-4 lg:p-8">
      <div className="max-w-md">
        <Iphone15Pro>
          <div
            className="w-full h-full flex flex-col items-center justify-start py-8 px-6 overflow-y-auto"
            style={containerStyle}
          >
            {/* Profile section */}
            <div className="text-center flex items-center flex-col mb-6">

              <Avatar className='w-20 h-20 '>
                <AvatarImage src={page?.imageUrl || ''} alt={page?.title || 'Avatar'} />
                <AvatarFallback className='bg-white/10 text-white text-2xl font-bold'>
                  {page?.title?.charAt(0).toUpperCase() || 'N'}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold mb-1" style={{ color: textColor }}>
                {page?.title || ''}
              </h1>
              <p className="text-sm opacity-90" style={{ color: textColor }}>
                {page?.description || ''}
              </p>
            </div>

            {/* Links section */}
            <div className="w-full space-y-3">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="w-full flex items-center justify-center px-6 py-3 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={linkButtonStyle}
                >
                  <span className="font-semibold">{link.title}</span>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 text-center">
              <p className="text-xs opacity-60" style={{ color: textColor }}>
                Made with ❤️
              </p>
            </div>
          </div>
        </Iphone15Pro>
      </div>
    </div>
  )
}