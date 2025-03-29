import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getDaylyLeads = async (date: string) => {
  return axiosRequest.get(`/leads/daily_leads/?date=${date}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
