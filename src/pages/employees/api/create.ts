import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { EmployeeTypes } from '../types'

export const createEmployee = (data: FormData) => {
  return axiosRequest.post('/users/', data, { baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}

export const createEmployeeSchedule = (uuid: string, data: EmployeeTypes.SchedulePayload) => {
  return axiosRequest.post(`/users/${uuid}/add_schedule/`, data, { baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}

export const getServices = () => {
  return axiosRequest.get('/services/?limit=all', { baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}
