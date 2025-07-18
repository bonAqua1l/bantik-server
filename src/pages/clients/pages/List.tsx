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

const createColumns = (router: any, deleteClient: any) => {
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
    {
      title: 'Действие',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Flex gap={15}>
          <Button onClick={() => router.push(`/admin/clients/edit/${record.id}`)}>Изменить</Button>

          <Button onClick={() => deleteClient(record.id)}>Удалить</Button>
        </Flex>
      ),
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
      deleteClient,
    },
  } = Clients.Hooks.List.use()

  React.useEffect(() => {
    ClientsGET()
  }, [])

  return (
    <div className="main">
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
      </div>

      <Flex className={cls.main_title} justify="space-between" align="center" style={{ margin: '15px 0px' }}>
        <h2>Клиенты</h2>

        <Button type="primary" onClick={() => router.push('/admin/clients/create/')}>Создать клиента</Button>
      </Flex>

      <Table
        rowKey={(record) => record.id}
        columns={createColumns(router, deleteClient)}
        dataSource={clients?.results}
        loading={clientsLoading}
        pagination={false}
        scroll={{ x: 900 }}
      />

      <Flex justify={'end'}>
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
      </Flex>

    </div>
  )
}
