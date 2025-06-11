
import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getServices = async (url?: string, previousUrl?: string) => {
  return axiosRequest.get((previousUrl || url) || '/services/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const createServices = async (body: FormData) => {
  return axiosRequest.post('/services/', body ,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
