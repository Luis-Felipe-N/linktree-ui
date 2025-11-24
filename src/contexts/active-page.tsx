'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import type { Page } from '@/lib/types'
import { usePages } from '@/hooks/use-pages'

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
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin') ?? false
  const { data: pages } = usePages({ enabled: isAdminRoute })

  const setActivePage = useCallback((page: Page | null) => {
    setActivePageState(page)
    if (page) {
      localStorage.setItem('activePage', JSON.stringify(page))
    } else {
      localStorage.removeItem('activePage')
    }
  }, [])

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

  useEffect(() => {
    if (!isAdminRoute || !pages || pages.length === 0) return

    if (!activePage) {
      setActivePage(pages[0])
      return
    }

    const stillExists = pages.some((page) => page.id === activePage.id)
    if (!stillExists) {
      setActivePage(pages[0])
    }
  }, [pages, activePage, setActivePage, isAdminRoute])

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
