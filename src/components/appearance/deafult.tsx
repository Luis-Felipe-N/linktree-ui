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

interface TemplateProps {
  links: LinkType[]
  page: Page
}

export default function TemplateDefault({ links, page }: TemplateProps) {
  // Use the page theme if present, otherwise fall back to the first preset
  const presetTheme = THEME_PRESETS?.[0]?.theme
  const appliedTheme = presetTheme

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
    const textColor = bs?.textStyle?.color ?? bs?.textColor ?? '#000'
    const bgColor = bs?.backgroundStyle?.color ?? bs?.color ?? (bs?.type === 'FILL' ? '#111827' : 'transparent')
    const shadowType = bs?.shadowStyle?.type ?? bs?.shadowStyle ?? null
    const boxShadow = shadowType === 'SHADOW_FULL' ? '0 8px 30px rgba(0,0,0,0.18)' : shadowType === 'SHADOW_SMALL' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
    const border = bs?.type === 'OUTLINE' ? `1px solid ${bgColor === 'transparent' ? '#e5e7eb' : bgColor}` : 'none'
    return {
      backgroundColor: bgColor,
      color: textColor,
      boxShadow,
      border,
      padding: '12px 16px',
      borderRadius: '8px',
      display: 'inline-block',
      textDecoration: 'none',
    }
  }

  const containerStyle = backgroundToStyle(appliedTheme?.background)
  const linkButtonStyle = buttonStyleFrom(appliedTheme?.buttonStyle || appliedTheme?.button)

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
        <div className='w-[22.9rem] h-[49.4375rem] px-2' style={containerStyle}>
          <div style={{ backgroundImage: 'url(https://images.pexels.com/photos/18884939/pexels-photo-18884939.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '170px', width: '100%' }}>

          </div>

          <ul className='w-full p-8 space-y-2'>
            {links.map((link) => (
              <li key={link.id} className="w-full">
                <Link href={link.url} className='block w-full' style={linkButtonStyle}>
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