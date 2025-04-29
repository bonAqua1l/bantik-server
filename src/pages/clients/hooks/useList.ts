'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Clients } from '..'
import { ClientsTypes } from '../types'

function useList() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [clients, setClients] = React.useState<ClientsTypes.ItemResponse | null>(null)
  const [clientsLoading, setClientsLoading] = React.useState(false)

  const ClientsGET = React.useCallback(async (url?: string, previusURL?: string) => {
    setClientsLoading(true)
    try {
      const response = await Clients.API.List.getClients(url || '/clients/', previusURL)

      if (response.status === 200) setClients(response.data)
    } catch (error) {
      console.log('Failed to fethc clients', error)
    } finally {
      setClientsLoading(false)
    }
  }, [])

  const handlePageChange = (page: number) => {
    const nextPageUrl = clients?.next
    const prevPageUrl = clients?.previous

    if (page > currentPage && nextPageUrl) {
      ClientsGET(nextPageUrl)
    } else if (page < currentPage && prevPageUrl) {
      ClientsGET(prevPageUrl)
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/employees', title: 'Мастера' },
  ]

  const deleteClient = React.useCallback(async (id: string) => {
    try {
      await Clients.API.List.deleteClient(id)

      ClientsGET()

    } catch (error) {
      console.log('error', error)
    }
  }, [])

  return {
    breadcrumbData,
    clients,
    currentPage,
    clientsLoading,
    actions: {
      router,
      setCurrentPage,
      ClientsGET,
      handlePageChange,
      deleteClient,
    },
  }
}

export const use = useList
