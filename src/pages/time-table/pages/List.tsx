'use client'

import React from 'react'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Table, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Timetable } from '..'
import cls from '../styles/list.module.css'

export const List = () => {
  const {
    breadcrumbData,
    timetable,
    currentDate,
    loading,
    actions: { TimetableGET, handleNext, handlePrev },
  } = Timetable.Hooks.List.use()

  React.useEffect(() => {
    TimetableGET(currentDate.format('YYYY-MM-DD'))
  }, [])

  const nestedColumns: ColumnsType = [
    {
      title: 'Мастер',
      key: 'master',
      render: (_, record) =>
        `${record.master.first_name} ${record.master.last_name}`,
    },
    {
      title: 'Услуга',
      dataIndex: ['service', 'name'],
      key: 'service',
    },
    {
      title: 'Дата',
      dataIndex: 'date_time',
      key: 'date',
      render: (dateTime) => dayjs(dateTime).format('YYYY-MM-DD'),
    },
    {
      title: 'Время',
      dataIndex: 'date_time',
      key: 'time',
      render: (dateTime) => dayjs(dateTime).format('HH:mm'),
    },
    {
      title: 'Подтверждено',
      dataIndex: 'is_confirmed',
      key: 'is_confirmed',
      render: (confirmed) => (confirmed ? 'Да' : 'Нет'),
    },
  ]

  const columns: ColumnsType = [
    {
      title: 'День недели',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
    },
  ]

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
        <h1 className={cls.title}>Расписание</h1>
        <div className={cls.controls}>
          <Button icon={<LeftOutlined />} onClick={handlePrev} />
          <span className={cls.dateDisplay}>
            {currentDate.format('DD MMMM YYYY')}
          </span>
          <Button icon={<RightOutlined />} onClick={handleNext} />
        </div>
      </div>
      <div className={cls.tableWrapper}>
        <Table
          loading={loading}
          dataSource={timetable?.days}
          columns={columns}
          rowKey="date"
          pagination={false}
          expandable={{
            expandedRowRender: (record) => {
              if (!record.leads || record.leads.length === 0) {
                return (
                  <div className={cls.noRecords}>
                    Нет записей на этот день
                  </div>
                )
              }

              return (
                <Table
                  columns={nestedColumns}
                  dataSource={record.leads}
                  pagination={false}
                  rowKey="id"
                />
              )
            },
          }}
        />
      </div>
    </div>
  )
}
