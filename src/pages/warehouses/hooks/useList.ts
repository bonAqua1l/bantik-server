'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux'
import { NEXT_PUBLIC_API_URL } from '@/shared/utils/consts'
import { login } from '@/store/actions/user'
import { setWarehouse } from '@/store/actions/warehouse'

import { Warehouses } from '..'
import { WarehouseTypes } from '../types'

function useList() {
  const [isWarehouseLoading, setIsWarehouseLoading] = React.useState(true)
  const warehouses: WarehouseTypes.Item[] | null = useAppSelector((state) => state.warehoses.warehouses)

  const dispatch = useAppDispatch()
  const router = useRouter()

  const WarehouseListGET = React.useCallback(async () => {
    try {
      const response = await Warehouses.API.List.getWarehouses()

      dispatch(setWarehouse(response.data.results))
    } catch (error) {
      console.log('warehouse list error', error)
    } finally {
      setIsWarehouseLoading(false)
    }
  }, [])

  const SelectStorage = React.useCallback(async (storage_id: number) => {
    try {
      const response = await Warehouses.API.List.setWarehouse(storage_id)

      if (response.status === 200) {
        dispatch(login(response.data))

        await fetch(`${NEXT_PUBLIC_API_URL}/api/users/set-user/`, {
          method: 'POST',
          body: JSON.stringify(response.data),
        })

        router.push('/products/incoming/')
      }
    } catch (error) {
      console.log('select storage error', error)
    }
  }, [])

  return {
    isWarehouseLoading,
    warehouses,
    router,
    actions: {
      WarehouseListGET,
      SelectStorage,
    },
  }
}

export const use = useList
