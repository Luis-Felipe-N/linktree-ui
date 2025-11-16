'use client'

import TemplateDefault from '@/components/appearance/deafult'
import { BackgroundGrid } from '@/components/background-grid'
import { CopyUrlPage } from '@/components/copy-url-page'
import { SharePageDialog } from '@/components/share-page-dialog'
import { CustomizeButton } from '@/components/style/button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useActivePage } from '@/contexts/active-page'
import { useLinks } from '@/hooks/use-links'
import { Copy, Loader2 } from 'lucide-react'
import { is } from 'zod/v4/locales'

interface AdminAppearanceLayoutProps {
  children: React.ReactNode
}

export default function AdminAppearanceLayout({ children }: AdminAppearanceLayoutProps) {
  const { activePage } = useActivePage()
  console.log('activePage', activePage)

  const { data: links, isLoading: linksLoading } = useLinks(activePage?.id || null)
  if (!activePage) return null


  if (!activePage) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Página não encontrada</p>
      </main>
    )
  }

  const userProfileUrl = `https://mylinks.com/${activePage.slug}`

  return (
    <main className="relative flex flex-col lg:flex-row h-full">
      <div className="flex-1 p-6 bg-zinc-50/50 sticky top-0">
        <BackgroundGrid
          className="pointer-events-none absolute inset-0 opacity-60"
          cellSize={20}
          lineColor="rgba(113, 113, 122, 0.15)"
        />

        <div className="relative z-10">
          <section className="mb-8">
            <div className="flex items-center justify-between gap-4 mb-4">
              <CopyUrlPage slug={activePage.slug} />
              <SharePageDialog slug={activePage.slug} title={activePage.title || undefined} />
            </div>

            {!linksLoading && (<TemplateDefault links={links || []} page={activePage} />)}
          </section>
        </div>
      </div>

      {children}
    </main>
  )
}
