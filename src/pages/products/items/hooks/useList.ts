'use client'

import React from 'react'

import { Form, notification, Upload } from 'antd'
import { UploadProps } from 'antd/lib'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'
import { getSession } from '@/shared/lib/session'

import { ProductItems } from '..'
import { ProductsItemsTypes } from '../types'

function useList() {
  const [form] = Form.useForm()
  const createModal = useDisclosure()
  const router = useRouter()
  const [categories, setCategories] = React.useState<ProductsItemsTypes.ItemCategories[] | null>(null)
  const [productsList, setProductsList] = React.useState<ProductsItemsTypes.Item[] | undefined>(undefined)
  const [productsColorsList, setProductsColorsList] = React.useState<ProductsItemsTypes.Color[] | undefined>(undefined)
  const [submitted, setSubmitted] = React.useState(false)
  const [isCreated, setIsCreated] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()

  const createProduct = React.useCallback(async (data: ProductsItemsTypes.Form) => {
    setSubmitted(true)
    try {
      const session = await getSession()

      const user = session.user

      const dataToSend = {
        ...data ,
        warehouse: user.current_warehouse,
        color: data.color ? [data.color] : null,
        characteristics: JSON.stringify(data.characteristics),
        expiration_date: data.expiration_date ? dayjs(data.expiration_date).format('YYYY-MM-DD') : null,
      }

      const formData: any = new FormData()

      Object.entries(dataToSend).forEach(([key, value]) => {
        if (key !== 'images' && value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      if (Array.isArray(dataToSend.images)) {
        dataToSend.images.forEach((fileObj) => {
          if (fileObj && fileObj.originFileObj) {
            formData.append('images', fileObj.originFileObj)
          }
        })
      }

      const response = await ProductItems.API.List.createProduct(formData)

      if (response.status === 201 || response.status === 200) {
        api.success({
          message: 'Продукт успешно создан',
          placement: 'top',
        })
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }

      setIsCreated(true)

      return response
    } catch (error) {
      console.error('error create product', error)
      throw error
    } finally {
      setSubmitted(false)
    }
  }, [])

  const defaultDraggerProps: UploadProps = {
    name: 'images',
    multiple: true,
    accept: 'image/*',
    maxCount: 10,
    beforeUpload(file) {
      if (!file.type.startsWith('image/')) {
        console.error(`Файл не изображение: "${file.name}"`)

        return Upload.LIST_IGNORE
      }

      return false
    },
  }

  const ProductItemsCategoreisGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.List.getProductItemsCategories()

      setCategories(response.data.results)
    } catch (error) {
      console.log('error categories product items', error)
    }
  }, [])

  const ProductsGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.List.getProductsList()

      setProductsList(response.data.results)
    } catch (error) {
      console.log('products error', error)
    }
  }, [])

  const ProductsColorsGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.List.getProductsColors()

      setProductsColorsList(response.data)
    } catch (error) {
      console.log('products error', error)
    }
  }, [])

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/products', title: 'Товары' },
  ]

  return {
    breadcrumbData,
    productsColorsList,
    productsList,
    defaultDraggerProps,
    submitted,
    contextHolder,
    form,
    isCreated,
    createModal,
    actions: {
      createProduct,
      ProductsGET,
      ProductItemsCategoreisGET,
      ProductsColorsGET,
      categories,
      router,
    },
  }
}

export const use = useList
