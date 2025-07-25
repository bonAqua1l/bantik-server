'use client'

import React from 'react'

import { notification } from 'antd'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useList() {
  const [employees, setEmployees] = React.useState<EmployeeTypes.ApiResponse | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isEmployeesLoading, setIsEmployeesLoading] = React.useState(false)
  const [selectedEmployee, setSelectedEmployee] = React.useState<EmployeeTypes.Item | null>(null)
  const [submitted, setSubmitted] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [employee, setEmployee] = React.useState<EmployeeTypes.Item | null>(null)
  const [isEmployeeLoading, setIsEmployeeLoading] = React.useState(false)
  const PAGE_SIZE = 10

  const router = useRouter()

  const fireEmployeeModal = useDisclosure()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/employees', title: 'Мастера' },
  ]

  const getEmployeesList = React.useCallback(async (url?: string, previusURL?: string) => {
    setIsEmployeesLoading(true)
    try {
      const response = await Employees.API.List.getEmployeesList(url || '/users?is_employee=true', previusURL)

      const data = response.data

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
    setIsEmployeeLoading(true)
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

  const handlePageChange = (page: number) => {
    if (isEmployeeLoading || page === currentPage) return

    const offset = (page - 1) * PAGE_SIZE

    const url = `/users?limit=${PAGE_SIZE}&offset=${offset}&is_employee=true`

    getEmployeesList(url, undefined)
    setCurrentPage(page)
  }

  const deleteUser = React.useCallback(async (id: string) => {
    try {
      await Employees.API.Edit.deleteEmployee(id)

      getEmployeesList()

    } catch (error) {
      console.log('error', error)
    }
  }, [])

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
    currentPage,
    PAGE_SIZE,
    actions: {
      router,
      getEmployeesList,
      employeeFire,
      handleSelectedEmployee,
      EditEmployee,
      EmployeeGET,
      deleteUser,
      handlePageChange,
      setCurrentPage,
    },
  }
}

export const use = useList
