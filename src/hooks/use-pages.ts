import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Page } from '@/lib/types'

export function usePages() {
  return useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const response = await api.get('/me/pages')
      const pages: Page[] = response.data.pages.map((pageData: any) => ({ ...pageData.props, id: pageData._id.value }))

      return pages
    },
  })
}

export function usePage(pageSlug: string | null) {

  console.log('Fetching page with:', pageSlug)
  return useQuery({
    queryKey: ['page', pageSlug],
    queryFn: async () => {
      if (!pageSlug) return null


      try {
        const response = await api.get(`/pages/${pageSlug}`)
        const data = response.data.page

        if (data.props) {
          const page = { ...data.props, id: data._id?.value || data.id }
          console.log('Formatted page:', page)
          return page
        }

        return response.data
      } catch (error) {
        console.error('Failed to fetch page:', error)
        throw error
      }
    },
    enabled: !!pageSlug,
    retry: 1,
  })
}
