'use client'

import React from 'react'

import { Form, Upload, UploadFile } from 'antd'
import { UploadProps } from 'antd/lib'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import useNotification from '@/shared/hooks/useNotifications'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useCreate() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = React.useState(false)
  const [services, setServices] = React.useState<EmployeeTypes.Services[]>([])
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()
  const { contextHolder, showError } = useNotification()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/employees', title: 'Персонал' },
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
    setLoading(true)

    try {
      const response = await Employees.API.Create.getServices()

      if (response.status === 200) setServices(response.data)
    } catch (e) {
      console.error('error get services', e)
    } finally {
      setLoading(false)
    }
  }, [])

  const getWeekdayOptions = React.useCallback(
    (currentIndex: number) => {
      const list = form.getFieldValue('schedule') || []
      const selected = list.map((s: any) => s?.weekday).filter((_: number, i: number) => i !== currentIndex)

      return weekdayData.filter((d) => !selected.includes(d.weekday)).map((d) => ({ value: d.weekday, label: d.weekday_name }))
    },
    [form],
  )

  const CreateEmployee = React.useCallback(
    async (data: EmployeeTypes.Item) => {
      setSubmitted(true)
      try {
        const { ...rest } = data

        const dataToSend = {
          ...rest,
          role: 'worker',
          is_employee: true,
        }

        const formData = new FormData()

        Object.entries(dataToSend).forEach(([k, v]) => {
          if (v !== undefined && v !== null) formData.append(k, v as any)
        })

        if (
          Array.isArray(rest.avatar) &&
                  rest.avatar.length &&
                  typeof rest.avatar[0] !== 'string' &&
                  (rest.avatar[0] as UploadFile).originFileObj
        ) {
          formData.append('avatar', (rest.avatar[0] as UploadFile).originFileObj as File)
        } else if (!Array.isArray(rest.avatar)) {
          formData.append('avatar', '')
        }

        const response = await Employees.API.Create.createEmployee(formData)

        if (response.status === 201 && Array.isArray(data.schedule) && data.schedule.length) {
          const schedulePayload: EmployeeTypes.SchedulePayload = {
            schedules: data.schedule.map((item) => ({
              weekday: String(item.weekday),
              start_time: item.time?.[0].format('HH:mm'),
              end_time: item.time?.[1].format('HH:mm'),
            })),
            delete_schedules: [],
            update_schedules: [],
          }

          await Employees.API.Create.createEmployeeSchedule(response.data.uuid, schedulePayload)
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
    },
    [router, showError],
  )

  const defaultDraggerProps: UploadProps = {
    name: 'avatar',
    multiple: false,
    accept: 'image/*',
    maxCount: 1,
    beforeUpload(file) {
      if (!file.type.startsWith('image/')) return Upload.LIST_IGNORE

      return false
    },
  }

  return {
    breadcrumbData,
    submitted,
    contextHolder,
    services,
    weekdayData,
    form,
    defaultDraggerProps,
    getWeekdayOptions,
    loading,
    actions: {
      CreateEmployee,
      getServices,
    },
  }
}

export const use = useCreate
