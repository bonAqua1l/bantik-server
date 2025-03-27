
import { axiosRequest } from '@/shared/api/axios'

export const getServices = async () => {
  return axiosRequest.get('/services/', {
  })
}

export const createServices = async (body: FormData) => {
  return axiosRequest.post('/services/', body ,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
