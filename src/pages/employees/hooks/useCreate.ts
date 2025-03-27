'use client'

import React from 'react'

import { notification } from 'antd'
import { useRouter } from 'next/navigation'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useCreate() {
  const [submitted, setSubmitted] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()

  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/employees', title: 'Персонал' },
    { title: 'Создать сотрудника' },
  ]

  const CreateEmployee = React.useCallback(async (data: EmployeeTypes.Item) => {
    setSubmitted(true)

    try {
      const response = await Employees.API.Create.createEmployee(data)

      if (response.status === 201) {
        api.success({
          message: 'Сотрудник успешно был создан',
          placement: 'top',
        })
        router.push('/employees/')
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
    } catch (error) {
      console.log('error create employee', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  return {
    breadcrumbData,
    submitted,
    contextHolder,
    actions: {
      router,
      CreateEmployee,
    },
  }
}

export const use = useCreate
