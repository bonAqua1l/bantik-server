'use client'
/* eslint-disable no-unused-vars */

import React from 'react'

import { Button, Flex, Pagination, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Clients } from '..'
import cls from '../styles/list.module.css'
import { ClientsTypes } from '../types'

const createColumns = () => {
  const columns: ColumnsType<ClientsTypes.Item> = [
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => (
        <a href={`tel:${record.phone}`}>{record.phone}</a>
      ),
    },
    {
      title: 'Дата отправки',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => (
        <span>{dayjs(record.created_at).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: 'Общ. сумма',
      dataIndex: 'total_sum',
      key: 'total_sum',
      render: (_, record) => (
        <span>{record.total_sum} сом</span>
      ),
    },
    {
      title: 'Кол. посещений',
      dataIndex: 'visits_count',
      key: 'visits_count',
    },
  ]

  return columns
}

export const List = () => {
  const {
    breadcrumbData,
    clients,
    currentPage,
    clientsLoading,
    actions: {
      router,
      ClientsGET,
      handlePageChange,
      setCurrentPage,
    },
  } = Clients.Hooks.List.use()

  React.useEffect(() => {
    ClientsGET()
  }, [])

  console.log('clients', clients)

  return (
    <div className="main">
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
      </div>

      <Flex className={cls.main_title} justify="space-between" align="center" style={{ margin: '15px 0px' }}>
        <h2>Клиенты</h2>

        <Button type="primary" onClick={() => router.push('/admin/employees/create/')}>Создать клиента</Button>
      </Flex>

      <Table
        rowKey={(record) => record.id}
        columns={createColumns()}
        dataSource={clients?.results}
        loading={clientsLoading}
        pagination={false}
        scroll={{ x: 900 }}
      />

      <Pagination
        className={cls.pagination}
        total={clients?.count}
        current={currentPage}
        pageSize={10}
        onChange={(page) => {
          setCurrentPage(page)
          handlePageChange(page)
        }}
      />

    </div>
  )
}
