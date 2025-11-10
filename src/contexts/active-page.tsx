'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Page } from '@/lib/types'

interface ActivePageContextValue {
  activePage: Page | null
  setActivePage: (page: Page | null) => void
}

const ActivePageContext = createContext<ActivePageContextValue | undefined>(undefined)

interface ActivePageProviderProps {
  children: ReactNode
}

export function ActivePageProvider({ children }: ActivePageProviderProps) {
  const [activePage, setActivePageState] = useState<Page | null>(null)

  // Salvar no localStorage quando mudar
  const setActivePage = (page: Page | null) => {
    setActivePageState(page)
    if (page) {
      localStorage.setItem('activePage', JSON.stringify(page))
    } else {
      localStorage.removeItem('activePage')
    }
  }

  // Carregar do localStorage na inicialização
  useEffect(() => {
    const savedPage = localStorage.getItem('activePage')
    if (savedPage) {
      try {
        setActivePageState(JSON.parse(savedPage))
      } catch (error) {
        console.error('Error loading active page from localStorage:', error)
      }
    }
  }, [])

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  )
}

export function useActivePage() {
  const context = useContext(ActivePageContext)

  if (context === undefined) {
    throw new Error('useActivePage must be used within an ActivePageProvider')
  }

  return context
}
