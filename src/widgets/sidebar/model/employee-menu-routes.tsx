import { AppstoreOutlined, BarsOutlined, DownloadOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

  type MenuItem = Required<MenuProps>['items'][number];

export const EmployeeSidebarMenuRoutes: MenuItem[] = [
  {
    key: '/admin/storage-requests/',
    label: 'Приход',
    icon: <DownloadOutlined />,
  },
  {
    key: '/admin/products/outgoing',
    label: 'Уход',
    icon: <LogoutOutlined />,
  },
  {
    key: '/products/items',
    label: 'Все товары',
    icon: <AppstoreOutlined />,
  },
  {
    key: '/stock',
    label: 'Остатки товара',
    icon: <BarsOutlined />,
  },
  {
    key: '/history',
    label: 'История',
    icon: <ProfileOutlined />,
  },
]
