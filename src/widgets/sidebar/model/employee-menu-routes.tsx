import { TableOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

  type MenuItem = Required<MenuProps>['items'][number];

export const EmployeeSidebarMenuRoutes: MenuItem[] = [
  {
    key: '/admin/timetable-worker',
    label: 'Расписание',
    icon: <TableOutlined />,
  },
]
