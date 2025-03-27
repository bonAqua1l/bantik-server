'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/shared/hooks/redux'

import { ProductsStorageRequest } from '..'
import { ProductsStorageRequestTypes } from '../types'

function useList() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [products, setProducts] = React.useState<ProductsStorageRequestTypes.Product[] | null>(null)
  const [selectedProduct, setSelectedProduct] = React.useState<ProductsStorageRequestTypes.Product | null>(null)
  const [storageRequestList, setStorageRequestList] = React.useState<ProductsStorageRequestTypes.Table[] | null>(null)
  const [type, setType] = React.useState<string>('incoming')
  const [isStorageRequestLoading, setIsStorageRequestLoading] = React.useState(true)
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [submitted, setSubmitted] = React.useState(false)

  const currentWarehouse = useAppSelector((state) => state.user.userData?.current_warehouse)

  const StorageRequestGET = React.useCallback(async (type: string, url?: string) => {
    setIsStorageRequestLoading(true)

    try {
      const response = await ProductsStorageRequest.API.List.getStorageRequest(type, url)

      setStorageRequestList(response.data)
    } catch (error) {
      console.log('products storage request error', error)
    } finally {
      setIsStorageRequestLoading(false)
    }
  }, [])

  const StorageRequestApproveIncomingPOST = React.useCallback(async (incoming_ids: React.Key[]) => {
    setSubmitted(true)

    try {
      const response = await ProductsStorageRequest.API.List.approveIncomingStorageRequest(incoming_ids)

      if (response.status === 200) {
        StorageRequestGET('incoming')
      }
    } catch (error) {
      console.log('approve error', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  const StorageRequestApproveOutgoingPOST = React.useCallback(async (outgoing_ids: React.Key[]) => {
    setSubmitted(true)

    try {
      const response = await ProductsStorageRequest.API.List.approveOutgoingStorageRequest(outgoing_ids)

      if (response.status === 200) {
        StorageRequestGET('outgoing')
      }
    } catch (error) {
      console.log('approve error', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  const StorageRequestCancelIncomingPOST = React.useCallback(async (incoming_ids: React.Key[]) => {
    setSubmitted(true)

    try {
      const response = await ProductsStorageRequest.API.List.rejectIncomingStorageRequest(incoming_ids)

      if (response.status === 200) {
        StorageRequestGET('incoming')
      }
    } catch (error) {
      console.log('approve error', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  const StorageRequestCancelOutgoingPOST = React.useCallback(async (outgoing_ids: React.Key[]) => {
    setSubmitted(true)

    try {
      const response = await ProductsStorageRequest.API.List.rejectOutgoingStorageRequest(outgoing_ids)

      if (response.status === 200) {
        StorageRequestGET('outgoing')
      }
    } catch (error) {
      console.log('approve error', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Заявки на склад' },
  ]

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
    storageRequestList,
    currentPage,
    products,
    selectedProduct,
    currentWarehouse,
    isStorageRequestLoading,
    type,
    submitted,
    selectedRowKeys,
    actions: {
      router,
      setSelectedProduct,
      setProducts,
      setCurrentPage,
      StorageRequestGET,
      checkStatus,
      getTagColor,
      setType,
      setSelectedRowKeys,
      StorageRequestApproveIncomingPOST,
      StorageRequestApproveOutgoingPOST,
      StorageRequestCancelIncomingPOST,
      StorageRequestCancelOutgoingPOST,
    },
  }
}

export const use = useList
