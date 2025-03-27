import {
  AppstoreOutlined, CalendarOutlined,
  DownloadOutlined, LogoutOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

export const ManagerSidebarMenuRoutes: MenuItem[] = [
  {
    key: '/storage',
    label: 'Салоны',
    icon: <TableOutlined />,
  },
  {
    key: '/products/incoming',
    label: 'Лиды',
    icon: <DownloadOutlined />,
  },
  {
    key: '/products/outgoing',
    label: 'Продажи',
    icon: <LogoutOutlined />,
  },
  {
    key: '/products/items',
    label: 'Записи',
    icon: <AppstoreOutlined />,
  },
]
