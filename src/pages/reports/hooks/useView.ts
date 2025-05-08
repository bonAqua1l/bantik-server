'use client'

import React from 'react'

import dayjs from 'dayjs'

import { Reports } from '..'
import { ReportsTypes } from '../types'

function useView() {
  const date = Date()

  const [financialReport, setFinancialReport] = React.useState<ReportsTypes.FinancialReportItem | null>(null)
  const [isFinancialReportLoading, setIsFinancialReportLoading] = React.useState(false)
  const [selectedFinancialType, setSelectedFinancialType] = React.useState('month')
  const [selectedFinancialDate, setSelectedFinancialDate] = React.useState(dayjs(date).format('YYYY-MM-DD'))

  const [clients, setClients] = React.useState<ReportsTypes.ClientsItem | null>(null)
  const [isClientsReportLoading, setIsClientsReportLoading] = React.useState(false)
  const [selectedClientsType, setSelectedClientsType] = React.useState('week')
  const [selectedClientsDate, setSelectedClientsDate] = React.useState(dayjs(date).format('YYYY-MM-DD'))

  const [leads, setLeads] = React.useState<ReportsTypes.LeadItem | null>(null)
  const [isLeadsReportLoading, setIsLeadsReportLoading] = React.useState(false)
  const [selectedLeadsType, setSelectedLeadsType] = React.useState('week')
  const [selectedLeadsDate, setSelectedLeadsDate] = React.useState(dayjs(date).format('YYYY-MM-DD'))

  const [total_stats, setTotal] = React.useState<ReportsTypes.TotalStatsItem | null>(null)

  const [masterList, setMasterList] = React.useState<ReportsTypes.MasterList[] | null>(null)

  const getTotalAmount = React.useCallback(async (type?: string, date?: string, group_by?: string) => {
    setIsFinancialReportLoading(true)
    try {
      const response = await Reports.API.View.getAmount(type, date, group_by)

      setFinancialReport(response.data)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsFinancialReportLoading(false)
    }
  }, [])

  const getClients = React.useCallback(async (type?: string, date?: string) => {
    try {
      const response = await Reports.API.View.getClients(type, date)

      setClients(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const getLeads = React.useCallback(async (type?: string, date?: string) => {
    setIsLeadsReportLoading(true)
    try {
      const response = await Reports.API.View.getLeads(type, date)

      setLeads(response.data)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLeadsReportLoading(false)
    }
  }, [])

  const getTotal = React.useCallback(async () => {
    try {
      const response = await Reports.API.View.getTotal()

      setTotal(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const getMasterList = React.useCallback(async () => {
    try {
      const response = await Reports.API.View.getMasterList()

      setMasterList(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }, [])

  const handleFinancialTypeChange = (value: string) => {
    if (value) {
      setIsFinancialReportLoading(true)
      setSelectedFinancialType(value)
      getTotalAmount(value, selectedFinancialDate, 'day')
    } else {
      getTotalAmount(selectedFinancialType, selectedFinancialDate, 'day')
    }
  }

  const handleFinancialDateChange = (value: string) => {
    if (value) {
      setIsFinancialReportLoading(true)
      setSelectedFinancialDate(dayjs(value).format('YYYY-MM-DD'))
      getTotalAmount(selectedFinancialType, dayjs(value).format('YYYY-MM-DD'), 'day')
    } else {
      getTotalAmount(selectedFinancialType, selectedFinancialDate, 'day')
    }
  }

  const handleClientsTypeChange = (value: string) => {
    if (value) {
      setIsClientsReportLoading(true)
      setSelectedClientsType(value)
      getClients(value, selectedClientsDate)
    } else {
      getClients(selectedClientsType, selectedClientsDate)
    }
  }

  const handleClientsDateChange = (value: string) => {
    if (value) {
      setIsClientsReportLoading(true)
      setSelectedClientsDate(dayjs(value).format('YYYY-MM-DD'))
      getClients(selectedClientsType, dayjs(value).format('YYYY-MM-DD'))
    } else {
      getClients(selectedClientsType, selectedClientsDate)
    }
  }

  const handleLeadsTypeChange = (value: string) => {
    if (value) {
      setIsLeadsReportLoading(true)
      setSelectedLeadsType(value)
      getLeads(value, selectedLeadsDate)
    } else {
      getLeads(selectedLeadsType, selectedLeadsDate)
    }
  }

  const handleLeadsDateChange = (value: string) => {
    if (value) {
      setIsLeadsReportLoading(true)
      setSelectedLeadsDate(dayjs(value).format('YYYY-MM-DD'))
      getLeads(selectedLeadsType, dayjs(value).format('YYYY-MM-DD'))
    } else {
      getLeads(selectedLeadsType, selectedLeadsDate)
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Отчетность' },
  ]

  return {
    breadcrumbData,
    financialReport,
    clients,
    leads,
    total_stats,
    masterList,
    isFinancialReportLoading,
    isClientsReportLoading,
    isLeadsReportLoading,
    selectedFinancialType,
    selectedFinancialDate,
    selectedClientsType,
    selectedClientsDate,
    selectedLeadsType,
    selectedLeadsDate,
    actions: {
      getTotalAmount,
      getTotal,
      getClients,
      getLeads,
      getMasterList,
      handleFinancialTypeChange,
      handleFinancialDateChange,
      handleClientsTypeChange,
      handleClientsDateChange,
      handleLeadsTypeChange,
      handleLeadsDateChange,
    },
  }
}

export const use = useView
