'use client'

import React from 'react'
import { Provider } from 'react-redux'

import { useStore } from '@/store'

interface Props {
    children: React.ReactNode
    initialState: string
}

const ReduxProvider: React.FC<Props> = ({ children, initialState }) => {
  const preloadedState = JSON.parse(initialState)
  const store = useStore(preloadedState)

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default ReduxProvider
