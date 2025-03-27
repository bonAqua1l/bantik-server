'use client'

import React from 'react'

import { Menu } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

import cls from './sidebar.module.css'

import type { MenuProps } from 'antd'

interface Props {
  routes: MenuProps['items']
}

export const SideBar: React.FC<Props> = (props) => {
  const router = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  }

  const pathname = usePathname()

  const getActiveRouter = (routes: MenuProps['items']) => {
    if (!routes) return []

    return routes.filter((item) => pathname?.includes(String(item?.key)))
  }

  return (
    pathname ? (
      <div className={cls.sidebar_wrapper}>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={['/products/arrivals']}
          defaultOpenKeys={['sub1']}
          selectedKeys={getActiveRouter(props.routes)?.map(item => item?.key as string) ?? []}
          mode="inline"
          items={props.routes}
          className={cls.Menu}
        />
      </div>
    ) : null
  )
}
