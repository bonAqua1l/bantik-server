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
  const [loading, setLoading] = React.useState(false)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Расписание' },
  ]

  const TimetableGET = async (date: string) => {
    try {
      setLoading(true)
      const response = await Timetable.API.List.getWeeklyLeads(date)

      setTimetable(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

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

  return {
    breadcrumbData,
    timetable,
    currentDate,
    loading,
    actions: {
      router,
      TimetableGET,
      handlePrev,
      handleNext,
    },
  }
}

export const use = useList
