'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Link, Page } from '@/lib/types'

interface LinksContextValue {
  links: Link[] | []
  setLinks: (links: Link[] | []) => void
}

const LinksContext = createContext<LinksContextValue | undefined>(undefined)

interface LinksProviderProps {
  children: ReactNode
}

export function LinksProvider({ children }: LinksProviderProps) {
  const [links, setLinksState] = useState<Link[] | []>([])

  // Salvar no localStorage quando mudar
  const setLinks = (links: Link[] | []) => {
    setLinksState(links)
    if (links) {
      localStorage.setItem('links', JSON.stringify(links))
    } else {
      localStorage.removeItem('links')
    }
  }

  // Carregar do localStorage na inicialização
  useEffect(() => {
    const savedPage = localStorage.getItem('links')
    if (savedPage) {
      try {
        setLinksState(JSON.parse(savedPage))
      } catch (error) {
        console.error('Error loading active page from localStorage:', error)
      }
    }
  }, [])

  return (
    <LinksContext.Provider value={{ links, setLinks }}>
      {children}
    </LinksContext.Provider>
  )
}

export function useLinks() {
  const context = useContext(LinksContext)

  if (context === undefined) {
    throw new Error('useLinks must be used within an LinksProvider')
  }

  return context
}
