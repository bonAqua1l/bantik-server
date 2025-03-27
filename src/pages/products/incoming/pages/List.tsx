'use client'

import React from 'react'

import { Table, Tag, Popover, Typography, Pagination } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
// import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { ProductsIncoming } from '..'
import cls from '../styles/list.module.css'
import { ProductsIncomingTypes } from '../types'

const { Paragraph } = Typography

const createColumns = (checkStatus: any, getTagColor: any): ColumnsType<ProductsIncomingTypes.Table> => {
  const columns: ColumnsType<ProductsIncomingTypes.Table> = [
    {
      title: 'ID прихода',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <Link href={`/products/incoming/${record.id}/`}>QSTR-{record.id}</Link>
      ),
    },
    {
      title: 'Номер документа',
      dataIndex: 'act',
      key: 'act',
      render: (_, record) => (
        <Link href={`${record.document}`}>#{record.act}</Link>
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
      render: (responsible: ProductsIncomingTypes.Responsible) => (
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
      checkStatus,
      setCurrentPage,
      getTagColor,
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
        <Table<ProductsIncomingTypes.Table>
          columns={createColumns(checkStatus, getTagColor)}
          dataSource={productsIncomingList?.results || []}
          rowKey={(record) => record.id}
          loading={isIncomingLoading}
          scroll={{ x: 'max-content' }}
          rootClassName={cls.table}
          pagination={false}
          rowClassName={(_, index) => (index % 2 !== 0 ? cls.evenRow : cls.oddRow)}
          expandable={{
            rowExpandable: (record) => record.items && record.items.length > 0,
            expandedRowRender: (record) => (
              <Table
                columns={[
                  { title: 'Товар', dataIndex: 'product_title', key: 'product_title', render: (_, record) => (
                    <Link href={`/products/items/${record.product.slug}`}>{record.product_title}</Link>
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
