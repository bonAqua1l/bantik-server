'use client'

import React from 'react'

import { ProductsOutgoing } from '..'
import { ProductsOutgoingTypes } from '../types'

function useView() {
  const [outGoingItem, setOutgoingItem] = React.useState<ProductsOutgoingTypes.Item | null>(null)
  const [incomingItemLoading, setIncomingItemLoading] = React.useState(true)
  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/outgoing', title: 'Уход товаров' },
    { title: `#${outGoingItem?.act}` },
  ]

  const getOutgoingDetails = React.useCallback(async (id: string) => {
    setIncomingItemLoading(true)

    try {
      const response = await ProductsOutgoing.API.View.getOutgoingDetails(id)

      if (response.status === 200) {
        setOutgoingItem(response.data)
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
    outGoingItem,
    incomingItemLoading,
    actions: {
      getOutgoingDetails,
      checkStatus,
      getTagColor,
    },
  }
}

export const use = useView
