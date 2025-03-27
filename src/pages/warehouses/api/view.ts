import { axiosRequest } from '@/shared/api/axios'

export const getWarehouse = async (id: number) => {
  return axiosRequest.get(`/warehouses/${id}/`)
}

export const deleteWarehouse = async (id: number) => {
  return axiosRequest.delete(`/warehouses/${id}/`)
}
