import React from 'react'

import { useRouter } from 'next/navigation'

import useNotification from '@/shared/hooks/useNotifications'
import { loginSession as onLogin } from '@/shared/lib/session'
import { TokenManagerClient } from '@/shared/utils/token-manager/token-manager-client'

import { LoginTypes } from '../types'

export const useLogin = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { contextHolder, showError } = useNotification()

  const router = useRouter()

  const login = React.useCallback(async (data: LoginTypes.Form) => {
    setIsLoading(true)

    try {
      const response = await onLogin(data)

      TokenManagerClient.setAccessToken(response.access)
      TokenManagerClient.setRefreshToken(response.refresh)

      if (response && response.success) {
        router.push('/products/incoming')
      } else {
        showError('Что то пошло не так!')
        console.error('Login failed:', response || 'Unknown error')
      }
    } catch (err) {
      showError('Что то пошло не так!')
      console.error('Error during login session:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    contextHolder,
    actions: {
      login,
    },
  }
}

export const use = useLogin
