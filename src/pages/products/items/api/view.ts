import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProductBySlug = (async (slug: string) => {
  return axiosRequest.get(`/products/${slug}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
})

export const deleteProduct = async (slug: string) => {
  return axiosRequest.delete(`/products/${slug}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
