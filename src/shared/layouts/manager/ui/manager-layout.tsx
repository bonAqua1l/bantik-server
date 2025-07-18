'use client'

import React, { useState } from 'react'

import { MenuOutlined } from '@ant-design/icons'
import { Layout, Drawer, Button, Flex } from 'antd'
import dayjs from 'dayjs'

import { SideBar } from '@/widgets/sidebar'
import { ManagerSidebarMenuRoutes } from '@/widgets/sidebar/model/manager-menu-routes'

import cls from './manager-layout.module.css'

import 'dayjs/locale/ru'

dayjs.locale('ru')

interface Props {
  children: React.ReactNode;
}

export const ManagerLayout: React.FC<Props> = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }

  return (
    <>
      <Layout className={cls.main_layout}>
        <Layout.Sider
          width="270px"
          className={cls.sidebar}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <SideBar routes={ManagerSidebarMenuRoutes} />
        </Layout.Sider>
        <Layout.Content className={cls.content}>
          <Flex justify="space-between" align="center" className={cls.header}>
            <Button
              className={cls.burger_button}
              icon={<MenuOutlined />}
              onClick={showDrawer}
            />
          </Flex>
          {children}
        </Layout.Content>
      </Layout>

      <Drawer
        title="Меню"
        placement="left"
        closable={true}
        onClose={onClose}
        open={drawerVisible}
        className={cls.drawer}
      >
        <SideBar routes={ManagerSidebarMenuRoutes} />
      </Drawer>
    </>
  )
}
