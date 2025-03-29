'use client'

import React from 'react'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { Timetable } from '..'
import { TimetableTypes } from '../types'

function useView() {
  const router = useRouter()
  const [timetable, setTimetable] = React.useState<TimetableTypes.ItemDetail | null>(null)
  const [loading, setLoading] = React.useState(false)

  const TimetableGET = async (date: string) => {
    try {
      setLoading(true)
      const response = await Timetable.API.View.getDaylyLeads(date)

      setTimetable(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/timetable', title: 'Расписание' },
    { title: timetable?.day },
  ]

  const formatRussianDate = (dateString?: string, dayName?: string) => {
    if (!dateString) return ''
    const parsed = dayjs(dateString)
    const day = parsed.date()
    const monthIndex = parsed.month()
    const months = [
      'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
      'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',
    ]
    const monthName = months[monthIndex]

    return `${day} ${monthName} ${dayName ?? ''}`.trim()
  }

  return {
    breadcrumbData,
    loading,
    timetable,
    actions: {
      router,
      TimetableGET,
      formatRussianDate,
    },
  }
}

export const use = useView
