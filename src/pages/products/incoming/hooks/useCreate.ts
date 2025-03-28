'use client'

import React from 'react'

import { Form } from 'antd'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/shared/hooks/redux'
import { useDisclosure } from '@/shared/hooks/useDisclosure'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useCreate() {
  const [form] = Form.useForm()
  const createModal = useDisclosure()

  const [services, setServices] = React.useState<ProductsIncomingTypes.Service[] | null>(null)
  const [userResponsible, setUserResponsible] = React.useState<ProductsIncomingTypes.Responsible[] | null>(null)
  const [clients, setClients] = React.useState<ProductsIncomingTypes.Clients[] | null>(null)
  const [submitted, setSubmitted] = React.useState(false)
  const [isNotUser, setIsNotUser] = React.useState(true)
  const [incomingItem, setIncomingItem] = React.useState<ProductsIncomingTypes.Item | null>(null)
  const [incomingItemLoading, setIncomingItemLoading] = React.useState(true)

  const router = useRouter()
  const user = useAppSelector((state) => state.user.userData)

  const getIncomingDetails = React.useCallback(async (id: number) => {
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

  const ServiceGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.List.getServices()

      setServices(response.data.results)
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

  const ClientsGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.Create.getClients()

      setClients(response.data.results)
    } catch (error) {
      console.log('products incoming project error', error)
    }
  }, [])

  const createIncoming = async (formValue: ProductsIncomingTypes.Form) => {
    setSubmitted(true)
    try {
      const response = await ProductsIncoming.API.List.createProductIncoming(formValue).finally(() => {
        router.push('/admin/products/incoming')
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

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/products/incoming', title: 'Лиды' },
    { title: 'Создать' },
  ]

  return {
    breadcrumbData,
    services,
    userResponsible,
    submitted,
    form,
    createModal,
    user,
    router,
    clients,
    isNotUser,
    incomingItem,
    incomingItemLoading,
    actions: {
      ServiceGET,
      ProductsIncomingUsers,
      createIncoming,
      ClientsGET,
      setIsNotUser,
      getIncomingDetails,
    },
  }
}

export const use = useCreate
