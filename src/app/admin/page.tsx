'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth'

export default function Admin() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const userProfileUrl = `https://my-links.com/${user.username}`

  return (
    <main className="flex flex-col lg:flex-row gap-4 p-4">
      <div className="flex-1 border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div>
          <h2 className="text-xl">Bem-vindo, {user.username}!</h2>
          <p className="text-zinc-400 mt-2">
            Gerencie seus links e personalize seu perfil.
          </p>
        </div>
      </div>

      <aside className="lg:w-96">
        <Card>
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
      </aside>
    </main>
  )
}