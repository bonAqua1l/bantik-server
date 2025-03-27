import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { EmployeeTypes } from '../types'

export const getEmployeesList = async () => {
  return axiosRequest.get('/users', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getEmployeeId = async (uuid: string) => {
  return axiosRequest.get(`/users/${uuid}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const editEmployee = async (uuid: string, data: EmployeeTypes.Item) => {
  return axiosRequest.patch(`/users/${uuid}/`, data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
