'use client'

import { BackgroundGrid } from '@/components/background-grid'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ThemeGenerator from '@/components/theme-generator'
import { Copy } from 'lucide-react'
import Image from 'next/image'

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
            <Card className="bg-zinc-50">
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
            <div className='grid place-items-center'>
              <div className='bg-white w-[24.375rem] mt-8 rounded-[4.5rem] shadow-md overflow-hidden'>
                <Image
                  src="/iphone.png"
                  width={479}
                  height={972}
                  alt="iPhone 13"
                  className='max-w-[24.375rem] max-h-[49.4375rem] absolute'
                />
                <div className=' h-[49.4375rem] p-4'>
                  <div style={{ backgroundImage: 'url(https://images.pexels.com/photos/18884939/pexels-photo-18884939.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '170px', width: '100%', borderRadius: '8px' }}>

                  </div>
                  {/* CONTENT */}
                  <div className='bg-white h-full p-8'>
                    asdas
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>

      <aside className="relative z-10 p-4 lg:w-96">


        <div className="mt-8">
          <h1 className="font-semibold">Temas recomendados</h1>
        </div>
      </aside>
    </main>
  )
}