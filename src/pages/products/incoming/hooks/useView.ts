'use client'

import React from 'react'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useView() {
  const [incomingItem, setIncomingItem] = React.useState<ProductsIncomingTypes.Item | null>(null)
  const [incomingItemLoading, setIncomingItemLoading] = React.useState(true)
  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/incoming', title: 'Приход товаров' },
    { title: `#${incomingItem?.act}` },
  ]

  const getIncomingDetails = React.useCallback(async (id: string) => {
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
    },
  }
}

export const use = useView
