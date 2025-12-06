'use client'

import { Link as LinkIcon, LogOut, Palette } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

import { useActivePage } from '@/contexts/active-page'
import { PageSwitcher } from './pages/page-switcher'
import { useAuth } from '@/contexts/auth'

export function AppSidebar() {
  const { activePage } = useActivePage()
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  const initials = user?.username?.[0]?.toUpperCase() ?? '?'

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const navItems = activePage ? [
    {
      title: 'Links',
      url: `/admin/${activePage.slug}/links`,
      icon: LinkIcon,
    },
    {
      title: 'Aparência',
      url: `/admin/${activePage.slug}/appearance`,
      icon: Palette,
      children: [
        {
          title: 'Tema',
          url: `/admin/${activePage.slug}/appearance/theme`,
        },
        {
          title: 'Botões',
          url: `/admin/${activePage.slug}/appearance/button`,
        },
      ],
    },
  ] : []
  return (
    <Sidebar className="border-r border-border/50 bg-sidebar transition-all duration-300 ease-in-out">
      <SidebarHeader className="p-2 md:p-4">
        <PageSwitcher />
      </SidebarHeader>
      <SidebarContent className="px-2 md:px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 px-2 mb-2">
            biosite.vercel
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const isActiveParent = pathname?.startsWith(item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActiveParent}>
                      <Link
                        href={item.children ? item.children[0].url : item.url}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none group"
                      >
                        <item.icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                    {item.children && (
                      <SidebarMenuSub>
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === child.url}>
                              <Link href={child.url}>
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto px-2 md:px-4 pb-4">
        <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-sidebar-accent/30 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initials}
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium leading-tight">{user?.username ?? 'Conta'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email ?? '—'}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={handleLogout}
            title="Sair"
          >
            <LogOut className="size-4" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}