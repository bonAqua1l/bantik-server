'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/shared/hooks/redux'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useList() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = React.useState(1)
  const [products, setProducts] = React.useState<ProductsIncomingTypes.Product[] | null>(null)
  const [selectedProduct, setSelectedProduct] = React.useState<ProductsIncomingTypes.Product | null>(null)
  const [productsIncomingList, setProductsIncomingList] = React.useState<ProductsIncomingTypes.ApiResponse | undefined>(undefined)
  const [isIncomingLoading, setIsIncomingLoading] = React.useState(true)

  const currentWarehouse = useAppSelector((state) => state.user.userData?.current_warehouse)

  const ProductsIncomingGET = React.useCallback(async (url?: string, previusURL?: string) => {
    setIsIncomingLoading(true)

    try {
      const response = await ProductsIncoming.API.List.getProductsIncomingList(url || '/leads/', previusURL)

      setProductsIncomingList(response.data)
    } catch (error) {
      console.log('products incoming error', error)
    } finally {
      setIsIncomingLoading(false)
    }
  }, [])

  const handlePageChange = (page: number) => {
    const nextPageUrl = productsIncomingList?.next
    const prevPageUrl = productsIncomingList?.previous

    if (page > currentPage && nextPageUrl) {
      ProductsIncomingGET(nextPageUrl)
    } else if (page < currentPage && prevPageUrl) {
      ProductsIncomingGET(prevPageUrl)
    }

    setCurrentPage(page)
  }

  const handlePreviousPage = () => {
    const prevPageUrl = productsIncomingList?.previous

    if (prevPageUrl) {
      ProductsIncomingGET(prevPageUrl)
      setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Заявки' },
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
    productsIncomingList,
    currentPage,
    products,
    selectedProduct,
    currentWarehouse,
    isIncomingLoading,
    actions: {
      router,
      setSelectedProduct,
      setProducts,
      setCurrentPage,
      ProductsIncomingGET,
      checkStatus,
      getTagColor,
      handlePageChange,
      handlePreviousPage,
    },
  }
}

export const use = useList
