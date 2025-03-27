'use client'

import React from 'react'

import { notification } from 'antd'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useList() {
  const [employees, setEmployees] = React.useState<EmployeeTypes.Item[] | null>(null)
  const [isEmployeesLoading, setIsEmployeesLoading] = React.useState(true)
  const [selectedEmployee, setSelectedEmployee] = React.useState<EmployeeTypes.Item | null>(null)
  const [submitted, setSubmitted] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [employee, setEmployee] = React.useState<EmployeeTypes.Item | null>(null)
  const [isEmployeeLoading, setIsEmployeeLoading] = React.useState(true)

  const router = useRouter()

  const fireEmployeeModal = useDisclosure()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/employees', title: 'Персонал' },
  ]

  const getEmployeesList = React.useCallback(async () => {
    try {
      const response = await Employees.API.List.getEmployeesList()

      const data = response.data.results

      setEmployees(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsEmployeesLoading(false)
    }
  }, [])

  const employeeFire = React.useCallback(
    async (uuid: string, data: EmployeeTypes.FireEmployeeForm) => {
      setSubmitted(true)

      try {
        const formattedTerminationDate = typeof data.termination_date !== 'string' ? data.termination_date.format('YYYY-MM-DD') : ''
        const formattedTerminationOrderDate = typeof data.termination_order_date !== 'string' ? data.termination_order_date.format('YYYY-MM-DD') : ''

        const response = await Employees.API.List.fireEmployee(uuid, {
          ...data,
          termination_date: formattedTerminationDate,
          termination_order_date: formattedTerminationOrderDate,
        })

        if (response.status === 200) {
          api.success({
            message: 'Увольнение прошло успешно',
            placement: 'top',
          })
          await getEmployeesList()
        } else {
          api.error({
            message: 'Что-то пошло не так',
            placement: 'top',
          })
        }
      } catch (error) {
        console.log('fire employee error', error)
      } finally {
        setSubmitted(false)
      }
    },
    [],
  )

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
        await getEmployeesList()
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

  const handleSelectedEmployee = (employee: EmployeeTypes.Item) => {
    setSelectedEmployee(employee)
  }

  return {
    breadcrumbData,
    employees,
    isEmployeesLoading,
    fireEmployeeModal,
    selectedEmployee,
    submitted,
    contextHolder,
    employee,
    isEmployeeLoading,
    actions: {
      router,
      getEmployeesList,
      employeeFire,
      handleSelectedEmployee,
      EditEmployee,
      EmployeeGET,
    },
  }
}

export const use = useList
