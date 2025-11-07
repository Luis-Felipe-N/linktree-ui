'use client'

import { PageProvider } from '@/contexts/page'
import type { ReactNode } from 'react'
import { use } from 'react'

interface AdminPageLayoutProps {
  children: ReactNode
  params: Promise<{
    slug: string
  }>
}

export default function AdminPageLayout({ children, params }: AdminPageLayoutProps) {
  const resolvedParams = use(params)
  const pageSlug = resolvedParams.slug

  return (
    <PageProvider pageSlug={pageSlug}>
      {children}
    </PageProvider>
  )
}
