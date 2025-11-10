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
import { PageSwitcher } from './page-switcher'

export function AppSidebar() {
  const { activePage } = useActivePage()

  const items = [
    {
      title: 'Links',
      url: activePage ? `/admin/${activePage.slug}/links` : '/admin/links',
      icon: LinkIcon,
    },
    {
      title: 'Aparência',
      url: activePage ? `/admin/${activePage.slug}/appearance` : '/admin/appearance/theme',
      icon: Palette,
    },
    {
      title: 'Perfil',
      url: '/admin/profile',
      icon: User,
    },
    {
      title: 'Configurações',
      url: '/admin/settings',
      icon: Settings,
    },
  ]
  return (
    <Sidebar className='p-4'>
      <SidebarHeader>
        <PageSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            /mylinks
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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