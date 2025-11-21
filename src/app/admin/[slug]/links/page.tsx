'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { useActivePage } from '@/contexts/active-page'
import { AddLinkForm } from '@/components/admin/add-link-form'
import { EditLinkItem } from '@/components/admin/edit-link-item'
import { useLinks } from '@/hooks/use-links'
import { CopyUrlPage } from '@/components/copy-url-page'
import { SharePageDialog } from '@/components/share-page-dialog'
import { BackgroundGrid } from '@/components/background-grid'
import TemplateDefault from '@/components/appearance/default'

export default function AdminLinksPage() {
  const { activePage } = useActivePage()
  const { data: links, isLoading: linksLoading } = useLinks(activePage?.id || null)

  if (!activePage) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 mx-auto mb-4" />
          <p className="text-gray-600">Carregando página...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row">
      <div className="relative z-10 flex-1 p-6">
        <BackgroundGrid
          className="pointer-events-none absolute inset-0 opacity-60"
          cellSize={20}
          lineColor="rgba(113, 113, 122, 0.15)"
        />
        <div className="relative z-10">
          <section className="mb-8">
            <SharePageDialog slug={activePage.slug} title={activePage.title || undefined} />

            <TemplateDefault links={links || []} page={activePage} />
          </section>
        </div>
      </div>

      <aside className="relative z-10 p-4 lg:w-1/2 overflow-y-auto border-l">
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Gerenciar Links</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione e organize os links da sua página
              </p>
            </div>
            <SharePageDialog slug={activePage.slug} title={activePage.title || undefined} />
          </div>

          <AddLinkForm pageId={activePage.id} />

          {/* Lista de Links Existentes */}
          <div className="space-y-4">
            <h2 className="font-semibold">Links Existentes</h2>
            {linksLoading ? (
              <div className="text-center py-8">
                <Loader2 className="animate-spin h-8 w-8 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Carregando links...</p>
              </div>
            ) : links && links.length > 0 ? (
              <div className="space-y-3">
                {links.map((link) => (
                  <EditLinkItem key={link.id} link={link} pageId={activePage.id} />
                ))}
              </div>
            ) : (
              <Card className="bg-white">
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    Nenhum link adicionado ainda. Adicione seu primeiro link acima!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </aside>
    </main>
  )
}
