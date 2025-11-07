'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Plus, ExternalLink, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { usePages } from '@/hooks/use-pages'
import { Input } from '@/components/form/input'
import { cn } from '@/lib/utils'

export default function Admin() {
  const { data: pages, isLoading, error, refetch } = usePages()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando páginas...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Erro</CardTitle>
            <CardDescription>
              {error instanceof Error ? error.message : 'Erro ao carregar páginas'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden p-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Minhas Páginas</h1>
            <p className="text-gray-600 mt-2">
              Gerencie suas páginas de links
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/pages/new">
              <Plus className="w-4 h-4 mr-2" />
              Nova Página
            </Link>
          </Button>
        </div>

        {!pages || pages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600 mb-4">
                Você ainda não tem páginas criadas
              </p>
              <Button asChild>
                <Link href="/pages/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar minha primeira página
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pages?.map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{page.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {page.description || 'Sem descrição'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Input
                      name="username"
                      placeholder="nomedapagina"
                      className={cn('flex-1 text-slate-700')}
                      showPrefix={true}
                      autoComplete="username"
                      value={page.slug}
                    >
                      <span className="whitespace-nowrap text-zinc-500">mylinks.com/</span>
                    </Input>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(`${window.location.origin}/${page.username}`)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1" variant="outline">
                      <Link href={`/admin/${page.slug}/appearance`}>
                        Aparência
                      </Link>
                    </Button>
                    <Button asChild className="flex-1" variant="outline">
                      <Link href={`/admin/${page.slug}/links`}>
                        Links
                      </Link>
                    </Button>
                    <Button asChild size="icon" variant="outline">
                      <Link href={`/${page.username || page.slug}`} target="_blank">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}