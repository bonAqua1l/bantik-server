import { axiosRequest } from '@/shared/api/axios'

export const getStorageRequest = async (type: string, url?: string) => {
  return axiosRequest.get(url || '/pendings/pending/', {
    params: {
      type: type,
    },
  })
}

export const approveIncomingStorageRequest = async (incoming_ids: React.Key[]) => {
  return axiosRequest.post('/pendings/approve/', {
    incoming_ids: incoming_ids,
  })
}

export const approveOutgoingStorageRequest = async (outgoing_ids: React.Key[]) => {
  return axiosRequest.post('/pendings/approve/', {
    outgoing_ids: outgoing_ids,
  })
}

export const rejectIncomingStorageRequest = async (incoming_ids: React.Key[]) => {
  return axiosRequest.post('/pendings/reject/', {
    incoming_ids: incoming_ids,
  })
}

export const rejectOutgoingStorageRequest = async (outgoing_ids: React.Key[]) => {
  return axiosRequest.post('/pendings/reject/', {
    outgoing_ids: outgoing_ids,
  })
}
