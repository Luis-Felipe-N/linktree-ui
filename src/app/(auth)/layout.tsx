import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '/my-links - Autenticação',
  description: 'Faça login ou crie sua conta no /my-links',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen grid lg:grid-cols-[3fr_2fr] grid-cols-1">
      {children}

      <div className="relative h-screen hidden lg:block">
        <Image
          className="object-cover"
          src="https://images.pexels.com/photos/8609315/pexels-photo-8609315.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Pessoa usando smartphone"
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 0vw"
        />
      </div>
    </main>
  )
}
