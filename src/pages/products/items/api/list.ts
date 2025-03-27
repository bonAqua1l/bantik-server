import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsItemsTypes } from '../types'

export const getProductsList = async () => {
  return axiosRequest.get('/products/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductsColors = async () => {
  return axiosRequest.get('/products/colors/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const createProduct = async (body: ProductsItemsTypes.Item) => {
  return axiosRequest.post('/products/', body, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductItemsCategories = async () => {
  return axiosRequest.get('/categories/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
