"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { useActivePage } from "@/contexts/active-page"
import { useRouter } from "next/navigation"
import { usePages } from "@/hooks/use-pages"

export function PageSwitcher() {
  const { data: pages, isLoading } = usePages()
  const { activePage, setActivePage } = useActivePage()
  const router = useRouter()

  React.useEffect(() => {
    if (!activePage && pages && pages.length > 0) {
      setActivePage(pages[0])
    }
  }, [pages, activePage, setActivePage])

  const handlePageChange = (pageId: string) => {
    const page = pages?.find(p => p.id === pageId)
    if (page) {
      setActivePage(page)
      router.push(`/admin/${page.slug}/appearance/theme`)
    }
  }

  const handleCreateNewPage = () => {
    router.push('/pages/new')
  }

  console.log('Rendering PageSwitcher with activePage:', activePage)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Avatar>
                  <AvatarImage
                    className='rounded'
                    src={activePage?.imageUrl || 'https://github.com/shadcn.png'}
                    alt={activePage?.title || 'User'}
                  />
                  <AvatarFallback>
                    {activePage?.title?.charAt(0).toUpperCase() || 'N'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">
                  {activePage?.title || 'Selecione uma página'}
                </span>
                <span className="text-xs">
                  mylink.com/{activePage?.slug || 'no-page'}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) "
            align="start"
          >
            {isLoading ? (
              <DropdownMenuItem disabled>
                <span className="text-xs text-muted-foreground">Carregando...</span>
              </DropdownMenuItem>
            ) : pages && pages.length > 0 ? (
              <>
                {pages.map((page) => (
                  <DropdownMenuItem
                    key={page.id}
                    onClick={() => handlePageChange(page.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Avatar >
                        <AvatarImage src={page.imageUrl || undefined} />
                        <AvatarFallback className="text-xs">
                          {page.title?.charAt(0).toUpperCase() || 'P'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{page.title || 'Sem título'}</div>
                        <div className="text-xs text-muted-foreground">{page.slug}</div>
                      </div>
                      {activePage?.id === page.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            ) : (
              <DropdownMenuItem disabled>
                <span className="text-xs text-muted-foreground">Nenhuma página criada</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleCreateNewPage} className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              <span>Criar nova página</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
