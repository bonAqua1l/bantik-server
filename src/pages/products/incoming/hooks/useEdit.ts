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
  editIncoming,
} from '../api/edit'
import { ProductsIncomingTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()

  const [services, setServices] = React.useState<ProductsIncomingTypes.Service[]>([])
  const [selectedServiceIds, setSelectedServiceIds] = React.useState<number[]>([])

  const [availableDates, setAvailableDates] = React.useState<string[]>([])
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null)

  const [slots, setSlots] = React.useState<ProductsIncomingTypes.EmployeeSlotsResponse | null>(null)
  const [selectedMaster, setSelectedMaster] = React.useState<string | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null)

  const [clients, setClients] = React.useState<ProductsIncomingTypes.Clients[]>([])
  const [submitted, setSubmitted] = React.useState(false)
  const [isNotUser, setIsNotUser] = React.useState(true)

  const [incomingItem, setIncomingItem] = React.useState<ProductsIncomingTypes.Item | null>(null)
  const [incomingItemLoading, setIncomingItemLoading] = React.useState(true)

  const router = useRouter()
  const { contextHolder, showError } = useNotification()

  const yearFromDate = React.useCallback((d: string) => +d.split('-')[0], [])
  const monthFromDate = React.useCallback((d: string) => +d.split('-')[1], [])

  const ServiceGET = React.useCallback(async () => {
    const { data } = await ProductsIncoming.API.List.getServices()

    setServices(data.results)
  }, [])

  const ClientsGET = React.useCallback(async () => {
    const { data } = await ProductsIncoming.API.Create.getClients()

    setClients(data.results)
  }, [])

  const getIncomingDetails = React.useCallback(async (id: number) => {
    setIncomingItemLoading(true)
    try {
      const { data } = await ProductsIncoming.API.View.getProductsIncomingList(id)

      setIncomingItem(data)
    } finally {
      setIncomingItemLoading(false)
    }
  }, [])

  const fetchAvailableDates = React.useCallback(
    async (serviceIds: number[], y: number, m: number) => {
      if (!serviceIds.length) {
        setAvailableDates([])
        setSelectedDate(null)

        return
      }
      try {
        const { data } = await getProductIncomingAvailableDates(serviceIds.join(','), String(y), String(m))

        setAvailableDates(data.available_dates)
        setSelectedDate((prev) =>
          prev && data.available_dates.includes(prev) ? prev : data.available_dates[0] ?? null,
        )
      } catch {
        setAvailableDates([])
        setSelectedDate(null)
      }
    },
    [],
  )

  const fetchSlots = React.useCallback(
    async (serviceIds: number[], date: string) => {
      if (!serviceIds.length) {
        setSlots(null)

        return
      }
      try {
        const { data } = await getProductIncomingEmployeeAvailableSlots(serviceIds.join(','), date)

        setSlots(data)
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
    if (!incomingItem || !clients.length) return

    const date = dayjs(incomingItem.date_time).format('YYYY-MM-DD')
    const time = dayjs(incomingItem.date_time).format('HH:mm')
    const isKnownClient =
      !!incomingItem.client && clients.some((c) => c.id === incomingItem.client.id)

    setIsNotUser(!isKnownClient)

    const serviceIds = incomingItem.services.map((s) => s.id)

    setSelectedServiceIds(serviceIds)
    setSelectedDate(date)
    setSelectedTime(time)
    setSelectedMaster(incomingItem.master.uuid)

    form.setFieldsValue({
      client: incomingItem.client?.id,
      phone: isKnownClient ? undefined : incomingItem.phone,
      client_name: isKnownClient ? undefined : incomingItem.client_name,
      prepayment: incomingItem.prepayment,
      service: serviceIds,
      date: dayjs(date),
      master: incomingItem.master.uuid,
      time,
    })

    fetchAvailableDates(serviceIds, yearFromDate(date), monthFromDate(date))
    fetchSlots(serviceIds, date)
  }, [incomingItem, clients, form, fetchAvailableDates, fetchSlots, monthFromDate, yearFromDate])

  React.useEffect(() => {
    if (selectedServiceIds.length && selectedDate) {
      fetchAvailableDates(selectedServiceIds, yearFromDate(selectedDate), monthFromDate(selectedDate))
    }
  }, [selectedServiceIds, selectedDate, fetchAvailableDates, monthFromDate, yearFromDate])

  React.useEffect(() => {
    if (selectedServiceIds.length && selectedDate) fetchSlots(selectedServiceIds, selectedDate)
  }, [selectedServiceIds, selectedDate, fetchSlots])

  const masterOptions = React.useMemo(
    () => slots?.masters.map((m) => ({ value: m.uuid, label: m.name })) ?? [],
    [slots],
  )

  const timeOptions = React.useMemo(() => {
    if (!selectedMaster || !slots) return []
    const master = slots.masters.find((m) => m.uuid === selectedMaster)
    const base = master?.available_slots ?? []
    const set = new Set(base)

    if (selectedTime && !set.has(selectedTime)) set.add(selectedTime)

    return Array.from(set).map((t) => ({ value: t, label: t }))
  }, [selectedMaster, slots, selectedTime])

  const updateIncoming = React.useCallback(
    async (values: any) => {
      if (!incomingItem) return
      if (!selectedDate) return showError('Выберите дату')
      if (!selectedTime || !timeOptions.length) return showError('На выбранный день нет свободного времени')

      const payload: ProductsIncomingTypes.Form = {
        client: isNotUser ? null : values.client,
        client_name: values.client_name,
        phone: values.phone,
        date_time: `${selectedDate}T${selectedTime}`,
        prepayment: values.prepayment,
        services: selectedServiceIds,
        master: selectedMaster!,
      }

      setSubmitted(true)
      try {
        await editIncoming(payload, incomingItem.id)
        router.back()
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
      incomingItem,
      isNotUser,
      selectedDate,
      selectedTime,
      selectedServiceIds,
      selectedMaster,
      showError,
      timeOptions.length,
      router,
    ],
  )

  const breadcrumbData = [
    { href: '/admin/storage-requests/', title: 'Заявки' },
    { href: `/admin/products/incoming/${incomingItem?.id}`, title: `#${incomingItem?.id ? incomingItem.id : ''}` },
    { title: 'Редактировать' },
  ]

  return {
    breadcrumbData,
    services,
    selectedServiceIds,
    setSelectedServiceIds,
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
    updateIncoming,
    incomingItemLoading,
    incomingItem,
    getIncomingDetails,
  }
}

export const use = useEdit
