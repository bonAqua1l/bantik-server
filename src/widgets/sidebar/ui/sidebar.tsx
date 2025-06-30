'use client'

import React from 'react'

import {
  AppstoreOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  TableOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

import { useAppDispatch } from '@/shared/hooks/redux'
import { TokenManagerClient } from '@/shared/utils/token-manager/token-manager-client'
import { logout } from '@/store/actions/user'

import cls from './sidebar.module.css'

import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

export const ManagerSidebarMenuRoutes: MenuItem[] = [
  { key: '/admin/projects', label: 'Сервисы', icon: <AppstoreOutlined /> },
  { key: '/admin/storage-requests', label: 'Заявки', icon: <CalendarOutlined /> },
  { key: '/admin/timetable', label: 'Расписание', icon: <TableOutlined /> },
  { key: '/admin/employees/', label: 'Мастера', icon: <UserOutlined /> },
  { key: '/admin/clients/', label: 'Клиенты', icon: <TeamOutlined /> },
  { key: '/admin/reports', label: 'Отчетность', icon: <ClockCircleOutlined /> },
]

interface Props {
  routes: MenuProps['items']
}

export const SideBar: React.FC<Props> = ({ routes }) => {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  }

  const getActiveRouter = (items: MenuProps['items']) =>
    items?.filter((item) => pathname?.includes(String(item?.key))) ?? []

  const onClickLogout = React.useCallback(async () => {
    dispatch(logout())
    await TokenManagerClient.deleteAllTokens()
    const data = await TokenManagerClient.deleteSession()

    if (data.success) {
      window.location.href = '/auth'
    }
  }, [])

  return pathname ? (
    <div className={cls.sidebar_wrapper}>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['/products/arrivals']}
        selectedKeys={getActiveRouter(routes).map((item) => item?.key as string)}
        mode="inline"
        items={routes}
        className={cls.Menu}
      />
      <div className={cls.sidebar_footer}>
        <div className={cls.exit} onClick={onClickLogout}>
          <LogoutOutlined className={cls.svg} />
          <span className={cls.exit_title}>Выход</span>
        </div>
      </div>
    </div>
  ) : null
}
