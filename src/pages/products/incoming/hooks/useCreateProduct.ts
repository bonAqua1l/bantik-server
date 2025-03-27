'use client'

import React from 'react'

import { Form, notification, Upload } from 'antd'
import { UploadProps } from 'antd/lib'
import dayjs from 'dayjs'

import { getSession } from '@/shared/lib/session'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useCreateProduct() {
  const [form] = Form.useForm()
  const [productsColorsList, setProductsColorsList] = React.useState<ProductsIncomingTypes.Color[] | undefined>(undefined)
  const [submitted, setSubmitted] = React.useState(false)
  const [isCreated, setIsCreated] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()

  const createProduct = React.useCallback(async (data: ProductsIncomingTypes.FormProduct) => {
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

      const response = await ProductsIncoming.API.Create.createProduct(formData)

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

  const ProductsColorsGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.Create.getProductsColors()

      setProductsColorsList(response.data)
    } catch (error) {
      console.log('products error', error)
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

  return {
    productsColorsList,
    submitted,
    contextHolder,
    form,
    isCreated,
    defaultDraggerProps,
    actions: {
      createProduct,
      ProductsColorsGET,
    },
  }
}

export const use = useCreateProduct
