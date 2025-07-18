import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ClientsTypes } from '../types'

export const editClient = (data: ClientsTypes.ItemForm, id: number) => {
  return axiosRequest.patch(`/clients/${id}/`, data ,{ baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}

export const getClient = (id: number) => {
  return axiosRequest.get(`/clients/${id}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
