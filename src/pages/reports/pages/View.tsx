//Просмотр
'use client'

import React from 'react'

import { Button, Card, DatePicker, Flex, Spin } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Reports } from '..'
import cls from '../styles/view.module.css'

const { RangePicker } = DatePicker

export const View = () => {
  const {
    breadcrumbData,
    totalAmount,
    today,
    clients,
    leads,
    loading,
    specials,
    actions: {
      getTotalAmount,
      handleDateChange,
      setToday,
      getClients,
      getLeads,
      setLoading,
      getSpecials,
    },
  } = Reports.Hooks.View.use()

  React.useEffect(() => {
    setLoading(true)
    getTotalAmount()
    getClients()
    getLeads()
    getSpecials().finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <div className="main">
      <Flex align="center" className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
        <Flex className={cls.filter__panel}>
          <Button type="primary" onClick={() => {
            getTotalAmount('day')
            getClients('day')
            getSpecials('day')
            setToday(true)
          }}
          >За сегодня</Button>
          <Button type="primary" onClick={() => {
            getTotalAmount('week')
            getClients('week')
            getSpecials('week')
            getLeads('week')
            setToday(false)
          }}
          >За неделю</Button>
          <Button type="primary" onClick={() => {
            getTotalAmount('month')
            getClients('month')
            getSpecials('month')
            getLeads('month')
            setToday(false)
          }}
          >За месяц</Button>
          <Flex style={{ width: '400px' }}>
            <RangePicker style={{ width: '100%' }} onChange={handleDateChange} />
          </Flex>
        </Flex>
      </Flex>

      <div className={cls.main_title}>
        <h2>Отчетность</h2>
      </div>

      {
        loading ? (
          <Spin/>
        ) : (
          <Flex vertical className={cls.stats} gap={10}>
            <Card>
              <h3 className={cls.title}>Заработанные деньги за {today ? 'сегодня' : 'период'}:</h3>

              <div className={cls.amount}><span className={cls.total}>{totalAmount}</span> с</div>
            </Card>

            <Card>
              <h3 className={cls.title}>Новые клиенты за {today ? 'сегодня' : 'период'}:</h3>

              <div className={cls.amount}>{clients} клиентов</div>
            </Card>

            <Card>
              <h3 className={cls.title}>Среднее кол-во записей</h3>

              <div className={cls.text}>Общее кол-во записей {leads.total_bookings}</div>
              <div className={cls.text}>Дней за период {leads.days_in_period}</div>
              <div className={cls.text}>Среднее кол-во записей в день {leads.average_bookings_per_day}</div>
            </Card>

            <Card>
              <h3 className={cls.title}>Соотношение одобренных и отклоненных записей за период</h3>

              <div className={cls.text}>Общее кол-во записей {specials.total}</div>
              <div className={cls.text}>Кол-во одобренных {specials.approved}</div>
              <div className={cls.text}>Кол-во отклоненных {specials.rejected}</div>
              <div className={cls.text}>Процент одобренных {specials.approval_rate_percent}%</div>
              <div className={cls.text}>Процент отклоненных {specials.rejection_rate_percent}%</div>
            </Card>
          </Flex>
        )
      }
    </div>
  )
}
