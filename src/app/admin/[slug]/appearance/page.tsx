'use client'

import TemplateDefault from '@/components/appearance/deafult'
import { BackgroundGrid } from '@/components/background-grid'
import { CustomizeButton } from '@/components/style/button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { usePageContext } from '@/contexts/page'
import type { Link as LinkType } from '@/lib/types'
import { Copy, Loader2 } from 'lucide-react'

export default function AdminAppearancePage() {
  const { page, isLoading } = usePageContext()

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto mb-4" />
          <p className="text-gray-600">Carregando página...</p>
        </div>
      </main>
    )
  }

  if (!page) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Página não encontrada</p>
      </main>
    )
  }

  const userProfileUrl = `https://mylinks.com/${page.slug}`

  // Mock links for preview (TODO: fetch real links)
  const LINKS: LinkType[] = [
    {
      id: '1',
      title: 'Meu Site',
      url: 'https://meusite.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      active: true,
      order: 1,
      clickCount: 120,
      pageId: page.id,
      page: page,
    },
    {
      id: '2',
      title: 'Blog',
      url: 'https://meusite.com/blog',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      active: true,
      order: 2,
      clickCount: 85,
      pageId: page.id,
      page: page,
    },
    {
      id: '3',
      title: 'Portfólio',
      url: 'https://meusite.com/portfolio',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      active: true,
      order: 3,
      clickCount: 45,
      pageId: page.id,
      page: page,
    },
  ]

  return (
    <main className="relative flex flex-col lg:flex-row">
      <div className="flex-1 p-6 bg-zinc-50/50 sticky top-0">
        <BackgroundGrid
          className="pointer-events-none absolute inset-0 opacity-60"
          cellSize={20}
          lineColor="rgba(113, 113, 122, 0.15)"
        />

        <div className="relative z-10">
          <section className="mb-8">
            <Card className="bg-zinc-50 rounded-3xl">
              <CardContent>
                <div className='flex gap-2'>
                  <Input
                    className='h-10'
                    id="profile-url"
                    type="text"
                    value={userProfileUrl}
                    readOnly
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <Button
                    className='font-semibold bg-amber-500 rounded-xl px-4 text-white'
                    onClick={() => navigator.clipboard.writeText(userProfileUrl)}
                  >
                    <Copy size={10} strokeWidth={3} />
                    Copiar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* IPHONE PREVIEW */}
            <TemplateDefault links={LINKS} page={page} />
          </section>
        </div>
      </div>

      <aside className="relative z-10 p-4 lg:w-1/2 inset-0 border-l">
        <div className="mt-8 space-y-4 px-4">
          <h1 className="font-semibold">
            Personalize a Aparência da Sua Página
          </h1>

          <CustomizeButton />
        </div>
      </aside>
    </main>
  )
}
