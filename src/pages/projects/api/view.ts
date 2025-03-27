import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getServiceById = async (id: number) => {
  return axiosRequest.get(`/services/${id}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const deleteService = async (id: number) => {
  return axiosRequest.delete(`/services/${id}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
