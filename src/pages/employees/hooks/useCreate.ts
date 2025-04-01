'use client'

import React from 'react'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import useNotification from '@/shared/hooks/useNotifications'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useCreate() {
  const [submitted, setSubmitted] = React.useState(false)
  const { contextHolder, showError } = useNotification()
  const [services, setServices] = React.useState<EmployeeTypes.Services[]>([])

  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/employees', title: 'Персонал' },
    { title: 'Создать сотрудника' },
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

  const CreateEmployee = React.useCallback(async (data: EmployeeTypes.Item) => {
    setSubmitted(true)

    try {
      const response = await Employees.API.Create.createEmployee({ ...data, role: 'worker', is_employee: true })

      console.log('response', response)

      if (response.status === 201) {
        router.push('/admin/employees/')
      } else {
        showError('Что то пошло не так!')
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
    services,
    actions: {
      router,
      CreateEmployee,
      getServices,
    },
  }
}

export const use = useCreate
