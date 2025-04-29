'use client'

import React from 'react'

import { Form } from 'antd'
import { useRouter } from 'next/navigation'

import useNotification from '@/shared/hooks/useNotifications'

import { Clients } from '..'
import { ClientsTypes } from '../types'

function useCreate() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const { contextHolder, showError } = useNotification()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/clients', title: 'Клиенты' },
    { title: 'Создать' },
  ]

  const CreateClients = React.useCallback(
    async (data: ClientsTypes.ItemForm) => {
      setSubmitted(true)
      try {

        const response = await Clients.API.Create.createClient(data)

        if (response.status === 201) {
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
    submitted,
    actions: {
      CreateClients,
    },
  }
}

export const use = useCreate
