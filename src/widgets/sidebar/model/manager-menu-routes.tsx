import { AppstoreOutlined, DownloadOutlined, LogoutOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

export const ManagerSidebarMenuRoutes: MenuItem[] = [
  {
    key: '/admin/products/incoming',
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
