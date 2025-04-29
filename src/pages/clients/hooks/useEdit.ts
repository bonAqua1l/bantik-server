'use client'

import React from 'react'

import { Form } from 'antd'
import { useRouter } from 'next/navigation'

import useNotification from '@/shared/hooks/useNotifications'

import { Clients } from '..'
import { ClientsTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const { contextHolder, showError } = useNotification()
  const [clientsLoading, setClientsLoading] = React.useState(false)
  const [clients, setClients] = React.useState<ClientsTypes.Item | null>(null)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/clients', title: 'Клиенты' },
    { title: 'Изменить' },
  ]

  const ClientsGET = React.useCallback(async (id: number) => {
    setClientsLoading(true)
    try {
      const response = await Clients.API.Edit.getClient(id)

      if (response.status === 200) setClients(response.data)
    } catch (error) {
      console.log('Failed to fethc clients', error)
    } finally {
      setClientsLoading(false)
    }
  }, [])

  const EditClients = React.useCallback(
    async (id: number ,data: ClientsTypes.ItemForm) => {
      setSubmitted(true)
      try {

        const response = await Clients.API.Edit.editClient(data, id)

        if (response.status === 200) {
          router.push('/admin/clients/')
        } else {
          showError('Что то пошло не так!')
        }
      } catch (error) {
        console.log('error create employee', error)
      } finally {
        setSubmitted(false)
      }
    },
    [showError],
  )

  return {
    breadcrumbData,
    contextHolder,
    form,
    clientsLoading,
    submitted,
    clients,
    actions: {
      EditClients,
      ClientsGET,
    },
  }
}

export const use = useEdit
