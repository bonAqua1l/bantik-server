'use client'

import React from 'react'

import { Form, notification } from 'antd'
import { useRouter } from 'next/navigation'

import { Warehouses } from '..'
import { WarehouseTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = React.useState(false)
  const [warehouse, setWarehouse] = React.useState<WarehouseTypes.Item | null>(null)
  const [isWarehouseLoading, setIsWarehouseLoading] = React.useState(true)

  const [api, contextHolder] = notification.useNotification()

  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/warehouses', title: 'Склады' },
    { title: 'Редактировать склад' },
  ]

  const WarehouseGET = React.useCallback(async (id: number) => {
    try {
      const response = await Warehouses.API.View.getWarehouse(id)

      if (response.status === 200) {
        setWarehouse(response.data)
      }
    } catch (error) {
      console.log('warehouse error', error)
    } finally {
      setIsWarehouseLoading(false)
    }
  }, [])

  const editWarehouse = React.useCallback(async (data: WarehouseTypes.Item, id: number) => {
    setSubmitted(true)

    try {
      const respose = await Warehouses.API.Edit.editWarehouse(data, id)

      if (respose.status === 200) {
        api.success({
          message: 'Склад успешно был изменен',
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
      console.log('edit warehouse error', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  return {
    form,
    breadcrumbData,
    contextHolder,
    submitted,
    isWarehouseLoading,
    warehouse,
    actions: {
      editWarehouse,
      WarehouseGET,
    },
  }
}

export const use = useEdit
