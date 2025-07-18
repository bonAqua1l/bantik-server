import { axiosRequest } from '@/shared/api/axios'

import { WarehouseTypes } from '../types'

export const editWarehouse = async (data: WarehouseTypes.Item, id: number) => {
  return axiosRequest.patch(`/warehouses/${id}/`, data)
}
