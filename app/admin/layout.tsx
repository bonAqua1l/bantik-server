import React from 'react'

import { ManagerLayout } from '@/shared/layouts/manager'
import '@/shared/assets/styles/globals.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ManagerLayout>{children}</ManagerLayout>
  )
}
