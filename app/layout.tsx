import React, { Suspense } from 'react'

import { SFPro } from '@/shared/assets/fonts/fonts'
import { EmployeeLayout } from '@/shared/layouts/employee/ui/EmployeeLayout'
import { ManagerLayout } from '@/shared/layouts/manager'
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
              {userData && userData.user.role === 'manager' ? (
                <ManagerLayout>{children}</ManagerLayout>
              ) : userData && userData.user.role === 'worker' ? (
                <EmployeeLayout>{children}</EmployeeLayout>
              ) : (
                children
              )}
            </Suspense>
          </AntdProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
