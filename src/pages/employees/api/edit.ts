import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { EmployeeTypes } from '../types'

export const getEmployeesList = () => {
  return axiosRequest.get('/users/', { baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}

export const getEmployeeId = (uuid: string) => {
  return axiosRequest.get(`/users/${uuid}/`, { baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}

export const editEmployee = (uuid: string, data: EmployeeTypes.Item | any) => {
  return axiosRequest.patch(`/users/${uuid}/`, data, { baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}

export const editEmployeeSchedule = (uuid: string, data: EmployeeTypes.SchedulePayload) => {
  return axiosRequest.patch(`/users/${uuid}/`, data, { baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}

export const deleteEmployee = (id: string) => {
  return axiosRequest.delete(`/users/${id}/`)
}
