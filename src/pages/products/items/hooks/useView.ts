'use client'

import React from 'react'

import { notification } from 'antd'
import { useRouter } from 'next/navigation'

import { ProductItems } from '..'
import { ProductsItemsTypes } from '../types'
interface Characteristic {
  key: string;
  value: string;
}

function useView() {
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification()
  const [itemDetail, setItemDetail] = React.useState<ProductsItemsTypes.ItemDetail | null>(null)
  const [expanded, setExpanded] = React.useState(false)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/items', title: 'Товары' },
    { href: '#', title: itemDetail?.title },
  ]

  const ProductItemsBySlugGET = React.useCallback(async (item_slug: string) => {
    try {
      const response = await ProductItems.API.View.getProductBySlug(item_slug)

      setItemDetail(response.data)
    } catch (error) {
      api.error({
        message: 'Не удалось получить данные. Пожалуйста, попробуйте позже.',
        placement: 'top',
      })
      console.log(error)
    }
  }, [])

  const deleteProduct = (async (slug: string) => {
    try {
      await ProductItems.API.View.deleteProduct(slug)
      router.back()

      api.success({
        message: 'Вы успешно удалили продукт',
        placement: 'top',
      })
    } catch (error) {
      console.log('projects delete request error', error)
    }
  })

  const toggleDescription = React.useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const getFormattedDescription = React.useCallback(() => {
    if (!itemDetail?.description) return ''

    const { description } = itemDetail

    if (description.length > 245) {
      return expanded ? description : `${description.slice(0, 245)}...`
    }

    return description
  }, [itemDetail, expanded])

  let parsedCharacteristics: Characteristic[] = []

  try {
    if (itemDetail?.characteristics) {
      parsedCharacteristics = JSON.parse(itemDetail?.characteristics || '{}')
    }
  } catch (err) {
    console.error('Error parsing characteristics', err)
  }

  return {
    itemDetail,
    expanded,
    breadcrumbData,
    contextHolder,
    parsedCharacteristics,
    actions: {
      router,
      ProductItemsBySlugGET,
      getFormattedDescription,
      toggleDescription,
      deleteProduct,
    },
  }
}

export const use = useView
