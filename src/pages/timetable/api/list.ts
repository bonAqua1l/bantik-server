import { axiosRequest } from '@/shared/api/axios'

export const getWeeklyLeads = async (date: string, master_uuid?: string, service_id?: string) => {
  return axiosRequest.get(`/leads/weekly_leads/?date=${date}`, {
    params: {
      master_uuid,
      service_id,
    },
  })
}

export const getServices = async () => {
  return axiosRequest.get('/services/', {
  })
}

export const getServicesPaginated = async (params: { limit?: number; offset?: number; search?: string }) => {
  return axiosRequest.get('/services/', { params })
}

export const getEmployeesList = async () => {
  return axiosRequest.get('/users', {
  })
}
