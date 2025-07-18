import { axiosRequest } from '@/shared/api/axios'

export const getAmount = (type?: string, date?: string, group_by?: string) => {
  return axiosRequest.post('/reports/financial-report/', {
    type,
    date,
    group_by,
  })
}

export const getClients = (type?: string, date?: string) => {
  return axiosRequest.post('/reports/clients-statistics/', {
    type,
    date,
  })
}

export const getLeads = (type?: string, date?: string) => {
  return axiosRequest.post('/reports/lead-statistics/', {
    type,
    date,
  })
}

export const getTotal = () => {
  return axiosRequest.get('/reports/clients-total/')
}

export const getMasterList = () => {
  return axiosRequest.get('/reports/master-summary/')
}
