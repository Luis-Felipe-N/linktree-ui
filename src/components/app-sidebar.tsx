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