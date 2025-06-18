'use client'

import React from 'react'

import { Form } from 'antd'
import { useRouter } from 'next/navigation'

import { useNotificationApi } from '@/shared/providers/NotificationProvider'

import { Warehouses } from '..'
import { WarehouseTypes } from '../types'

function useCreate() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = React.useState(false)

  const api = useNotificationApi()

  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/warehouses', title: 'Склады' },
    { title: 'Создать склад' },
  ]

  const createWarehouse = React.useCallback(async (data: WarehouseTypes.Item) => {
    setSubmitted(true)

    try {
      const respose = await Warehouses.API.Create.createWarehouse(data)

      if (respose.status === 201) {
        api.success({
          message: 'Склад успешно был создан',
          placement: 'top',
        })
        router.push('/warehouses/')
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
    } catch (error) {
      console.log('create warehouse error', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  return {
    form,
    breadcrumbData,
    submitted,
    actions: {
      createWarehouse,
    },
  }
}

export const use = useCreate
