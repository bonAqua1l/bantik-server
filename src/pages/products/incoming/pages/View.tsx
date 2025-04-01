'use client'

import React from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Button, Divider, Flex } from 'antd'
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
    actions: {
      getIncomingDetails,
    },
  } = ProductsIncoming.Hooks.View.use()

  React.useEffect(() => {
    if (incoming_id) {
      getIncomingDetails(incoming_id)
    }
  }, [incoming_id])

  return (
    <div>
      <div className="main">
        <LoaderData isLoading={incomingItemLoading} data={incomingItem}>
          <div className={cls.navigation__info}>
            <Breadcrumb items={breadcrumbData}/>

            <Flex className={cls.incoming_header} justify="space-between" align="center" style={{ marginTop: '20px' }}>
              <Flex align="center" gap={10} className={cls.incoming_header_title}>
                <h2>Заявка #{incomingItem?.id}</h2>

                <span className={cls.incoming_date}>{dayjs(incomingItem?.created_at).format('DD MMMM YYYY HH:mm')}</span>
              </Flex>

              <Flex gap={10} align="center" className={cls.btns}>
                <Button type="primary" icon={<EditOutlined/>} iconPosition="end"><Link href={`/admin/products/incoming/edit/${incomingItem?.id}/`}>Редактировать</Link></Button>
              </Flex>
            </Flex>
          </div>

          <Flex className={cls.incoming_info} vertical gap={20} style={{ marginTop: '20px' }}>
            <Flex className={cls.incoming_info__block}>
              <h3 className={cls.details_title}>Детали заявки</h3>
            </Flex>

            <Flex className={cls.details_items} vertical gap={10}>
              <Flex className={cls.docs_item} align="center" justify="space-between">
                Клиент:
                <Link href={'#'} className={cls.file}>
                  {incomingItem?.client.name}
                </Link>
              </Flex>

              <Flex className={cls.docs_item} align="center" justify="space-between">
                Мастер:
                <Link href={'#'} className={cls.file}>
                  {incomingItem?.master.first_name} {incomingItem?.master.last_name}
                </Link>
              </Flex>

              <Flex className={cls.docs_item} align="center" justify="space-between">
                Сервис:
                <Link href={'#'} className={cls.file}>
                  {incomingItem?.service.name}
                </Link>
              </Flex>
            </Flex>

            <Divider className={cls.divider} />

            <Flex className={cls.total} vertical gap={5}>
              <span className={cls.total_quantity}>
                <span className={cls.heading}>Предоплата:</span> {incomingItem?.prepayment}
              </span>
            </Flex>
          </Flex>
        </LoaderData>
      </div>
    </div>
  )
}
