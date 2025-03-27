'use client'

import React from 'react'

import { Form, notification } from 'antd'
import { useRouter } from 'next/navigation'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [employee, setEmployee] = React.useState<EmployeeTypes.Item | null>(null)
  const [isEmployeeLoading, setIsEmployeeLoading] = React.useState(true)

  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/employees', title: 'Персонал' },
    { title: 'Редактировать сотрудника' },
  ]

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
        api.success({
          message: 'Сотрудник успешно был изменён',
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
      console.log('error edit employee', error)
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
    actions: {
      router,
      EditEmployee,
      EmployeeGET,
    },
  }
}

export const use = useEdit
