import type { Metadata } from 'next'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { ProtectedRoute } from '@/components/auth/protected-route'

export const metadata: Metadata = {
  title: '/my-links :: Admin',
  description: 'Painel administrativo do /my-links',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full h-screen overflow-auto">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}
