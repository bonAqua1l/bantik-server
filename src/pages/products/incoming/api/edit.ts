import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsIncomingTypes } from '../types'

export const getUsers = async () => {
  return axiosRequest.get('/users/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const editIncoming = async (body: ProductsIncomingTypes.Form, id: number) => {
  return axiosRequest.patch(`/leads/${id}/`, body)
}

export const getProductIncomingAvailableDates = async (service_ids: string, year: string, month: string) => {
  return axiosRequest.get('/available-dates/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    params: {
      service_ids,
      year,
      month,
    },
  })
}

export const getProductIncomingEmployeeAvailableSlots = async (service_ids: string, date: string) => {
  return axiosRequest.get('/employees/available-slots/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    params: {
      service_ids,
      date,
    },
  })
}
