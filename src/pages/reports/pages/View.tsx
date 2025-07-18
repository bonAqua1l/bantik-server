'use client'

import React from 'react'

import { UserOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Reports } from '..'
import cls from '../styles/view.module.css'
import AreaChart from '../ui/area-chart/area-chart'
import BarChart from '../ui/bar-chart/bar-chart'
import CardDataStats from '../ui/card-data-stats/card-data-stats'
import DonutChart from '../ui/donut-chart/donut-chart'
import MasterClients from '../ui/master-list/master-list'

export const View = () => {
  const {
    breadcrumbData,
    financialReport,
    leads,
    total_stats,
    masterList,
    clients,
    isLeadsReportLoading,
    isFinancialReportLoading,
    isClientsReportLoading,
    selectedFinancialType,
    selectedFinancialDate,
    selectedClientsDate,
    selectedClientsType,
    selectedLeadsDate,
    selectedLeadsType,
    actions: {
      handleFinancialTypeChange,
      handleFinancialDateChange,
      handleClientsDateChange,
      handleClientsTypeChange,
      handleLeadsDateChange,
      handleLeadsTypeChange,
      getTotalAmount,
      getClients,
      getLeads,
      getTotal,
      getMasterList,
    },
  } = Reports.Hooks.View.use()

  React.useEffect(() => {
    getTotalAmount(selectedFinancialType, selectedFinancialDate, 'day')
    getClients(selectedClientsType, selectedClientsDate)
    getLeads(selectedLeadsType, selectedLeadsDate)
    getTotal()
    getMasterList()
  }, [])

  return (
    <div className="main">
      <Flex align="center" className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
      </Flex>

      <div className={cls.main_title}>
        <h2>Отчетность</h2>
        <Flex>
          <CardDataStats total_stats={total_stats}>
            <UserOutlined style={{ color: 'rgb(60, 80, 224)', fontSize: 18 }}/>
          </CardDataStats>
        </Flex>
      </div>

      <div className={cls.analysis}>
        <Spin spinning={isFinancialReportLoading && isClientsReportLoading && isLeadsReportLoading}>
          <Flex className={cls.chart_flex}>
            <AreaChart
              selectedFinancialType={selectedFinancialType}
              handleFinancialTypeChange={handleFinancialTypeChange}
              handleFinancialDateChange={handleFinancialDateChange}
              financialReport={financialReport}
            />
            <BarChart
              handleLeadsTypeChange={handleLeadsTypeChange}
              handleLeadsDateChange={handleLeadsDateChange}
              leads={leads}
            />
          </Flex>
          <DonutChart
            handleClientsTypeChange={handleClientsTypeChange}
            handleClientsDateChange={handleClientsDateChange}
            clients={clients}
          />
        </Spin>
        <MasterClients masterList={masterList}/>
      </div>
    </div>
  )
}
