'use client'

import { Link as LinkIcon, Palette, Settings, User } from 'lucide-react'
import Link from 'next/link'

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
} from '@/components/ui/sidebar'

import { useActivePage } from '@/contexts/active-page'
import { PageSwitcher } from './pages/page-switcher'

export function AppSidebar() {
  const { activePage } = useActivePage()

  const items = activePage ? [
    {
      title: 'Links',
      url: `/admin/${activePage.slug}/links`,
      icon: LinkIcon,
    },
    {
      title: 'Aparência',
      url: `/admin/${activePage.slug}/appearance/theme`,
      icon: Palette,
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none group"
                    >
                      <item.icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}