'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Page, AppearanceTheme } from '@/lib/types'

interface UsePagesOptions {
  enabled?: boolean
}

export function usePages(options?: UsePagesOptions) {
  return useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const response = await api.get('/me/pages')
      const pages: Page[] = response.data.pages

      return pages
    },
    enabled: options?.enabled ?? true,
  })
}

export function usePage(pageSlug: string | null) {
  return useQuery({
    queryKey: ['page', pageSlug],
    queryFn: async () => {
      if (!pageSlug) return null

      try {
        const response = await api.get(`/pages/${pageSlug}`)
        return response.data.page as Page
      } catch (error) {
        console.error('Failed to fetch page:', error)
        throw error
      }
    },
    enabled: !!pageSlug,
    retry: 1,
  })
}

export function useUpdatePage(pageId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Page>) => {
      const response = await api.put(`/pages/${pageId}`, data)
      return response.data
    },
    onSuccess: (_, variables) => {
      // Invalidate both page queries
      queryClient.invalidateQueries({ queryKey: ['pages'] })
      queryClient.invalidateQueries({ queryKey: ['page'] })
    },
  })
}

export function useUpdatePageTheme(pageId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (theme: AppearanceTheme) => {
      const response = await api.put(`/pages/${pageId}/theme`, { theme })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] })
      queryClient.invalidateQueries({ queryKey: ['page'] })
    },
  })
}
