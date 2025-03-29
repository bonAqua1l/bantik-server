import { axiosRequest } from '@/shared/api/axios'

export const getWarehouse = async (id: number) => {
  return axiosRequest.get(`/warehouses/${id}/`)
}
