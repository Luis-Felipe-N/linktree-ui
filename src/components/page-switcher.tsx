"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

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
import { usePages } from "@/hooks/use-pages"
import { cn } from "@/lib/utils"

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
    const page = pages?.find((p) => p.id === pageId)
    if (page) {
      setActivePage(page)
      router.push(`/admin/${page.slug}/appearance/theme`)
    }
  }

  const handleCreateNewPage = () => {
    router.push("/pages/new")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all duration-200 group/button"
              aria-label={activePage ? `Página atual: ${activePage.title}` : "Selecione uma página"}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground border border-border/50 overflow-hidden shrink-0">
                <Avatar className="h-full w-full rounded-lg">
                  <AvatarImage
                    src={activePage?.imageUrl || undefined}
                    alt={activePage?.title || "Page Avatar"}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-semibold">
                    {activePage?.title?.charAt(0).toUpperCase() || "P"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-hover/button:translate-x-0.5 transition-transform duration-200 group-data-[state=collapsed]:hidden">
                <span className="truncate font-semibold">
                  {activePage?.title || "Selecione uma página"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {activePage?.slug ? `mylink.com/${activePage.slug}` : "Nenhuma página selecionada"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50 group-hover/button:opacity-100 transition-opacity group-data-[state=collapsed]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl p-1 shadow-lg border-border/50"
            align="start"
            sideOffset={4}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-4 text-muted-foreground gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs">Carregando páginas...</span>
              </div>
            ) : pages && pages.length > 0 ? (
              <>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground/70">
                  Suas Páginas
                </div>
                {pages.map((page) => (
                  <DropdownMenuItem
                    key={page.id}
                    onClick={() => handlePageChange(page.id)}
                    className="gap-3 p-2 cursor-pointer focus:bg-accent focus:text-accent-foreground rounded-lg transition-colors duration-150"
                  >
                    <div className="flex size-8 items-center justify-center rounded-md border bg-background overflow-hidden shrink-0">
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarImage src={page.imageUrl || undefined} className="object-cover" />
                        <AvatarFallback className="bg-transparent text-xs font-medium">
                          {page.title?.charAt(0).toUpperCase() || "P"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">{page.title || "Sem título"}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        /{page.slug}
                      </span>
                    </div>
                    {activePage?.id === page.id && (
                      <Check className="ml-auto size-4 text-primary animate-in fade-in zoom-in duration-200" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="my-1" />
              </>
            ) : (
              <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                Nenhuma página encontrada
              </div>
            )}
            <DropdownMenuItem
              onClick={handleCreateNewPage}
              className="gap-2 p-2 cursor-pointer text-primary focus:text-primary focus:bg-primary/10 rounded-lg font-medium transition-colors duration-150"
            >
              <div className="flex size-6 items-center justify-center rounded-md border border-dashed border-primary/30 bg-background">
                <Plus className="size-4" />
              </div>
              <span className="text-sm">Criar nova página</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
