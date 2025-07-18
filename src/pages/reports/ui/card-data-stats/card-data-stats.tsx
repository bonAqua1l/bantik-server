import React from 'react'

import { ReportsTypes } from '../../types'

import cls from './card-data-stats.module.css'

interface Props {
    children: React.ReactNode
    total_stats: ReportsTypes.TotalStatsItem | null
}

const CardDataStats: React.FC<Props> = ({
  children,
  total_stats,
}) => {
  return (
    <div className={cls.card}>
      <div className={cls.icon}>
        {children}
      </div>
      <h2 className={cls.main_title}>{total_stats?.total_clients}</h2>
      <h3 className={cls.senodary_title}>Все клиенты</h3>
    </div>
  )
}

export default CardDataStats
