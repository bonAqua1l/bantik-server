import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsItemsTypes } from '../types'

export const editProject = async (slug: string, data: ProductsItemsTypes.FormEdit) => {
  return axiosRequest.patch(`/products/${slug}/`, data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductBySlug = (async (slug: string) => {
  return axiosRequest.get(`/products/${slug}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
})

export const getProductsColors = async () => {
  return axiosRequest.get('/products/colors/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const deleteProductImages = async (data: ProductsItemsTypes.DelteImages) => {
  return axiosRequest.delete('/products/images/delete/', {
    data,
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
