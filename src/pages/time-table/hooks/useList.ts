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
  const [services, setServices] = React.useState<TimetableTypes.Service[] | undefined>(undefined)
  const [employee, setEmployees] = React.useState<TimetableTypes.Employee[] | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [selectedService, setSelectedService] = React.useState<string | undefined>(undefined)
  const [selectedMaster, setSelectedMaster] = React.useState<string | undefined>(undefined)

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

  const ServicesGET = React.useCallback(async () => {
    try {
      const response = await Timetable.API.List.getServices()

      setServices(response.data.results)
    } catch (error) {
      console.error('project error', error)
    }
  }, [])

  const getEmployeesList = React.useCallback(async () => {
    try {
      const response = await Timetable.API.List.getEmployeesList()

      const data = response.data.results

      setEmployees(data)
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
    TimetableGET(newDate.format('YYYY-MM-DD'))
  }, [currentDate])

  const handleNext = React.useCallback(() => {
    const newDate = currentDate.add(7, 'day')

    setCurrentDate(newDate)
    TimetableGET(newDate.format('YYYY-MM-DD'))
  }, [currentDate])

  const days = timetable?.days || []

  return {
    breadcrumbData,
    timetable,
    employee,
    currentDate,
    loading,
    days,
    services,
    actions: {
      router,
      TimetableGET,
      ServicesGET,
      getEmployeesList,
      handlePrev,
      handleNext,
      handleServiceChange,
      handleMasterChange,
    },
  }
}

export const use = useList
