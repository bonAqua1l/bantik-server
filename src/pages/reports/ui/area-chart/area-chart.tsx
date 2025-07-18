'use client'
import React from 'react'

import { ApexOptions } from 'apexcharts'
import dynamic from 'next/dynamic'

import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { SelectField } from '@/shared/ui/select-field/select-field'

import { ReportsTypes } from '../../types'

import cls from './area-chart.module.css'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface Props {
  financialReport: ReportsTypes.FinancialReportItem | null
  handleFinancialTypeChange: any
  handleFinancialDateChange: any
  selectedFinancialType: string;
}

const AreaChart: React.FC<Props> = ({ financialReport, handleFinancialTypeChange, selectedFinancialType, handleFinancialDateChange }) => {
  const categories = financialReport?.data.map(item => item.date.split('-')[2]) || []
  const series = [{ name: 'Общая сумма',data: financialReport?.data.map(item => item.total_amount) || [] }]
  const selectFiedlOption = [{ label: 'Неделя', value: 'week' }, { label: 'Месяц', value: 'month' }, { label: 'Четверть', value: 'quarter' }]
  const options: ApexOptions = {
    legend: {
      show: false,
    },
    colors: ['#3C50E0'],
    chart: {
      type: 'area',
      height: 335,
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      curve: 'straight',
      width: 2,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      fillOpacity: 1,
      hover: {
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories,
      labels: {
        show: selectedFinancialType === 'quarter' ? false : true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
    },
  }

  return (
    <div className={cls.container}>
      <div className={cls.topSection}>
        <div className={cls.legend}>
          <div className={cls.legendItem}>
            <div className={cls.details}>
              <p className={cls.titlePrimary}>Отчёт по суммам</p>
              <p className={cls.dateRange}>
                {financialReport?.period.start_date || financialReport?.period.end_date ? (
                  `с ${financialReport?.period.start_date} по ${financialReport?.period.end_date}`
                ) : null}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={cls.rangeButtons}>
            <SelectField
              defaultValue={'month'}
              options={selectFiedlOption.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              onChange={(value) => handleFinancialTypeChange(value)}
              className={cls.fields}
            />
            <DatePickerField
              placeholder="Выберите дату"
              className={cls.fields}
              onChange={(date) => handleFinancialDateChange(date)}
              disablePast={false}
            />
          </div>
        </div>
      </div>
      <div className={cls.chartWrapper}>
        <div id="chartOne" className={cls.chart}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width="100%"
          />
        </div>
      </div>
    </div>
  )
}

export default AreaChart
