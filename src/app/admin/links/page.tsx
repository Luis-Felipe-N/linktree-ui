'use client'

import { BackgroundGrid } from '@/components/background-grid'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { Copy, Image, LayoutDashboard } from 'lucide-react'


export default function Admin() {

  const userProfileUrl = `https://my-links.com/luis.nunnes`

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
          </section>
        </div>
      </div>

      <aside className="relative z-10 p-4 lg:w-1/2 bg-slate-100 ">
        <div className="mt-8">
          <h1 className="font-semibold">Links </h1>

          <div>
            <div className='bg-white p-4 rounded-2xl mt-4 space-y-2'>
              <div>
                
              </div>
              <div className='space-y-2'>
                <Input type="text" name='Titulo' className='h-10' value="Portifolio" />
                <Input type="url" name='URL' className='h-10' value="https://" />
              </div>
              <div>
                <Button size="icon" className='hover:bg-slate-100'>
                  <LayoutDashboard className='text-gray-600' />
                </Button>
                <Button size="icon" className='hover:bg-slate-100'>
                  <Image className='text-gray-600' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>
  )
}