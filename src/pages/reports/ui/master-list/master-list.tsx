import React from 'react'

import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

import { ReportsTypes } from '../../types'

import cls from './master-list.module.css'

interface Props {
  masterList: ReportsTypes.MasterList[] | null
}

const MasterClients: React.FC<Props> = ({ masterList }) => (
  <div className={cls.container}>
    <h4 className={cls.title}>Мастера</h4>
    <div className={cls.tableWrapper}>
      <div className={cls.table}>
        <div className={cls.gridHeader}>
          <div className={cls.headerCell}>ФИО</div>
          <div className={cls.headerCell}>Клиенты</div>
          <div className={cls.headerCell}>Прибыль</div>
          <div className={cls.headerCell}>Продажи</div>
        </div>
        {masterList?.map((item) => (
          <div className={cls.row} key={item.full_name}>
            <div className={cls.nameCell}>
              <Avatar
                src={item.avatar}
                icon={item.avatar ? undefined : <UserOutlined />}
                alt={item.full_name}
                size={48}
              />
              <p>{item.full_name}</p>
            </div>
            <div className={cls.visitors}>{item.total_clients}</div>
            <div className={cls.revenues}>{item.total_earnings}</div>
            <div className={cls.sales}>{item.total_leads}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default MasterClients
