import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProjectsType } from '../types'

export const getServiceById = async (id: number) => {
  return axiosRequest.get(`/services/${id}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const editService = async (id: string, data: ProjectsType.FormEdit) => {
  return axiosRequest.patch(`/services/${id}/`, data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getServicesPaginated = async (params: { limit?: number; offset?: number; search?: string }) => {
  return axiosRequest.get('/services/', { params })
}
