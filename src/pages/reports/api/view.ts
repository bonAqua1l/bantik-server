import { axiosRequest } from '@/shared/api/axios'

export const getAmount = (type?: string, start_date?: string, end_date?: string) => {
  return axiosRequest.post('/reports/financial-report/', {
    type,
    start_date,
    end_date,
  })
}

export const getClients = (type?: string, start_date?: string, end_date?: string) => {
  return axiosRequest.post('/reports/new-clients-report/', {
    type,
    start_date,
    end_date,
  })
}

export const getLeads = (type?: string, start_date?: string, end_date?: string) => {
  return axiosRequest.post('/reports/average-bookings-report/', {
    type,
    start_date,
    end_date,
  })
}

export const getSpecials = (type?: string, start_date?: string, end_date?: string) => {
  return axiosRequest.post('/reports/leads-approval-report/', {
    start_date,
    end_date,
  })
}
