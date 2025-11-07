'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { usePage } from '@/hooks/use-pages'
import type { Page } from '@/lib/types'

interface PageContextValue {
  page: Page | null | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

const PageContext = createContext<PageContextValue | undefined>(undefined)

interface PageProviderProps {
  pageSlug: string
  children: ReactNode
}

export function PageProvider({ pageSlug, children }: PageProviderProps) {
  const { data: page, isLoading, error, refetch } = usePage(pageSlug)

  console.log('PageProvider state:', { pageSlug, page, isLoading, error })

  return (
    <PageContext.Provider
      value={{
        page,
        isLoading,
        error,
        refetch,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export function usePageContext() {
  const context = useContext(PageContext)

  if (context === undefined) {
    throw new Error('usePageContext must be used within a PageProvider')
  }

  return context
}
