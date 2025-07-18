import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getClients = (url?: string, previusURL?: string) => {
  return axiosRequest.get((url || previusURL) || '/clients/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const deleteClient = async (id: string) => {
  return axiosRequest.delete(`/clients/${id}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
