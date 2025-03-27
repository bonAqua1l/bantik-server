import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getWarehouses = async () => {
  return axiosRequest.get('/warehouses/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const setWarehouse = async (storage_id: number) => {
  return axiosRequest.post('/users/set_current_warehouse/', {
    warehouse_id: storage_id,
  }, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
