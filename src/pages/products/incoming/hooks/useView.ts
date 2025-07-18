'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useNotificationApi } from '@/shared/providers/NotificationProvider'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useView() {
  const router = useRouter()
  const [incomingItem, setIncomingItem] = React.useState<ProductsIncomingTypes.Item | null>(null)
  const [incomingItemLoading, setIncomingItemLoading] = React.useState(true)
  const breadcrumbData = [
    { href: '/admin/storage-requests/', title: 'Заявки' },
    { title: `#${incomingItem?.id}` },
  ]
  const api = useNotificationApi()

  const getIncomingDetails = React.useCallback(async (id: number) => {
    setIncomingItemLoading(true)

    try {
      const response = await ProductsIncoming.API.View.getProductsIncomingList(id)

      if (response.status === 200) {
        setIncomingItem(response.data)
      }
    } catch (error) {
      console.log('get incoming details error', error)
    } finally {
      setIncomingItemLoading(false)
    }
  }, [])

  const deleteLead = React.useCallback( async (id: string) => {
    try {
      const response = await ProductsIncoming.API.Edit.deleteLead(id)

      if (response.status === 204 ) {
        router.push('/admin/storage-requests/')
        api.success({
          message: 'Заявка была успешно удалена',
          placement: 'top',
        })
      } else {
        api.error({
          message: 'Что то пошло не так, попробуйте позже',
          placement: 'top',
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const checkStatus = React.useCallback((status: string): string => {
    const statusMap: Record<string, string> = {
      in_progress: 'В ПРОЦЕССЕ',
      verified: 'ПРОВЕРЕНО',
      new: 'НОВОЕ',
      rejected: 'ОТКЛОНЕНО',
      not_verified: 'НЕ ПРОВЕРЕНО',
    }

    return statusMap[status] || 'НЕИЗВЕСТНЫЙ СТАТУС'
  }, [])

  const getTagColor = React.useCallback((status: string): string => {
    const colorMap: Record<string, string> = {
      in_progress: 'gold',
      verified: 'green',
      new: 'geekblue',
      rejected: 'red',
      not_verified: 'gray',
    }

    return colorMap[status] || 'default'
  }, [])

  return {
    breadcrumbData,
    incomingItem,
    incomingItemLoading,
    actions: {
      getIncomingDetails,
      checkStatus,
      getTagColor,
      deleteLead,
    },
  }
}

export const use = useView
