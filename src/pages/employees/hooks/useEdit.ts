'use client'

import React from 'react'

import { Form } from 'antd'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'
import useNotification from '@/shared/hooks/useNotifications'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const [scheduleForm] = Form.useForm()

  const [submitted, setSubmitted] = React.useState(false)
  const [submittedSchedule, setSubmittedSchedule] = React.useState(false)

  const [services, setServices] = React.useState<EmployeeTypes.Services[]>([])
  const [employee, setEmployee] = React.useState<EmployeeTypes.Item | null>(null)
  const [isEmployeeLoading, setIsEmployeeLoading] = React.useState(true)

  const [currentDay, setCurrentDay] = React.useState<EmployeeTypes.Schedule | null>(null)

  const scheduleEmployeeModal = useDisclosure()
  const { contextHolder, showError } = useNotification()
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/employees', title: 'Персонал' },
    { title: 'Редактировать сотрудника' },
  ]

  const getServices = React.useCallback(async () => {
    try {
      const response = await Employees.API.Create.getServices()

      if (response.status === 200) setServices(response.data.results)
    } catch (error) {
      console.error('error get services', error)
    }
  }, [])

  const EmployeeGET = React.useCallback(async (uuid: string) => {
    try {
      const response = await Employees.API.Edit.getEmployeeId(uuid)

      setEmployee(response.data)
    } catch (error) {
      console.error('error employee by uuid', error)
    } finally {
      setIsEmployeeLoading(false)
    }
  }, [])

  const EditEmployee = React.useCallback(
    async (uuid: string, data: EmployeeTypes.Item) => {
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

        if (
          error.response?.status === 400 &&
          error.response.data?.email?.[0] ===
            'Пользователь with this Электронная почта already exists.'
        ) {
          showError('Пользователь с таким email уже существует')
        }
        console.error('error edit employee', error)
      } finally {
        setSubmitted(false)
      }
    },
    [router, showError],
  )

  const EditEmployeeSchedule = React.useCallback(
    async (id: number, data: EmployeeTypes.ScheduleForm) => {
      setSubmittedSchedule(true)
      try {
        const response = await Employees.API.Edit.editEmployeeSchedule(id, data)

        if (response.status === 200) {
          scheduleEmployeeModal.onClose()
        } else {
          showError('Что-то пошло не так!')
        }
      } catch (error) {
        console.error('error edit employee schedule', error)
      } finally {
        setSubmittedSchedule(false)
      }
    },
    [scheduleEmployeeModal, showError],
  )

  const openScheduleModal = React.useCallback(
    (data: EmployeeTypes.Schedule) => {
      setCurrentDay(data)
      scheduleForm.setFieldsValue({
        time: [
          dayjs(data.start_time, 'HH:mm:ss'),
          dayjs(data.end_time, 'HH:mm:ss'),
        ],
      })
      scheduleEmployeeModal.onOpen()
    },
    [scheduleEmployeeModal, scheduleForm],
  )

  const onFinishSchedule = React.useCallback(
    (values: { time: [dayjs.Dayjs, dayjs.Dayjs] }) => {
      if (!currentDay) return
      const formData: EmployeeTypes.ScheduleForm = {
        id: currentDay.id,
        weekday: currentDay.weekday,
        start_time: values.time[0].format('HH:mm:ss'),
        end_time: values.time[1].format('HH:mm:ss'),
      }

      EditEmployeeSchedule(currentDay.id, formData)
    },
    [currentDay, EditEmployeeSchedule],
  )

  return {
    breadcrumbData,
    contextHolder,
    form,
    scheduleForm,
    services,
    employee,
    isEmployeeLoading,
    currentDay,
    submitted,
    submittedSchedule,
    scheduleEmployeeModal,
    actions: {
      getServices,
      EmployeeGET,
      EditEmployee,
      openScheduleModal,
      onFinishSchedule,
    },
  }
}

export const use = useEdit
