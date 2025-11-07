'use client'

import { ClaimUsernameForm } from "@/components/auth/claim-username-form";
import { useAuth } from "@/contexts/auth";

export default function NewPage() {
  const { user, isLoading } = useAuth()

  let redirectTo = '/register'

  if (!isLoading && user) {
    redirectTo = '/pages/new'
  }

  return (
    <main className="h-screen ">
      <video className="absolute inset-0 -z-10 object-cover w-full h-full" poster="https://static.biosites.com/editor/assets/graphics/create-site.png" src="https://static.biosites.com/editor/assets/videos/create-site.mp4"></video>
      <div className="w-full h-full bg-slate-900/30 backdrop-blur-md grid place-items-center">
        <div className="space-y-16 ">
          <h1 className="text-white font-bold text-2xl text-center">
            Escolha o nome da sua página
          </h1>
          <ClaimUsernameForm redirectTo={redirectTo} />
        </div>
      </div>
    </main>
  )
}
