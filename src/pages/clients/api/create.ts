import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ClientsTypes } from '../types'

export const createClient = (data: ClientsTypes.ItemForm) => {
  return axiosRequest.post('/clients/', data ,{ baseURL: NEXT_PUBLIC_COMPANY_BASE_URL })
}
