'use client'

import React from 'react'

import { Spin, Empty } from 'antd'

import cls from './loaderData.module.css'

interface Props<T> {
  data: T | null
  isLoading: boolean
  children: React.ReactNode
  minHeight?: string
}

export const LoaderData = <T,>({
  data,
  isLoading,
  children,
  minHeight = '350px',
}: Props<T>) => {
  if (isLoading) {
    return <div className={cls.spin} style={{ minHeight }}><Spin size="large" /></div>
  }

  if (!data || (Array.isArray(data) && !data.length)) {
    return <div className={cls.empty} style={{ minHeight }}><Empty description="Пока пусто" /></div>
  }

  return <>{children}</>
}
