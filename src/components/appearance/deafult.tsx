"use client"

import { BackgroundGrid } from '@/components/background-grid'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { Link as LinkType, Page } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import THEME_PRESETS from '@/lib/theme-presets'
import { useAppearanceContext } from '@/contexts/appearance'

interface TemplateProps {
  links: LinkType[]
  page: Page
}

export default function TemplateDefault({ links, page }: TemplateProps) {
  const { theme } = useAppearanceContext()
  const appliedTheme = theme
  console.log('appliedTheme:', appliedTheme, theme)
  const backgroundToStyle = (bg: any) => {
    if (!bg) return {}
    if (bg.type === 'GRADIENT') {
      const start = bg.gradientStart ?? '#ffffff'
      const end = bg.gradientEnd ?? '#000000'
      const dir = bg.gradientDirection ?? 'to right'
      return { background: `linear-gradient(${dir}, ${start}, ${end})` }
    }
    if (bg.type === 'COLOR') {
      return { backgroundColor: bg.color ?? '#ffffff' }
    }
    // fallback to any provided background inline object
    return { ...(bg || {}) }
  }

  const buttonStyleFrom = (bs: any) => {
    if (!bs) return {}
    console.log('button style from:', bs)
    const propities = Object.assign({},
      bs?.backgroundStyle?.properties ?? {},
      bs?.textStyle?.properties ?? {},
      bs?.shapeStyle?.properties ?? {}
    )
    return propities
  }

  const containerStyle = backgroundToStyle(appliedTheme?.background)
  const containerClassName = cn(appliedTheme?.background?.className ?? '')
  const linkButtonClassName = cn(appliedTheme?.buttonStyle?.className ?? '')
  const linkButtonStyle = buttonStyleFrom(appliedTheme?.buttonStyle)

  console.log(linkButtonClassName)
  return (
    <div className='grid place-items-center'>
      <div className='mt-8 rounded-[4.5rem] shadow-md overflow-hidden grid place-items-center'>
        <Image
          src="/iphone.png"
          width={479}
          height={972}
          alt="iPhone 13"
          className='max-w-[24.375rem] max-h-[49.4375rem] absolute z-0'
        />
        <div className={cn('w-[22.9rem] h-[49.4375rem] px-2', containerClassName)} style={containerStyle}>
          <div style={{ backgroundImage: 'url(https://images.pexels.com/photos/18884939/pexels-photo-18884939.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '170px', width: '100%' }}>
          </div>

          <ul className='w-full p-8 space-y-2'>
            {links.map((link) => (
              <li key={link.id} className="w-full">
                <Link href={link.url} className={cn('block w-full text-center', linkButtonClassName)} style={linkButtonStyle}>
                  <span className="font-semibold">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}