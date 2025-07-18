'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/shared/hooks/redux'

import { ProductsStorageRequest } from '..'
import { ProductsStorageRequestTypes } from '../types'

function useList() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [products, setProducts] = React.useState<ProductsStorageRequestTypes.Table[] | null>(null)
  const [selectedProduct, setSelectedProduct] = React.useState<ProductsStorageRequestTypes.Table | null>(null)
  const [storageRequestList, setStorageRequestList] = React.useState<ProductsStorageRequestTypes.AppointmentResponse | null>(null)
  const [isStorageRequestLoading, setIsStorageRequestLoading] = React.useState(true)
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [submitted, setSubmitted] = React.useState(false)

  const currentWarehouse = useAppSelector((state) => state.user.userData?.current_warehouse)

  const StorageRequestGET = React.useCallback(async (url?: string, previusURL?: string) => {
    setIsStorageRequestLoading(true)

    try {
      const response = await ProductsStorageRequest.API.List.getLeadRequest(url || '/leads/', previusURL)

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
      const response = await ProductsStorageRequest.API.List.approveLeadStorageRequest(incoming_ids)

      if (response.status === 200) {
        StorageRequestGET()
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
        StorageRequestGET()
      }
    } catch (error) {
      console.log('approve error', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  const handlePageChange = (page: number) => {
    const nextPageUrl = storageRequestList?.next
    const prevPageUrl = storageRequestList?.previous

    if (page > currentPage && nextPageUrl) {
      StorageRequestGET(nextPageUrl)
    } else if (page < currentPage && prevPageUrl) {
      StorageRequestGET(prevPageUrl)
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Заявки' },
  ]

  return {
    breadcrumbData,
    storageRequestList,
    currentPage,
    products,
    selectedProduct,
    currentWarehouse,
    isStorageRequestLoading,
    submitted,
    selectedRowKeys,
    actions: {
      router,
      setSelectedProduct,
      setProducts,
      setCurrentPage,
      handlePageChange,
      StorageRequestGET,
      setSelectedRowKeys,
      StorageRequestApproveIncomingPOST,
      StorageRequestCancelIncomingPOST,
    },
  }
}

export const use = useList
