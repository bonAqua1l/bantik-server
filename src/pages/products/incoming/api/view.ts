import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProductsIncomingList = async (id: string) => {
  return axiosRequest.get(`/incomings/${id}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
