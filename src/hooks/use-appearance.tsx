"use client"

import { useCallback, useEffect, useState } from 'react'
import type { AppearanceTheme } from '@/lib/types'
import THEME_PRESETS, { getPreset } from '@/lib/theme-presets'

const STORAGE_KEY = 'appearance_theme_v1'

export function useAppearance(initial?: AppearanceTheme) {
  const defaultTheme = initial ?? THEME_PRESETS?.[0]?.theme ?? ({} as AppearanceTheme)
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
    console.log('updateBackground patch:', patch)
    setTheme((prevTheme) => {
      const updated = { ...prevTheme, background: { ...prevTheme.background, ...patch } }
      console.log('updated theme:', updated)
      return updated
    })
  }, [])

  const updatebutton = useCallback((patch: Partial<AppearanceTheme['button']>) => {
    console.log('updatebutton patch:', patch)
    setTheme((prevTheme) => {
      const nextButton = { ...prevTheme.button, ...patch }

      if (patch.properties) {
        nextButton.properties = {
          ...prevTheme.button?.properties,
          ...patch.properties,
        }
      }

      return {
        ...prevTheme,
        button: nextButton,
      }
    })
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
    updatebutton,
    // reset,
    // save,
    // clearLocal,
  }
}

export default useAppearance
