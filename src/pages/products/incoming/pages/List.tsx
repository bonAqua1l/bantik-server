'use client'

import React from 'react'

import { Table, Pagination, Flex, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
// import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { ProductsIncoming } from '..'
import cls from '../styles/list.module.css'
import { ProductsIncomingTypes } from '../types'

const createColumns = (): ColumnsType<ProductsIncomingTypes.Table> => {
  const columns: ColumnsType<ProductsIncomingTypes.Table> = [
    {
      title: 'ID лида',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <Link href={`/admin/products/incoming/${record.id}/`}>BANTIK-{record.id}</Link>
      ),
    },
    {
      title: 'Клиент',
      dataIndex: 'client_name',
      key: 'client_name',
      render: (_, record) => (
        <span>{record.client.name}</span>
      ),
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, record) => (
        <span>{record.client.phone}</span>
      ),
    },
    {
      title: 'Сервис',
      dataIndex: 'service',
      key: 'service',
      render: (_, record) => (
        <span>{record.service.name}</span>
      ),
    },
    {
      title: 'Предоплата',
      dataIndex: 'prepayment',
      key: 'prepayment',
    },
    {
      title: 'Дата',
      dataIndex: 'date_time',
      key: 'date_time',
      render: (date: string) => {
        const formatted = dayjs(date).format('DD.MM.YYYY')

        return (
          <span>{formatted}</span>
        )
      },
    },
  ]

  return columns
}

export const ListProductsIncoming: React.FC = () => {
  const {
    breadcrumbData,
    productsIncomingList,
    currentPage,
    currentWarehouse,
    isIncomingLoading,
    actions: {
      router,
      ProductsIncomingGET,
      setCurrentPage,
      handlePageChange,
    },
  } = ProductsIncoming.Hooks.List.use()

  React.useEffect(() => {
    ProductsIncomingGET()
  }, [currentWarehouse])

  return (
    <div>
      <div className="main">
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
          <h2>Лиды</h2>
        </div>
        <div className={cls.header}>
          <Flex gap={10} className={cls.filter_and_btn}>
            <Button type="primary" onClick={() => router.push('/admin/products/incoming/create')} className={cls.btn}>Добавить лиды</Button>
          </Flex>
        </div>
        <Table<ProductsIncomingTypes.Table>
          columns={createColumns()}
          dataSource={productsIncomingList?.results || []}
          rowKey={(record) => record.id}
          loading={isIncomingLoading}
          scroll={{ x: 'max-content' }}
          rootClassName={cls.table}
          pagination={false}
          rowClassName={(_, index) => (index % 2 !== 0 ? cls.evenRow : cls.oddRow)}
        />

        <Pagination
          className={cls.pagination}
          total={productsIncomingList?.count}
          current={currentPage}
          pageSize={10}
          onChange={(page) => {
            setCurrentPage(page)
            handlePageChange(page)
          }}
        />
      </div>
    </div>
  )
}
