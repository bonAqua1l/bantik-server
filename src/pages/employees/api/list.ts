import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { EmployeeTypes } from '../types'

export const getEmployeesList = async () => {
  return axiosRequest.get('/users', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const fireEmployee = async (uuid: string, data: EmployeeTypes.FireEmployeeForm) => {
  return axiosRequest.post(`/users/${uuid}/fire/`, data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
