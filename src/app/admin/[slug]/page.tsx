'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPageIndex() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  useEffect(() => {
    // Redirect to appearance theme by default
    router.replace(`/admin/${slug}/appearance/theme`)
  }, [router, slug])

  return null
}
