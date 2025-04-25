'use client'

import React from 'react'

import { Form } from 'antd'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import useNotification from '@/shared/hooks/useNotifications'

import { Employees } from '..'
import { EmployeeTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = React.useState(false)
  const [services, setServices] = React.useState<EmployeeTypes.Services[]>([])
  const [employee, setEmployee] = React.useState<EmployeeTypes.Item | null>(null)
  const [isEmployeeLoading, setIsEmployeeLoading] = React.useState(true)
  const originalSchedule = React.useRef<EmployeeTypes.Schedule[]>([])

  const { contextHolder, showError } = useNotification()
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/employees', title: 'Персонал' },
    { title: 'Редактировать сотрудника' },
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

      if (response.status === 200) setServices(response.data.results)
    } catch (e) {
      console.error('error get services', e)
    }
  }, [])

  const EmployeeGET = React.useCallback(
    async (uuid: string) => {
      try {
        const response = await Employees.API.Edit.getEmployeeId(uuid)

        setEmployee(response.data)
        originalSchedule.current = response.data.schedule

        form.setFieldsValue({
          ...response.data,
          services: response.data.services.map((s: EmployeeTypes.Services) => s.id),
          schedule: response.data.schedule.map((s: EmployeeTypes.Schedule) => ({
            id: s.id,
            weekday: s.weekday,
            time: [dayjs(s.start_time, 'HH:mm'), dayjs(s.end_time, 'HH:mm')],
          })),
        })
      } catch (e) {
        console.error('error employee by uuid', e)
      } finally {
        setIsEmployeeLoading(false)
      }
    },
    [form],
  )

  const EditEmployee = React.useCallback(
    async (uuid: string, data: EmployeeTypes.Item) => {
      setSubmitted(true)
      try {
        const { schedule, ...payload } = data

        delete (payload as any).schedule

        const response = await Employees.API.Edit.editEmployee(uuid, payload)

        const currentList = (schedule as any[]) || []

        const newSchedules = currentList
          .filter((i) => !i?.id)
          .map((i) => ({
            weekday: String(i.weekday),
            start_time: i.time?.[0].format('HH:mm'),
            end_time: i.time?.[1].format('HH:mm'),
          }))

        const currentIds = currentList.filter((i) => i?.id).map((i) => i.id)
        const delete_schedules = originalSchedule.current
          .filter((o) => !currentIds.includes(o.id))
          .map((o) => o.id)

        const update_schedules = currentList
          .filter((i) => i?.id)
          .filter((i) => {
            const orig = originalSchedule.current.find((o) => o.id === i.id)

            if (!orig) return false
            const changedWeekday = i.weekday !== orig.weekday
            const changedStart = i.time?.[0].format('HH:mm') !== orig.start_time
            const changedEnd = i.time?.[1].format('HH:mm') !== orig.end_time

            return changedWeekday || changedStart || changedEnd
          })
          .map((i) => ({
            id: i.id,
            weekday: String(i.weekday),
            start_time: i.time?.[0].format('HH:mm'),
            end_time: i.time?.[1].format('HH:mm'),
          }))

        const schedulePayload: EmployeeTypes.SchedulePayload = {
          schedules: newSchedules,
          delete_schedules,
          update_schedules,
        }

        await Employees.API.Edit.editEmployeeSchedule(uuid, schedulePayload)

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

  const getWeekdayOptions = React.useCallback(
    (index: number) => {
      const list = form.getFieldValue('schedule') || []
      const selected = list
        .map((s: any) => s?.weekday)
        .filter((_: number, i: number) => i !== index)

      return weekdayData
        .filter((d) => !selected.includes(d.weekday))
        .map((d) => ({ value: d.weekday, label: d.weekday_name }))
    },
    [form],
  )

  return {
    breadcrumbData,
    contextHolder,
    form,
    services,
    employee,
    isEmployeeLoading,
    submitted,
    actions: {
      getServices,
      EmployeeGET,
      EditEmployee,
      getWeekdayOptions,
    },
  }
}

export const use = useEdit
