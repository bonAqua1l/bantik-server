'use client'

import React from 'react'

import { Table, Tag, Flex, Popover, Typography, Button } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { SelectField } from '@/shared/ui/select-field/select-field'

import { ProductsStorageRequest } from '..'
import cls from '../styles/list.module.css'
import { ProductsStorageRequestTypes } from '../types'

const { Paragraph } = Typography

const createColumns = (checkStatus: any, getTagColor: any): ColumnsType<ProductsStorageRequestTypes.Table> => {
  const columns: ColumnsType<ProductsStorageRequestTypes.Table> = [
    {
      title: 'Номер документа',
      dataIndex: 'act',
      key: 'act',
      render: (_, record) => (
        <Link href={`/products/incoming/${record.id}/`} onClick={() => console.log('id', record)}>#{record.act}</Link>
      ),
    },
    {
      title: 'Кол-во товаров',
      dataIndex: 'total_quantity',
      key: 'total_quantity',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getTagColor(status)}>{checkStatus(status)}</Tag>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => {
        const formatted = dayjs(date).format('DD.MM.YYYY')

        return (
          <span>{formatted}</span>
        )
      },
    },
    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Ответственный',
      dataIndex: 'responsible',
      key: 'responsible',
      render: (responsible: ProductsStorageRequestTypes.Responsible) => (
        <Link href={`/users/${responsible.uuid}`}>{`${responsible.first_name} ${responsible.last_name}`}</Link>
      ),
    },
    {
      title: 'Комментарий',
      dataIndex: 'message',
      key: 'message',
      render: (comment: string) => {
        return (
          <Popover overlayClassName={cls.card} className={cls.custom__popover} content={comment}>
            <Paragraph>{!comment ? '' : `${comment.slice(0, 10)}...`}...</Paragraph>
          </Popover>
        )
      },
    },
  ]

  return columns
}

export const List: React.FC = () => {
  const {
    breadcrumbData,
    storageRequestList,
    isStorageRequestLoading,
    type,
    selectedRowKeys,
    submitted,
    actions: {
      StorageRequestGET,
      checkStatus,
      getTagColor,
      setType,
      setSelectedRowKeys,
      StorageRequestApproveIncomingPOST,
      StorageRequestApproveOutgoingPOST,
      StorageRequestCancelIncomingPOST,
      StorageRequestCancelOutgoingPOST,
    },
  } = ProductsStorageRequest.Hooks.List.use()

  React.useEffect(() => {
    StorageRequestGET(type)
  }, [type])

  return (
    <div>
      <div className="main">
        <Flex className={cls.header} align="center" justify="space-between">
          <div className={cls.navigation__info}>
            <Breadcrumb items={breadcrumbData}/>
            <h2>Заявки на склад</h2>
          </div>

          <Flex className={cls.panel} gap={10}>
            <SelectField
              options={
                [
                  { value: 'incoming', label: 'Приход' },
                  { value: 'outgoing', label: 'Уход' },
                ]
              }
              defaultValue={'incoming'}
              className={cls.select_type}
              onChange={(value) => {
                setType(value)
              }}
            />
            <div className={cls.approve}>
              <Button
                disabled={selectedRowKeys.length === 0 || submitted}
                type="primary"
                onClick={() => {
                  if (type === 'incoming') {
                    StorageRequestApproveIncomingPOST(selectedRowKeys)
                  } else {
                    StorageRequestApproveOutgoingPOST(selectedRowKeys)
                  }
                }}
              >
                Принять
              </Button>
            </div>
            <div className={cls.cancel}>
              <Button
                disabled={selectedRowKeys.length === 0}
                type="primary"
                onClick={() => {
                  if (type === 'outgoing') {
                    StorageRequestCancelOutgoingPOST(selectedRowKeys)
                  } else {
                    StorageRequestCancelIncomingPOST(selectedRowKeys)
                  }
                }}
              >
                Отклонить
              </Button>
            </div>
          </Flex>
        </Flex>
        <Table<ProductsStorageRequestTypes.Table>
          columns={createColumns(checkStatus, getTagColor)}
          dataSource={storageRequestList || []}
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
            }
          }
          pagination={false}
          rowClassName={(_, index) => (index % 2 !== 0 ? cls.evenRow : cls.oddRow)}
          expandable={{
            rowExpandable: (record) => record.items && record.items.length > 0,
            expandedRowRender: (record) => (
              <Table
                columns={[
                  { title: 'Товар', dataIndex: 'product_title', key: 'product_title', render: (_, record) => (
                    <Link href={`/product/${record.product.slug}`}>{record.product.title}</Link>
                  ) },
                  { title: 'Количество', dataIndex: 'quantity', key: 'quantity' },
                  { title: 'Цена закупки', dataIndex: 'purchase_price', key: 'purchase_price' },
                  { title: 'Общая стоимость', dataIndex: 'total_price', key: 'total_price' },
                ]}
                dataSource={record.items}
                rowKey={(item) => item.product.slug ? item.product.slug : ''}
                pagination={false}
                size="small"
              />
            ),
          }}
        />
      </div>
    </div>
  )
}
