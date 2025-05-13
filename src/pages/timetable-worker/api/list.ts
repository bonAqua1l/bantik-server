import { axiosRequest } from '@/shared/api/axios'

export const getServices = async () => {
  return axiosRequest.get('/users/me/', {
  })
}

export const getMyLeads = async () => {
  return axiosRequest.get('/my-leads/', {
  })
}
