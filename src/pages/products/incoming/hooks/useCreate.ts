'use client'

import React from 'react'

import { Form } from 'antd'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/shared/hooks/redux'
import { useDisclosure } from '@/shared/hooks/useDisclosure'
import useNotification from '@/shared/hooks/useNotifications'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useCreate() {
  const [form] = Form.useForm()
  const createModal = useDisclosure()

  const [userResponsible, setUserResponsible] = React.useState<ProductsIncomingTypes.Responsible[] | null>(null)
  const [clients, setClients] = React.useState<ProductsIncomingTypes.Clients[] | null>(null)
  const [submitted, setSubmitted] = React.useState(false)
  const [isNotUser, setIsNotUser] = React.useState(true)
  const [incomingItem, setIncomingItem] = React.useState<ProductsIncomingTypes.Item | null>(null)
  const [incomingItemLoading, setIncomingItemLoading] = React.useState(true)
  const [filteredServices, setFilteredServices] = React.useState<ProductsIncomingTypes.Service[] | null>(null)

  const router = useRouter()
  const user = useAppSelector((state) => state.user.userData)
  const { contextHolder, showError } = useNotification()

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

      setFilteredServices(response.data.results)
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
      const response = await ProductsIncoming.API.List.createProductIncoming(formValue)

      if (response.status !== 201) {
        throw new Error(`Submission failed: ${response.statusText}`)
      }

      router.push('/admin/storage-requests/')

    } catch (e) {
      const error = e as AxiosError

      if (error.response && Array.isArray(error.response.data) && error.response.data[0] === 'Этот мастер не оказывает данную услугу.') {
        showError('Этот мастер не оказывает данную услугу.')

        return
      }

      console.error('Ошибка создания прихода:', error)
    } finally {
      setSubmitted(false)
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/storage-requests/', title: 'Лиды' },
    { title: 'Создать' },
  ]

  return {
    breadcrumbData,
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
    contextHolder,
    filteredServices,
    actions: {
      ServiceGET,
      ProductsIncomingUsers,
      createIncoming,
      ClientsGET,
      setIsNotUser,
      getIncomingDetails,
      setFilteredServices,
    },
  }
}

export const use = useCreate
