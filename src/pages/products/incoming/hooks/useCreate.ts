'use client'

import React from 'react'

import { Form } from 'antd'
import { AxiosError } from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import useNotification from '@/shared/hooks/useNotifications'

import { ProductsIncoming } from '..'
import {
  getProductIncomingAvailableDates,
  getProductIncomingEmployeeAvailableSlots,
} from '../api/create'
import { ProductsIncomingTypes } from '../types'

function useCreate() {
  const [form] = Form.useForm()

  const [services, setServices] = React.useState<ProductsIncomingTypes.Service[]>([])
  const [selectedServiceId, setSelectedServiceId] = React.useState<number | null>(null)

  const [availableDates, setAvailableDates] = React.useState<string[]>([])
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null)

  const [slots, setSlots] = React.useState<ProductsIncomingTypes.EmployeeSlotsResponse | null>(null)
  const [selectedMaster, setSelectedMaster] = React.useState<string | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null)

  const [clients, setClients] = React.useState<ProductsIncomingTypes.Clients[]>([])
  const [submitted, setSubmitted] = React.useState(false)
  const [isNotUser, setIsNotUser] = React.useState(true)

  const router = useRouter()
  const { contextHolder, showError } = useNotification()

  const today = React.useMemo(() => dayjs(), [])
  const currentMonth = today.month() + 1
  const currentYear = today.year()

  const ServiceGET = React.useCallback(async () => {
    try {
      const res = await ProductsIncoming.API.List.getServices()

      setServices(res.data.results)
    } catch {
      /* empty */
    }
  }, [])

  const ClientsGET = React.useCallback(async () => {
    try {
      const res = await ProductsIncoming.API.Create.getClients()

      setClients(res.data.results)
    } catch {
      /* empty */
    }
  }, [])

  const fetchAvailableDates = React.useCallback(
    async (serviceId: number) => {
      try {
        const res = await getProductIncomingAvailableDates(
          String(serviceId),
          String(currentYear),
          String(currentMonth),
        )

        setAvailableDates(res.data.available_dates)
        if (res.data.available_dates.length) {
          setSelectedDate(res.data.available_dates[0])
        } else {
          setSelectedDate(null)
        }
      } catch {
        setAvailableDates([])
        setSelectedDate(null)
      }
    },
    [currentMonth, currentYear],
  )

  const fetchSlots = React.useCallback(
    async (serviceId: number, date: string) => {
      try {
        const res = await getProductIncomingEmployeeAvailableSlots(String(serviceId), date)

        setSlots(res.data)
      } catch {
        setSlots(null)
      }
    },
    [],
  )

  React.useEffect(() => {
    ServiceGET()
    ClientsGET()
  }, [ServiceGET, ClientsGET])

  React.useEffect(() => {
    if (selectedServiceId) fetchAvailableDates(selectedServiceId)
    setSelectedMaster(null)
    setSelectedTime(null)
  }, [selectedServiceId, fetchAvailableDates])

  React.useEffect(() => {
    if (selectedServiceId && selectedDate) fetchSlots(selectedServiceId, selectedDate)
    setSelectedMaster(null)
    setSelectedTime(null)
    form.setFieldsValue({ date: selectedDate ? dayjs(selectedDate) : null })
  }, [selectedServiceId, selectedDate, fetchSlots, form])

  const masterOptions = React.useMemo(
    () =>
      slots?.masters.map((m) => ({
        value: m.uuid,
        label: m.name,
      })) || [],
    [slots],
  )

  const timeOptions = React.useMemo(() => {
    if (!selectedMaster || !slots) return []
    const master = slots.masters.find((m) => m.uuid === selectedMaster)

    return master?.available_slots.map((t) => ({ value: t, label: t })) || []
  }, [selectedMaster, slots])

  const createIncoming = React.useCallback(
    async (values: any) => {
      if (!selectedDate) {
        showError('Выберите дату')

        return
      }
      if (!selectedTime || !timeOptions.length) {
        showError('На выбранный день нет свободного времени')

        return
      }

      const payload = {
        client: isNotUser ? null : values.client,
        phone: values.phone,
        client_name: values.client_name,
        date_time: `${selectedDate}T${selectedTime}`,
        prepayment: values.prepayment,
        service: selectedServiceId,
        master: selectedMaster,
      } as ProductsIncomingTypes.Form

      const body = new FormData()

      Object.entries(payload).forEach(([k, v]) =>
        v !== undefined && v !== null && body.append(k, v as any),
      )

      setSubmitted(true)
      try {
        const res = await ProductsIncoming.API.List.createProductIncoming(body)

        if (res.status !== 201) throw new Error()
        router.push('/admin/storage-requests/')
      } catch (e) {
        const err = e as AxiosError

        if (
          err.response &&
          Array.isArray(err.response.data) &&
          err.response.data[0] === 'Этот мастер не оказывает данную услугу.'
        ) {
          showError('Этот мастер не оказывает данную услугу.')
        }
      } finally {
        setSubmitted(false)
      }
    },
    [
      isNotUser,
      selectedDate,
      selectedTime,
      selectedServiceId,
      selectedMaster,
      router,
      showError,
      timeOptions.length,
    ],
  )

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/storage-requests/', title: 'Лиды' },
    { title: 'Создать' },
  ]

  return {
    breadcrumbData,
    services,
    selectedServiceId,
    setSelectedServiceId,
    availableDates,
    selectedDate,
    setSelectedDate,
    submitted,
    form,
    router,
    clients,
    isNotUser,
    setIsNotUser,
    masterOptions,
    selectedMaster,
    setSelectedMaster,
    timeOptions,
    selectedTime,
    setSelectedTime,
    contextHolder,
    createIncoming,
  }
}

export const use = useCreate
