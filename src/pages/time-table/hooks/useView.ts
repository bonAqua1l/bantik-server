'use client'

import { useRouter } from 'next/navigation'

function useView() {
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Заявки' },
  ]

  return {
    breadcrumbData,
    actions: {
      router,
    },
  }
}

export const use = useView
