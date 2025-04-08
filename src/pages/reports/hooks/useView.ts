'use client'

import React from 'react'

import { Reports } from '..'
import { ReportsTypes } from '../types'

function useView() {
  const [totalAmount, setTotalAmount] = React.useState(0)
  const [clients, setClients] = React.useState(0)
  const [leads, setLeads] = React.useState<ReportsTypes.Leads>({ average_bookings_per_day: 0, days_in_period: 0, total_bookings: 0 })
  const [specials, setSpecials] = React.useState<ReportsTypes.Specials>({ approval_rate_percent: 0, approved: 0, rejected: 0, rejection_rate_percent: 0, total: 0 })
  const [today, setToday] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const getTotalAmount = React.useCallback(async (type?: string, start_date?: string, end_date?: string) => {
    try {
      const response = await Reports.API.View.getAmount(type, start_date, end_date)

      setTotalAmount(response.data.total_amount)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const getClients = React.useCallback(async (type?: string, start_date?: string, end_date?: string) => {
    try {
      const response = await Reports.API.View.getClients(type, start_date, end_date)

      setClients(response.data.new_clients_count)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const getLeads = React.useCallback(async (type?: string, start_date?: string, end_date?: string) => {
    try {
      const response = await Reports.API.View.getLeads(type, start_date, end_date)

      setLeads(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const getSpecials = React.useCallback(async (type?: string, start_date?: string, end_date?: string) => {
    try {
      const response = await Reports.API.View.getSpecials(type, start_date, end_date)

      setSpecials(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const handleDateChange = (dates: any) => {
    if (dates) {
      setLoading(true)
      const [start, end] = dates
      const startDate = start.format('YYYY-MM-DD')
      const endDate = end.format('YYYY-MM-DD')

      getTotalAmount(undefined, startDate, endDate)
      getClients(undefined, startDate, endDate)
      getLeads(undefined, startDate, endDate)
      setToday(false)
      setLoading(false)
    } else {
      getTotalAmount()
      getClients()
      getLeads()
      setToday(false)
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Отчетность' },
  ]

  return {
    breadcrumbData,
    totalAmount,
    today,
    clients,
    leads,
    loading,
    specials,
    actions: {
      getTotalAmount,
      handleDateChange,
      setToday,
      getClients,
      getLeads,
      setLoading,
      getSpecials,
    },
  }
}

export const use = useView
