'use client'

import React from 'react'

import { Table, Tag, Flex, Button, Pagination } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { ProductsStorageRequest } from '..'
import cls from '../styles/list.module.css'
import { ProductsStorageRequestTypes } from '../types'

const columns: ColumnsType<ProductsStorageRequestTypes.Table> = [
  {
    title: 'Номер заказа',
    dataIndex: 'id',
    key: 'id',
    render: (id: number) => (
      <Link href={`/admin/products/incoming/${id}/`}>
        #{id}
      </Link>
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
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
    render: (_, record) => (
      <span>{record.client.phone}</span>
    ),
  },
  {
    title: 'Дата/время',
    dataIndex: 'date_time',
    key: 'date_time',
    render: (date: string) => {
      const formatted = dayjs(date).format('DD.MM.YYYY HH:mm')

      return <span>{formatted}</span>
    },
  },
  {
    title: 'Аванс',
    dataIndex: 'prepayment',
    key: 'prepayment',
  },
  {
    title: 'Подтвержден',
    dataIndex: 'is_confirmed',
    key: 'is_confirmed',
    render: (isConfirmed: boolean) => (
      <Tag color={isConfirmed === null ? 'gray' : typeof isConfirmed === 'boolean' && isConfirmed ? 'green' : 'red'}>
        {isConfirmed === null ? 'Не обработан' : typeof isConfirmed === 'boolean' && isConfirmed ? 'Да' : 'Нет'}
      </Tag>
    ),
  },
  {
    title: 'Создано',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (date: string) => {
      const formatted = dayjs(date).format('DD.MM.YYYY HH:mm')

      return <span>{formatted}</span>
    },
  },
  {
    title: 'Услуга',
    dataIndex: 'service',
    key: 'service',
    render: (services: { id: number; name: string }) => (
      <div>
        <Link href={`/admin/projects/${services.id}`}>{services.name}</Link>
      </div>
    ),
  },
  {
    title: 'Мастер',
    dataIndex: 'master',
    key: 'master',
    render: (master: { uuid: string; first_name: string; last_name: string }) => (
      <Link href={`/users/${master.uuid}`}>
        {`${master.first_name} ${master.last_name}`}
      </Link>
    ),
  },
]

export const List: React.FC = () => {
  const {
    breadcrumbData,
    storageRequestList,
    isStorageRequestLoading,
    selectedRowKeys,
    submitted,
    currentPage,
    actions: {
      router,
      StorageRequestGET,
      setCurrentPage,
      setSelectedRowKeys,
      StorageRequestApproveIncomingPOST,
      handlePageChange,
      StorageRequestCancelIncomingPOST,
    },
  } = ProductsStorageRequest.Hooks.List.use()

  React.useEffect(() => {
    StorageRequestGET()
  }, [])

  console.log(storageRequestList?.results)

  return (
    <div>
      <div className="main">
        <Flex className={cls.header} align="center" justify="space-between" style={{ marginBottom: '15px' }}>
          <div className={cls.navigation__info}>
            <Breadcrumb items={breadcrumbData}/>
            <h2>Заявки</h2>
          </div>

          <Flex className={cls.panel} gap={10}>
            <div className={cls.approve}>
              <Button
                disabled={selectedRowKeys.length === 0 || submitted}
                type="primary"
                onClick={() => StorageRequestApproveIncomingPOST(selectedRowKeys)}
              >
                Принять
              </Button>
            </div>
            <Button
              disabled={selectedRowKeys.length === 0 || submitted}
              danger
              onClick={() => StorageRequestCancelIncomingPOST(selectedRowKeys)}
            >
              Отклонить
            </Button>
            <Button type="primary" onClick={() => router.push('/admin/products/incoming/create')} className={cls.btn}>Добавить заявку</Button>
          </Flex>
        </Flex>
        <Table<ProductsStorageRequestTypes.Table>
          columns={columns}
          dataSource={storageRequestList?.results || []}
          rowKey={(record) => record.id}
          loading={isStorageRequestLoading}
          scroll={{ x: 'max-content' }}
          rootClassName={cls.table}
          rowSelection={
            {
              type: 'checkbox',
              onChange: (selectedRowKey) => {
                setSelectedRowKeys(selectedRowKey)
              },
              getCheckboxProps: (record) => ({
                disabled: record.is_confirmed !== null,
              }),
            }
          }
          pagination={false}
          rowClassName={(_, index) => (index % 2 !== 0 ? cls.evenRow : cls.oddRow)}
        />

        <Pagination
          className={cls.pagination}
          total={storageRequestList?.count}
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
