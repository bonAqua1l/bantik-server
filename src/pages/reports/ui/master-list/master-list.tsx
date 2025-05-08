import React from 'react'

import Image from 'next/image'

import { ReportsTypes } from '../../types'

import cls from './master-list.module.css'

interface Props {
  masterList: ReportsTypes.MasterList[] | null
}

const MasterClients: React.FC<Props> = ({ masterList }) => {
  return (
    <div className={cls.container}>
      <h4 className={cls.title}>Masters</h4>
      <div className={cls.table}>
        <div className={cls.gridHeader}>
          <div className={cls.headerCell}>ФИО</div>
          <div className={`${cls.headerCell} ${cls.cell}`}>Клиенты</div>
          <div className={`${cls.headerCell} ${cls.cell}`}>Прибыль</div>
          <div className={`${cls.headerCell} ${cls.cell} ${cls.hideSm}`}>Продажи</div>
        </div>
        {masterList?.map((item, id) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={cls.row} key={id}>
            <div className={cls.nameCell}>
              <Image src={item.avatar} alt={item.full_name} width={48} height={48} />
              <p className={cls.hideSm}>{item.full_name}</p>
            </div>
            <div className={`${cls.cell} ${cls.visitors}`}>Количество клиентов: {item.total_clients}</div>
            <div className={`${cls.cell} ${cls.revenues}`}>Принес денег: {item.total_earnings}</div>
            <div className={`${cls.cell} ${cls.sales} ${cls.hideSm}`}>Количество записей: {item.total_leads}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MasterClients
