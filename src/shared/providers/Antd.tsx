import React from 'react'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'

import ThemeConfig from '@/shared/assets/theme'

interface Props {
  children: React.ReactNode
}

const AntdProvider: React.FC<Props> = ({
  children,
}) => {
  return (
    <ConfigProvider theme={ThemeConfig} locale={ruRU}>
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  )
}

export default AntdProvider
