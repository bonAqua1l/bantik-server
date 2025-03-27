'use client'

import React, { ChangeEvent } from 'react'

import { Form, Upload, UploadProps } from 'antd'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/shared/hooks/redux'
import { useDisclosure } from '@/shared/hooks/useDisclosure'
import { debounce } from '@/shared/tools/debounce'

import { ProductsIncoming } from '..'
import { ProductsItemsTypes } from '../../items/types'
import { ProductsIncomingTypes } from '../types'

function useCreate() {
  const [form] = Form.useForm()
  const createModal = useDisclosure()

  const [products, setProducts] = React.useState<ProductsItemsTypes.ApiResponse | null>(null)
  const [isProductsLoading, setIsProductsLoading] = React.useState(true)
  const [selectedProducts, setSelectedProducts] = React.useState<ProductsItemsTypes.Table[]>([])
  const [project, setProject] = React.useState<ProductsIncomingTypes.Project[] | null>(null)
  const [userResponsible, setUserResponsible] = React.useState<ProductsIncomingTypes.Responsible[] | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  const router = useRouter()
  const user = useAppSelector((state) => state.user.userData)

  const getProducts = React.useCallback(async (search?: string, url?: string) => {
    setIsProductsLoading(true)

    try {
      const response = await ProductsIncoming.API.Create.getProductSearchedList(search, url || '/products/')

      if (response.status === 200) {
        setProducts(response.data)
      }
    } catch (error) {
      console.log('error get products', error)
    } finally {
      setIsProductsLoading(false)
    }
  }, [])

  const handlePageChange = () => {
    const nextPageUrl = products?.next

    if (nextPageUrl) {
      getProducts(nextPageUrl)
    }
  }

  const onProductsSelectChange = (
    selectedRowKeys: React.Key[],
    selectedRows: ProductsItemsTypes.Table[],
  ) => {
    setSelectedProducts((prevSelected) =>
      selectedRows.map((product) => {
        const existingProduct = prevSelected.find(
          (item) => item.slug === product.slug,
        )

        return {
          ...product,
          quantity: existingProduct ? existingProduct.quantity : product.quantity,
          purchase_price: existingProduct
            ? existingProduct.purchase_price
            : product.purchase_price,
        }
      }),
    )
  }

  const debouncedSearch = debounce((search: string) => {
    getProducts(search)
  }, 1500)

  const handleSearchProducts = (e: ChangeEvent<HTMLInputElement>) => {
    setIsProductsLoading(true)
    debouncedSearch(e.target.value)
  }

  const ProductsIncomingProjectGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.List.getProductIncomingProject()

      setProject(response.data.results)
    } catch (error) {
      console.log('products incoming project error', error)
    }
  }, [])

  const ProductsIncomingUsers = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.Create.getUsers()

      setUserResponsible(response.data.results)
    } catch (error) {
      console.log('products incoming project error', error)
    }
  }, [])

  const createIncoming = async (formValue: ProductsIncomingTypes.Form) => {
    setSubmitted(true)
    try {
      const responsibleObj = userResponsible?.find((item) => `${item.first_name} ${item.last_name}` === formValue.responsible)

      const dataToSend = {
        ...formValue,
        responsible: responsibleObj?.uuid,
        items: selectedProducts.map((item) => {
          return {
            product: item.slug,
            quantity: item.quantity,
            purchase_price: item.purchase_price,
          }
        }),
      }

      const formData = new FormData()

      Object.entries(dataToSend).forEach(([key, value]) => {
        if (key !== 'files') {
          if (value !== undefined && value !== null) {
            if (typeof value === 'object') {
              formData.append(key, JSON.stringify(value))
            } else {
              formData.append(key, String(value))
            }
          }
        }
      })

      if (Array.isArray(formValue.files)) {
        formValue.files.forEach((item: {originFileObj: File}) => {
          if (item.originFileObj) {
            formData.append('files', item.originFileObj)
          }
        })
      }

      const response = await ProductsIncoming.API.List.createProductIncoming(formData).finally(() => {
        router.push('/products/incoming')
      })

      if (response.status !== 201) {
        throw new Error(`Submission failed: ${response.statusText}`)
      }

    } catch (error) {
      console.error('Ошибка создания прихода:', error)
    } finally {
      setSubmitted(false)
    }
  }

  const defaultDraggerProps: UploadProps = {
    name: 'files',
    maxCount: 10,
    multiple: true,
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > 10) {
        console.log(`Файл "${file.name}" больше 10 МБ!`)

        return Upload.LIST_IGNORE
      }

      return false
    },
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/incoming', title: 'Приход товаров' },
    { title: 'Создать' },
  ]

  return {
    breadcrumbData,
    products,
    isProductsLoading,
    selectedProducts,
    defaultDraggerProps,
    project,
    userResponsible,
    submitted,
    form,
    createModal,
    user,
    actions: {
      getProducts,
      onProductsSelectChange,
      handleSearchProducts,
      ProductsIncomingProjectGET,
      ProductsIncomingUsers,
      createIncoming,
      setSelectedProducts,
      handlePageChange,
    },
  }
}

export const use = useCreate
