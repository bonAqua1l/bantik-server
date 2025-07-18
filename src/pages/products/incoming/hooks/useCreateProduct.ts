'use client'

import React from 'react'

import { Form, Upload } from 'antd'
import { UploadProps } from 'antd/lib'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useCreateProduct() {
  const [form] = Form.useForm()
  const [productsColorsList, setProductsColorsList] = React.useState<ProductsIncomingTypes.Color[] | undefined>(undefined)

  const ProductsColorsGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.CreateProduct.getProductsColors()

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
    form,
    defaultDraggerProps,
    actions: {
      ProductsColorsGET,
    },
  }
}

export const use = useCreateProduct
