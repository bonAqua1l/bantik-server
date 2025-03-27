import React from 'react'

import { SFPro } from '@/shared/assets/fonts/fonts'
import '@/shared/assets/styles/globals.css'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={SFPro.className}>
      <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1b1d21" />

        <meta name="theme-color" content="#1b1d21" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
