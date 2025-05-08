import React from 'react'

import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { SelectField } from '@/shared/ui/select-field/select-field'

import { ReportsTypes } from '../../types'

import cls from './bar-chart.module.css'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  leads: ReportsTypes.LeadItem | null
  handleLeadsTypeChange: any
  handleLeadsDateChange: any
}

const BarChart: React.FC<Props> = ({
  handleLeadsDateChange,
  handleLeadsTypeChange,
  leads,
}) => {
  const series = [
    {
      name: 'Подтверждённые',
      data: [leads?.data.confirmed_leads ?? 0],
    },
    {
      name: 'Неподтверждённые',
      data: [leads?.data.unconfirmed_leads ?? 0],
    },
  ]

  const selectFieldOptions = [
    { label: 'Неделя', value: 'week' },
    { label: 'Месяц', value: 'month' },
  ]

  const options: ApexOptions = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: false,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: '50%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Лиды'],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
    },
    fill: { opacity: 1 },
  }

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <h4 className={cls.title}>Отчёт по лидам</h4>
        <div className={cls.controls}>
          <SelectField
            defaultValue="week"
            options={selectFieldOptions}
            onChange={handleLeadsTypeChange}
            className={cls.fields}
          />
          <DatePickerField
            placeholder="Выберите дату"
            className={cls.fields}
            onChange={handleLeadsDateChange}
          />
        </div>
      </div>
      <div className={cls.chart}>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
    </div>
  )
}

export default BarChart
