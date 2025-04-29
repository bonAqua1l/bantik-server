import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getLeadRequest = async (url?: string, previusURL?: string) => {
  return axiosRequest.get((previusURL || url) || '/leads/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const approveLeadStorageRequest = async (lead_ids: React.Key[]) => {
  return axiosRequest.post('/pendings/confirm/', {
    lead_ids: lead_ids,
  })
}

export const rejectIncomingStorageRequest = async (incoming_ids: React.Key[]) => {
  return axiosRequest.post('/pendings/reject/', {
    lead_ids: incoming_ids,
  })
}
