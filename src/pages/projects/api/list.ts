
import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getServices = async (search?: string | undefined ,url?: string, previousUrl?: string) => {
  if (search) {
    return axiosRequest.get(`/services/?include_additional=true&search=${search}`, {
      baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    })
  } else {
    return axiosRequest.get((previousUrl || url) || '/services/?include_additional=true', {
      baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    })
  }
}

export const createServices = async (body: FormData) => {
  return axiosRequest.post('/services/', body ,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
