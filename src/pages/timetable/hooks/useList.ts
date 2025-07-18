'use client'

import React from 'react'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { Timetable } from '..'
import { TimetableTypes } from '../types'

function useList() {
  const date = Date.now()
  const router = useRouter()
  const [timetable, setTimetable] = React.useState<TimetableTypes.Item | null>(null)
  const [currentDate, setCurrentDate] = React.useState(dayjs(date))
  const [services, setServices] = React.useState<TimetableTypes.Service[]>([])
  const [employee, setEmployees] = React.useState<TimetableTypes.Employee[] | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [servicesLoading, setServicesLoading] = React.useState(false)
  const [selectedService, setSelectedService] = React.useState<string | undefined>(undefined)
  const [selectedMaster, setSelectedMaster] = React.useState<string | undefined>(undefined)
  const [servicesPage, setServicesPage] = React.useState(0)
  const [servicesHasMore, setServicesHasMore] = React.useState(true)
  const [servicesSearch, setServicesSearch] = React.useState('')

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Расписание' },
  ]

  const TimetableGET = async (date: string, master_uuid?: string, service_id?: string) => {
    try {
      setLoading(true)
      const response = await Timetable.API.List.getWeeklyLeads(date, master_uuid, service_id)

      setTimetable(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const ServicesGET = async (page = 0, search = '') => {
    try {
      setServicesLoading(true)
      const limit = 20
      const offset = page * limit
      const response = await Timetable.API.List.getServicesPaginated({ limit, offset, search })
      const data = response.data.results

      if (page === 0) {
        setServices(data)
      } else {
        setServices(prev => [...prev, ...data])
      }
      setServicesHasMore(Boolean(response.data.next))
    } catch (error) {
      console.error('services error', error)
    } finally {
      setServicesLoading(false)
    }
  }

  const getEmployeesList = React.useCallback(async () => {
    try {
      const response = await Timetable.API.List.getEmployeesList()

      setEmployees(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleServiceChange = React.useCallback((value: string | undefined) => {
    setSelectedService(value)
    TimetableGET(currentDate.format('YYYY-MM-DD'), selectedMaster, value)
  }, [currentDate, selectedMaster])

  const handleMasterChange = React.useCallback((value: string | undefined) => {
    setSelectedMaster(value)
    TimetableGET(currentDate.format('YYYY-MM-DD'), value, selectedService)
  }, [currentDate, selectedService])

  const handlePrev = React.useCallback(() => {
    const newDate = currentDate.subtract(7, 'day')

    setCurrentDate(newDate)
    TimetableGET(newDate.format('YYYY-MM-DD'), selectedMaster, selectedService)
  }, [currentDate, selectedMaster, selectedService])

  const handleNext = React.useCallback(() => {
    const newDate = currentDate.add(7, 'day')

    setCurrentDate(newDate)
    TimetableGET(newDate.format('YYYY-MM-DD'), selectedMaster, selectedService)
  }, [currentDate, selectedMaster, selectedService])

  const handleServiceSearch = React.useCallback((value: string) => {
    setServicesSearch(value)
    setServicesPage(0)
    ServicesGET(0, value)
  }, [])

  const handleServiceScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement

    if (target.scrollTop + target.offsetHeight + 10 >= target.scrollHeight && servicesHasMore && !servicesLoading) {
      const nextPage = servicesPage + 1

      setServicesPage(nextPage)
      ServicesGET(nextPage, servicesSearch)
    }
  }, [servicesPage, servicesHasMore, servicesLoading, servicesSearch])

  const days = timetable?.days || []

  return {
    breadcrumbData,
    timetable,
    employee,
    currentDate,
    loading,
    days,
    services,
    servicesLoading,
    actions: {
      router,
      TimetableGET,
      ServicesGET,
      getEmployeesList,
      handlePrev,
      handleNext,
      handleServiceChange,
      handleMasterChange,
      handleServiceSearch,
      handleServiceScroll,
    },
  }
}

export const use = useList
