'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useView() {
  const router = useRouter()
  const [items, setItems] = React.useState<ProjectsType.ServiceDetail | undefined>(undefined)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/projects', title: 'Сервисы' },
    { href: '#', title: items?.name },
  ]

  const ServiceIDGET = React.useCallback(async (id: number) => {
    try {
      const response = await Projects.API.View.getServiceById(id)

      setItems(response.data)
    } catch (error) {
      console.log('products by id projects', error)
    }
  }, [])

  const deleteService = (async (id: number) => {
    try {
      await Projects.API.View.deleteService(id)

      router.push('/admin/projects')
    } catch (error) {
      console.log('projects delete request error', error)
    }
  })

  return {
    breadcrumbData,
    items,
    actions: {
      router,
      ServiceIDGET,
      deleteService,
    },
  }
}

export const use = useView
