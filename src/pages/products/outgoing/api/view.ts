import { axiosRequest } from '@/shared/api/axios'

export const getOutgoingDetails = async (id: string) => {
  return axiosRequest.get(`/outgoings/${id}/`)
}
