import { axiosRequest } from '@/shared/api/axios'

export const getLeadRequest = async (url?: string) => {
  return axiosRequest.get(url || '/leads/')
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
