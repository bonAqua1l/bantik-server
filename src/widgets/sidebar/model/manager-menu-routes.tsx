import { AppstoreOutlined, CalendarOutlined, DownloadOutlined, LogoutOutlined, TableOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];
// commit

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
    key: '/admin/projects',
    label: 'Сервисы',
    icon: <AppstoreOutlined />,
  },
  {
    key: '/admin/storage-requests',
    label: 'Заявки',
    icon: <CalendarOutlined />,
  },
  {
    key: '/admin/timetable',
    label: 'Расписание',
    icon: <TableOutlined />,
  },
]
