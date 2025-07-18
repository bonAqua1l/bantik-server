import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { WarehouseTypes } from '../types'

export const createWarehouse = async (data: WarehouseTypes.Item) => {
  const formData = new FormData()

  formData.append('title', data.title)

  if (data.image[0].originFileObj) {
    formData.append('image', data.image[0].originFileObj)
  }

  return axiosRequest.post('/warehouses/', formData, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
