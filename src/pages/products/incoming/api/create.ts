import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProductsIncomingList = async (page: number = 1) => {
  return axiosRequest.get(`/incomings/?page=${page}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const createProductIncoming = async (body: FormData) => {
  return axiosRequest.post('/incomings/', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductIncomingProject = async () => {
  return axiosRequest.get('/project/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductIncomingAvailableDates = async (service_ids: string, year: string, month: string) => {
  return axiosRequest.get('/available-dates/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    params: {
      service_ids,
      year,
      month,
    },
  })
}

export const getProductIncomingEmployeeAvailableSlots = async (service_ids: string, date: string) => {
  return axiosRequest.get('/employees/available-slots/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    params: {
      service_ids,
      date,
    },
  })
}

export const getUsers = async () => {
  return axiosRequest.get('/users/?is_employee=true')
}

export const getClients = async () => {
  return axiosRequest.get('/clients/')
}
