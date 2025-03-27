'use сlient'

import axios, { AxiosError } from 'axios'

import { TokenManagerClient } from '../utils/token-manager/token-manager-client'

const baseURL = process.env.NEXT_PUBLIC_COMPANY_BASE_URL

export const axiosRequest = axios.create({
  baseURL,
  withCredentials: true,
})

axiosRequest.interceptors.request.use(
  async (config) => {
    const access = await TokenManagerClient.getAccessToken()

    if (access)
      config.headers['Authorization'] = `Bearer ${access}`

    return config
  },
  (error) => Promise.reject(error),
)

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refresh = await TokenManagerClient.getRefreshToken()

    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
          refresh: refresh,
        })

        if (response) {
          await TokenManagerClient.setAccessToken(response.data.access)
          await TokenManagerClient.setRefreshToken(response.data.refresh)

          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`

          return axiosRequest(originalRequest)
        }
      } catch (e: any) {
        const error = e as AxiosError

        console.log('refresh token error', error)
      }
    }

    return
  },
)
