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

  const weekdayData = [
    { weekday: 1, weekday_name: 'Понедельник' },
    { weekday: 2, weekday_name: 'Вторник' },
    { weekday: 3, weekday_name: 'Среда' },
    { weekday: 4, weekday_name: 'Четверг' },
    { weekday: 5, weekday_name: 'Пятница' },
    { weekday: 6, weekday_name: 'Суббота' },
    { weekday: 7, weekday_name: 'Воскресенье' },
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
      const formData = {
        ...data,
        role: 'worker',
        is_employee: true,
      }

      delete (formData as any).schedule

      const response = await Employees.API.Create.createEmployee(formData)

      if (Array.isArray(data.schedule) && data.schedule.length) {
        const scheduleData: any =
          {
            schedules : data.schedule.map((item) => ({
              weekday : item.weekday,
              start_time: item.time?.[0].format('HH:mm'),
              end_time  : item.time?.[1].format('HH:mm'),
            })),
          }

        await Employees.API.Create.createEmployeeSchedule(
          response.data.uuid,
          scheduleData,
        )
      }

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
    weekdayData,
    actions: {
      router,
      CreateEmployee,
      getServices,
    },
  }
}

export const use = useCreate
