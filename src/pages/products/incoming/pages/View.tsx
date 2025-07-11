'use client'

import React from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Button, Card, Descriptions, Flex, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { LoaderData } from '@/shared/ui/loader/Loader'

import { ProductsIncoming } from '..'
import cls from '../styles/view.module.css'

interface Props {
  incoming_id: number
}

export const View: React.FC<Props> = ({ incoming_id }) => {
  const {
    breadcrumbData,
    incomingItem,
    incomingItemLoading,
    actions: { getIncomingDetails },
  } = ProductsIncoming.Hooks.View.use()

  React.useEffect(() => {
    if (incoming_id) {
      getIncomingDetails(incoming_id)
    }
  }, [incoming_id])

  return (
    <div className={cls.wrapper}>
      <LoaderData isLoading={incomingItemLoading} data={incomingItem}>
        <Flex vertical gap={24}>
          <Breadcrumb items={breadcrumbData} />

          <Card className={cls.headerCard} bodyStyle={{ padding: 24 }}>
            <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
              <Flex align="center" gap={8}>
                <h2 className={cls.title}>
                  Заявка #{incomingItem?.id}
                </h2>
                {incomingItem && (
                  <Tag
                    color={incomingItem.is_confirmed ? 'green' : 'red'}
                    className={cls.statusTag}
                  >
                    {incomingItem.is_confirmed ? 'ПОДТВЕРЖДЕН' : 'НЕ ПОДТВЕРЖДЕН'}
                  </Tag>
                )}
              </Flex>

              <Flex align="center" gap={12} wrap="wrap">
                <Typography.Text className={cls.date}>
                  {dayjs(incomingItem?.created_at).format('DD MMMM YYYY HH:mm')}
                </Typography.Text>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  iconPosition="end"
                  className={cls.actionBtn}
                >
                  <Link href={`/admin/products/incoming/edit/${incomingItem?.id}/`}>Редактировать</Link>
                </Button>
              </Flex>
            </Flex>
          </Card>

          <Card className={cls.detailsCard} bodyStyle={{ padding: 24 }}>
            <Typography.Title level={5} className={cls.detailsTitle}>
              Детали заявки
            </Typography.Title>

            <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 3 }} className={cls.descriptions}>
              <Descriptions.Item label="Клиент">
                <Link href="/admin/clients" className={cls.link}>
                  {incomingItem?.client.name}
                </Link>
              </Descriptions.Item>
              <Descriptions.Item label="Мастер">
                <Link href="/admin/employees" className={cls.link}>
                  {incomingItem?.master.first_name} {incomingItem?.master.last_name}
                </Link>
              </Descriptions.Item>
              <Descriptions.Item label="Сервисы" span={3}>
                <Flex wrap gap={8}>
                  {incomingItem?.services.map((srv) => (
                    <Tag key={srv.id} className={cls.serviceTag}>
                      <Link href={`/admin/projects/${srv.id}`} className={cls.tagLink}>
                        {srv.name}
                        {srv.additional_services.length > 0 &&
                          ` · ${srv.additional_services.map((add) => add.name).join(', ')}`}
                      </Link>
                    </Tag>
                  ))}
                </Flex>
              </Descriptions.Item>
            </Descriptions>

            <Flex justify="flex-end" className={cls.total}>
              <Typography.Text className={cls.totalText}>
                Предоплата: {incomingItem?.prepayment}
              </Typography.Text>
            </Flex>
          </Card>
        </Flex>
      </LoaderData>
    </div>
  )
}
