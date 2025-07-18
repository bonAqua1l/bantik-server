'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Warehouses } from '..'
import { WarehouseTypes } from '../types'

function useView() {
  const [isWarehouseLoading, setIsWarehouseLoading] = React.useState(true)
  const [warehose, setWarehouse] = React.useState<WarehouseTypes.Item | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  const router = useRouter()

  const WarehouseGET = React.useCallback(async (id: number) => {
    try {
      const response = await Warehouses.API.View.getWarehouse(id)

      if (response.status === 200) {
        setWarehouse(response.data)
      }
    } catch (error) {
      console.log('warehouse error', error)
    } finally {
      setIsWarehouseLoading(false)
    }
  }, [])

  const WarehouseDELETE = React.useCallback(async (id: number) => {
    setSubmitted(true)

    try {
      const response = await Warehouses.API.View.deleteWarehouse(id)

      if (response.status === 204) {
        router.push('/warehouses/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  return {
    isWarehouseLoading,
    warehose,
    router,
    submitted,
    actions: {
      WarehouseGET,
      WarehouseDELETE,
    },
  }
}

export const use = useView
