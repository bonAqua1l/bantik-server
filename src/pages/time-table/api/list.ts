import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getWeeklyLeads = async (date: string) => {
  return axiosRequest.get(`/leads/weekly_leads/?date=${date}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
