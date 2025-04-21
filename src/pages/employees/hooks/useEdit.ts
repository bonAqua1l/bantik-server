'use client'

import React from 'react'

import { Form } from 'antd'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import useNotification from '@/shared/hooks/useNotifications'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = React.useState(false)
  const { contextHolder, showError } = useNotification()
  const [services, setServices] = React.useState<EmployeeTypes.Services[]>([])
  const [employee, setEmployee] = React.useState<EmployeeTypes.Item | null>(null)
  const [isEmployeeLoading, setIsEmployeeLoading] = React.useState(true)

  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/employees', title: 'Персонал' },
    { title: 'Редактировать сотрудника' },
  ]

  const getServices = React.useCallback(async () => {
    try {
      const response = await Employees.API.Create.getServices()

      if (response.status === 200) {
        setServices(response.data.results)
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const EmployeeGET = React.useCallback(async (uuid: string) => {
    try {
      const response = await Employees.API.Edit.getEmployeeId(uuid)

      const data = response.data

      setEmployee(data)
    } catch (error) {
      console.log('error employee by uuid', error)
    } finally {
      setIsEmployeeLoading(false)
    }
  }, [])

  const EditEmployee = React.useCallback(async (uuid: string, data: EmployeeTypes.Item) => {
    setSubmitted(true)

    try {
      const response = await Employees.API.Edit.editEmployee(uuid, data)

      if (response.status === 200) {
        router.push('/admin/employees/')
      } else {
        showError('Что-то пошло не так!')
      }
    } catch (e) {
      const error = e as AxiosError<{ email?: string[] }>

      if (error.response?.status === 400 && error.response.data?.email?.[0] === 'Пользователь with this Электронная почта already exists.') {
        showError('Пользователь с таким email уже существует')
      }

      console.log('error create employee', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  return {
    breadcrumbData,
    submitted,
    contextHolder,
    employee,
    isEmployeeLoading,
    form,
    services,
    actions: {
      router,
      EditEmployee,
      EmployeeGET,
      getServices,
    },
  }
}

export const use = useEdit
