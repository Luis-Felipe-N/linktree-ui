'use client'

import TemplateDefault from '@/components/appearance/deafult'
import { BackgroundGrid } from '@/components/background-grid'
import { CustomizeButton } from '@/components/style/button'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { Link as LinkType, Page } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Copy } from 'lucide-react'
import { title } from 'process'

export default function Admin() {

  const userProfileUrl = `https://my-links.com/luis.nunnes`

  const PAGE: Page =
  {
    id: 'page1',
    title: 'Página Principal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ownerId: 'user1',
    theme: {
      title: 'Ocean',
      created_at: new Date().toISOString(),
      active: true,
      background: {
        active: true,
        id: 'bg1',
        type: 'GRADIENT',
        gradientStart: '#2b6cb0',
        gradientEnd: '#2c7a7b',
        gradientDirection: '135deg',
        style: 'WAVES',
      },
      button: {
        style: 'outline',
        color: '#ffffff',
        textColor: '#2b6cb0',
        textAlign: 'center',
        shadowStyle: 'none',
        backgroundColor: '#06b6d4',
        padding: ' 1rem',
        width: '100%',
      },
    },
    slug: 'luis.nunnes',
    description: 'Página de links do Luis Nunnes',
    imageUrl: 'https://avatars.githubusercontent.com/u/76018201?v=4',
  }

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
      pageId: 'page1',
      page: PAGE,
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
      pageId: 'page1',
      page: PAGE,
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
      pageId: 'page1',
      page: PAGE,
    },
  ]

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row">
      <div className="relative z-10 flex-1 p-6 bg-zinc-50/50">
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
                  <Button className='font-semibold bg-amber-500 rounded-xl px-4 text-white'>
                    <Copy size={10} strokeWidth={3} />
                    Copiar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* IPHONE 13 */}
            <TemplateDefault links={LINKS} page={PAGE} />

          </section>
        </div>
      </div>

      <aside className="relative z-10 p-4 lg:w-1/2">
        <div className="mt-8">
          <h1 className="font-semibold">Temas recomendados</h1>

          <ul className='mt-8'>
            {/* {APPEARANCE.map((appearance) => (
              <li key={appearance.title} className="mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{appearance.title}</CardTitle>
                    <CardDescription>{appearance.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {appearance.appearance.map((app) => (
                        <div key={app.title}>
                          <h3 className="mb-2 font-medium">{app.title}</h3>
                          <div className='flex gap-4' >
                            {
                              app.styles.map((style) => (
                                <div
                                  key={style.name}
                                  className={cn(
                                    'flex h-10 w-20 items-center justify-center border bg-gray-100 text-sm font-medium text-gray-700',
                                    style.className
                                  )}
                                >
                                  {style.name}
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))} */}

            <li className="mb-6">
              <CustomizeButton />
            </li>
          </ul>
        </div>
      </aside>
    </main >
  )
}