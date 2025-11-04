"use client"

import { useCallback, useEffect, useState } from 'react'
import type { AppearanceTheme } from '@/lib/types'
import THEME_PRESETS, { getPreset } from '@/lib/theme-presets'

const STORAGE_KEY = 'appearance_theme_v1'

export function useAppearance(initial?: AppearanceTheme) {
  const defaultTheme = initial ?? THEME_PRESETS?.[1]?.theme ?? ({} as AppearanceTheme)
  const [theme, setTheme] = useState<AppearanceTheme>(defaultTheme)

  // useEffect(() => {
  //   try {
  //     const raw = localStorage.getItem(STORAGE_KEY)
  //     if (raw) {
  //       const parsed = JSON.parse(raw) as AppearanceTheme
  //       setTheme(parsed)
  //     }
  //   } catch (e) {
  //   }
  // }, [])

  // useEffect(() => {
  //   try {
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
  //   } catch (e) {
  //   }
  // }, [theme])

  const loadPreset = useCallback((key: string) => {
    const p = getPreset(key)
    if (p?.theme) setTheme(p.theme)
  }, [])

  const updateBackground = useCallback((patch: Partial<AppearanceTheme['background']>) => {
    setTheme((prev) => ({ ...(prev ?? {}), background: { ...(prev?.background ?? {}), ...(patch as any) } }))
  }, [])

  const updateButtonStyle = useCallback((patch: Partial<AppearanceTheme['buttonStyle']>) => {
    console.log('updateButtonStyle patch:', patch)
    const themeUpdated = { ...theme, buttonStyle: { ...theme.buttonStyle, ...patch } }
    setTheme(themeUpdated)
    console.log('updated theme:', theme)
  }, [])

  // const reset = useCallback(() => setTheme(defaultTheme), [defaultTheme])

  // const save = useCallback(() => {
  //   try {
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
  //   } catch { }
  // }, [theme])

  // const clearLocal = useCallback(() => {
  //   try {
  //     localStorage.removeItem(STORAGE_KEY)
  //   } catch { }
  // }, [])

  return {
    theme,
    setTheme,
    loadPreset,
    updateBackground,
    updateButtonStyle,
    // reset,
    // save,
    // clearLocal,
  }
}

export default useAppearance
