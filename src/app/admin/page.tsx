'use client'

import { BackgroundGrid } from '@/components/background-grid'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
        
      </div>

      <aside className="relative z-10 p-4 lg:w-96">
        <Card className="bg-zinc-50">
          <CardHeader>
            <CardTitle>Compartilhe</CardTitle>
            <CardDescription>
              Seu link está disponível em:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="profile-url">URL do Perfil</Label>
              <Input
                id="profile-url"
                type="text"
                value={userProfileUrl}
                readOnly
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <h1 className="font-semibold">Temas recomendados</h1>
        </div>
      </aside>
    </main>
  )
}