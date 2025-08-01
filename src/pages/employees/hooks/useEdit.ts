'use client'

import React from 'react'

import { Form, Upload } from 'antd'
import { UploadProps } from 'antd/lib'
import { UploadFile } from 'antd/lib/upload/interface'
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

  const makeFileFromUrl = React.useCallback(
    (url: string): UploadFile => ({
      uid: '-1',
      name: url.split('/').pop() || 'avatar',
      status: 'done',
      url,
      thumbUrl: url,
    }),
    [],
  )

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

      if (response.status === 200) {
        setServices(response.data)
      }
    } catch (e) {
      console.error('error get services', e)
    }
  }, [])

  const EmployeeGET = React.useCallback(
    async (uuid: string) => {
      try {
        const response = await Employees.API.Edit.getEmployeeId(uuid)

        setEmployee(response.data)
        // Инициализируем originalSchedule с пустым массивом по умолчанию
        originalSchedule.current = Array.isArray(response.data.schedule)
          ? response.data.schedule
          : []
        const scheduleArr = Array.isArray(response.data.schedule)
          ? response.data.schedule
          : []

        form.setFieldsValue({
          ...response.data,
          services: (response.data.services || []).map((s: any) => s.id),
          avatar: response.data.avatar ? [makeFileFromUrl(response.data.avatar)] : null,
          schedule: scheduleArr.map((s: any) => ({
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
    [form, makeFileFromUrl],
  )

  const EditEmployee = React.useCallback(
    async (uuid: string, data: any) => {
      setSubmitted(true)
      try {
        console.log('data', data)
        const { schedule, avatar, services = [], ...rest } = data
        const formData = new FormData()

        Object.entries(rest).forEach(([k, v]) => {
          if (v !== undefined && v !== null) formData.append(k, String(v))
        })

        if (
          Array.isArray(avatar) &&
          avatar.length &&
          (avatar[0] as UploadFile).originFileObj
        ) {
          formData.append('avatar', (avatar[0] as UploadFile).originFileObj as File)
        }

        if (Array.isArray(services) && services.length) {
          formData.append('services', services.join(','))
        }

        const response = await Employees.API.Edit.editEmployee(uuid, formData)

        const currentList = Array.isArray(schedule) ? schedule : []

        const newSchedules = currentList
          .filter((i: any) => !i?.id)
          .map((i: any) => ({
            weekday: String(i.weekday),
            start_time: i.time?.[0]?.format('HH:mm') || '',
            end_time: i.time?.[1]?.format('HH:mm') || '',
          }))

        const currentIds = currentList.filter((i: any) => i?.id).map((i: any) => i.id)

        // Защищаемся от undefined значения
        const originalScheduleArray = originalSchedule.current || []
        const delete_schedules = originalScheduleArray
          .filter((o) => !currentIds.includes(o.id))
          .map((o) => o.id)

        const update_schedules = currentList
          .filter((i: any) => i?.id)
          .filter((i: any) => {
            const orig = originalScheduleArray.find((o: any) => o.id === i.id)

            if (!orig) return false
            const changedWeekday = i.weekday !== orig.weekday
            const changedStart = i.time?.[0]?.format('HH:mm') !== orig.start_time
            const changedEnd = i.time?.[1]?.format('HH:mm') !== orig.end_time

            return changedWeekday || changedStart || changedEnd
          })
          .map((i: any) => ({
            id: i.id,
            weekday: String(i.weekday),
            start_time: i.time?.[0]?.format('HH:mm') || '',
            end_time: i.time?.[1]?.format('HH:mm') || '',
          }))

        const schedulePayload: EmployeeTypes.SchedulePayload = {
          schedules: newSchedules,
          delete_schedules,
          update_schedules,
        }

        // Добавляем проверку на наличие изменений в расписании
        if (newSchedules.length > 0 || delete_schedules.length > 0 || update_schedules.length > 0) {
          await Employees.API.Edit.editEmployeeSchedule(uuid, schedulePayload)
        }

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
    defaultDraggerProps,
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
