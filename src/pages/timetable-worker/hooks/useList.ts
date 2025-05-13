'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { TimetableWorker } from '..'
import { TimetableWorkerTypes } from '../types'

function useList() {
  const router = useRouter()
  const [worker, setWorker] = React.useState<TimetableWorkerTypes.User | null>(null)
  const [myLeads, setMyLeads] = React.useState<TimetableWorkerTypes.ItemRecord[] | null>(null)
  const [loading, setLoading] = React.useState(false)

  const ServicesGET = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await TimetableWorker.API.List.getServices()

      setWorker(response.data)
    } catch (error) {
      console.error('project error', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const MyLedsGet = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await TimetableWorker.API.List.getMyLeads()

      setMyLeads(response.data)
    } catch (error) {
      console.error('project error', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Расписание работы' },
  ]

  return {
    breadcrumbData,
    worker,
    loading,
    myLeads,
    actions: {
      router,
      ServicesGET,
      MyLedsGet,
    },
  }
}

export const use = useList
