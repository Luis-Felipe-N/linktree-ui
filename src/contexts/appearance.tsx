"use client"

import React, { createContext, useContext } from 'react'
import type { AppearanceTheme } from '@/lib/types'
import useAppearance from '@/hooks/use-appearance'

type AppearanceContextValue = ReturnType<typeof useAppearance>

const AppearanceContext = createContext<AppearanceContextValue | undefined>(undefined)

export function AppearanceProvider({ children, initial }: { children: React.ReactNode; initial?: AppearanceTheme }) {
  const value = useAppearance(initial)
  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
}

export function useAppearanceContext() {
  const ctx = useContext(AppearanceContext)
  if (!ctx) throw new Error('useAppearanceContext must be used within an AppearanceProvider')
  return ctx
}

export default AppearanceProvider
