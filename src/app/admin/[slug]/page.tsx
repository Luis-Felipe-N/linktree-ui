'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPageIndex() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  useEffect(() => {
    // Redirect to appearance tab by default
    router.replace(`/admin/${slug}/appearance`)
  }, [router, slug])

  return null
}
