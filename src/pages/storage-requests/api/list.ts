import { axiosRequest } from '@/shared/api/axios'

export const getLeadRequest = async (url?: string) => {
  return axiosRequest.get(url || '/pendings/pending/')
}

export const approveLeadStorageRequest = async (lead_ids: React.Key[]) => {
  return axiosRequest.post('/pendings/confirm/', {
    lead_ids: lead_ids,
  })
}
