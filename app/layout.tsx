import React, { Suspense } from 'react'

import { SFPro } from '@/shared/assets/fonts/fonts'
import { getSession } from '@/shared/lib/session'
import AntdProvider from '@/shared/providers/Antd'
import '@/shared/assets/styles/globals.css'
import ReduxProvider from '@/shared/providers/ReduxProvider'
import { initializeStore } from '@/store'

import Loader from './loading'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getSession()

  const preloadedState = userData ? { user: { userData: userData.user, isAuth: true } } : {}
  const store = initializeStore(preloadedState)
  const initialState = JSON.stringify(store.getState())

  return (
    <html lang="en" className={SFPro.className}>
      <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1b1d21" />

        <meta name="theme-color" content="#1b1d21" />
      </head>
      <body>
        <ReduxProvider initialState={initialState}>
          <AntdProvider>
            <Suspense fallback={<Loader />}>
              {children}
            </Suspense>
          </AntdProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
