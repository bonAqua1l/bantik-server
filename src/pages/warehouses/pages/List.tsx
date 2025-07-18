'use client'

import React from 'react'

import { Button, Flex, List } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

import { LoaderData } from '@/shared/ui/loader/Loader'

import { Warehouses } from '..'
import cls from '../styles/list.module.css'

export const ListWarehouses = () => {
  const {
    isWarehouseLoading,
    warehouses,
    router,
    actions: {
      WarehouseListGET,
    },
  } = Warehouses.Hooks.List.use()

  React.useEffect(() => {
    WarehouseListGET()
  }, [])

  return (
    <LoaderData isLoading={isWarehouseLoading} data={warehouses}>
      <div className="main">
        <Flex justify="space-between" align="center">
          <h1 className={cls.warehouses_title}>Все склады</h1>

          <Link href={'/warehouses/create'}>
            <Button type="primary">Создать склад</Button>
          </Link>
        </Flex>
        <div className={cls.products_main}>
          <List
            size={'small'}
            grid={{
              gutter: 16,
              column: 7,
              xxl: 7,
              xl: 7,
              lg: 4,
              md: 3,
              sm: 2,
              xs: 2,
            }}
            loading={!warehouses}
            dataSource={warehouses ? warehouses : []}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                onClick={() => router.push(`/warehouses/${item.id}`)}
                style={{
                  background: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  padding: 0,
                }}
              >
                <div className={cls.card}>
                  <Flex justify={'center'}>
                    <Image
                      src={'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'}
                      alt={item.title}
                      width={145}
                      height={100}
                      className={cls.card_image}
                    />
                  </Flex>
                  <div className={cls.card__info}>
                    <h2>{item.title}</h2>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </LoaderData>
  )
}
