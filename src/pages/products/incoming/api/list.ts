import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsItemsTypes } from '../../items/types'
import { ProductsIncomingTypes } from '../types'

export const getProductsIncomingList = async (url?: string, previusURL?: string) => {
  return axiosRequest.get((previusURL || url) || '/leads/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductSearchedList = async (search: string | undefined) => {
  return axiosRequest.get(`/products/?search=${search}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
//TODO: переписать names
export const createProductIncoming = async (body: ProductsIncomingTypes.Form) => {
  return axiosRequest.post('/leads/', body)
}

export const getServices = async () => {
  return axiosRequest.get('/services/')
}

export const getUsersByProject = async (id: number) => {
  return axiosRequest.get('/users/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    params: {
      project_id: id,
    },
  })
}

export const createProduct = async (body: ProductsItemsTypes.Item) => {
  return axiosRequest.post('/products/', body, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
