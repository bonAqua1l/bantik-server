import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { EmployeeTypes } from '../types'

export const createEmployee = async (data: EmployeeTypes.Item) => {
  return axiosRequest.post('/users/', data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
