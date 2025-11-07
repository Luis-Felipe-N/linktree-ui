import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Link } from '@/lib/types'

export function useLinks(pageId: string | null) {
  return useQuery({
    queryKey: ['links', pageId],
    queryFn: async () => {
      if (!pageId) return []
      const response = await api.get(`/pages/${pageId}/links`)
      return response.data as Link[]
    },
    enabled: !!pageId,
  })
}

export function useCreateLink(pageId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { title: string; url: string }) => {
      const response = await api.post(`/pages/${pageId}/links`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', pageId] })
    },
  })
}

export function useUpdateLink(pageId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ linkId, data }: { linkId: string; data: Partial<Link> }) => {
      const response = await api.patch(`/links/${linkId}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', pageId] })
    },
  })
}

export function useDeleteLink(pageId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (linkId: string) => {
      await api.delete(`/links/${linkId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links', pageId] })
    },
  })
}
