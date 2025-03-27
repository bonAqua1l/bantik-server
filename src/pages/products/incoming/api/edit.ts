import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsItemsTypes } from '../../items/types'
import { ProductsIncomingTypes } from '../types'

export const getProductsIncomingList = async (page: number = 1) => {
  return axiosRequest.get(`/incomings/?page=${page}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductSearchedList = async (search?: string | undefined, url?: string) => {
  if (search) {
    return axiosRequest.get(`/products/?search=${search}`, {
      baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    })
  } else {
    return axiosRequest.get(url || '/products/', {
      baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    })
  }
}

export const createProductIncoming = async (body: FormData) => {
  return axiosRequest.post('/incomings/', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductIncomingProject = async () => {
  return axiosRequest.get('/project/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getUsers = async () => {
  return axiosRequest.get('/users/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const createProduct = async (body: ProductsItemsTypes.Item) => {
  return axiosRequest.post('/products/', body, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductsColors = async () => {
  return axiosRequest.get('/products/colors/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getIncomingDetail = (id: number) => {
  return axiosRequest.get(`/incomings/${id}/`)
}

export const editIncoming = async (body: ProductsIncomingTypes.EditForm, id: number) => {
  return axiosRequest.patch(`/incomings/${id}/`, body)
}

export const addFiles = async (body: FormData, id: number) => {
  return axiosRequest.post(`/incomings/${id}/add-files/`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
