'use client'

import { BackgroundGrid } from '@/components/background-grid'
import { SharePageDialog } from '@/components/pages/share-page-dialog'
import { usePageContext } from '@/contexts/page'
import { useLinks } from '@/hooks/use-links'
import { AppearanceProvider } from '@/contexts/appearance'
import TemplateDefault from '@/components/appearance/default'
import { Loader2 } from 'lucide-react'
import { useActivePage } from '@/contexts/active-page'

interface AdminAppearanceLayoutProps {
  children: React.ReactNode
}

export default function AdminAppearanceLayout({ children }: AdminAppearanceLayoutProps) {
  const { activePage } = useActivePage()

  const { data: links, isLoading: linksLoading } = useLinks(activePage?.id || null)

  if (!activePage) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-zinc-500" />
      </main>
    )
  }

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
