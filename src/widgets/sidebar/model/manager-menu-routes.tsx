import { AppstoreOutlined, CalendarOutlined, ClockCircleOutlined, TableOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

export const ManagerSidebarMenuRoutes: MenuItem[] = [
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
  {
    key: '/admin/employees/',
    label: 'Мастера',
    icon: <UserOutlined />,
  },
  {
    key: '/admin/clients/',
    label: 'Клиенты',
    icon: <TeamOutlined />,
  },
  {
    key: '/admin/reports',
    label: 'Отчетность',
    icon: <ClockCircleOutlined />,
  },
]
