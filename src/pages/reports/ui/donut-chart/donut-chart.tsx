import React from 'react'

import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { SelectField } from '@/shared/ui/select-field/select-field'

import { ReportsTypes } from '../../types'

import cls from './donut-chart.module.css'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  clients: ReportsTypes.ClientsItem | null
  handleClientsTypeChange: any
  handleClientsDateChange: any
}

const DonutChart: React.FC<Props> = ({ clients, handleClientsDateChange, handleClientsTypeChange }) => {
  const newClients = clients?.data.new_clients ?? 0
  const returningClients = clients?.data.returning_clients ?? 0
  const selectFiedlOption = [{ label: 'Неделя', value: 'week' }, { label: 'Месяц', value: 'month' }, { label: 'День', value: 'day' }]
  const hasData = newClients + returningClients > 0

  const other = hasData ? 1 : 0
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const series = hasData
    ? [newClients, returningClients, other]
    : []
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
    labels: ['Новые клиенты', 'Старые клиенты'],
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: { enabled: false },
    responsive: [
      {
        breakpoint: 2600,
        options: { chart: { width: 380 } },
      },
      {
        breakpoint: 640,
        options: { chart: { width: 200 } },
      },
    ],
    noData: {
      text: 'Данных нет',
      align: 'center',
      verticalAlign: 'middle',
      style: {
        color: '#888',
        fontSize: '14px',
      },
    },

  }

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h5 className={cls.title}>
          Отчёт по клиентам
          <p className={cls.dateRange}>
            {clients?.period.start_date || clients?.period.end_date ? (
              `с ${clients?.period.start_date} по ${clients?.period.end_date}`
            ) : null}
          </p>
        </h5>
        <div className={cls.selectContainer}>
          <SelectField
            defaultValue={'week'}
            options={selectFiedlOption.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            onChange={(value) => handleClientsTypeChange(value)}
            className={cls.fields}
          />
          <DatePickerField
            placeholder="Выберите дату"
            className={cls.fields}
            onChange={(date) => handleClientsDateChange(date)}
            disablePast={false}
          />
        </div>
      </div>

      <div className={cls.chartWrapper}>
        <ReactApexChart options={options} series={hasData ? [newClients, returningClients] : []} type="donut" />
      </div>

      <div className={cls.legend}>
        <div className={cls.legendItem} >
          <span className={`${cls.dot}`} />
          <p className={cls.label}>
            <span>Новые клиенты</span>
            <span>{clients?.data.new_clients}</span>
          </p>
        </div>
        <div className={cls.legendItem} >
          <span className={`${cls.dot}`} />
          <p className={cls.label}>
            <span>Старые клиенты</span>
            <span>{clients?.data.returning_clients}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DonutChart
