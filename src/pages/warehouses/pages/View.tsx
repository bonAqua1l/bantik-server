'use client'

import React from 'react'

import { Breadcrumb, Button, Flex, Spin } from 'antd'

import { Warehouses } from '..'
import cls from '../styles/view.module.css'

interface Props {
    warehouse_id: number
}

export const View = ({ warehouse_id }: Props) => {
  const {
    warehose,
    isWarehouseLoading,
    router,
    submitted,
    actions: {
      WarehouseGET,
      WarehouseDELETE,
    },
  } = Warehouses.Hooks.View.use()

  React.useEffect(() => {
    if (warehouse_id) {
      WarehouseGET(warehouse_id)
    }
  }, [warehouse_id])

  return (
    <div className={'main'}>
      {
        isWarehouseLoading ? (
          <Spin/>
        ) : (
          <>
            <div className={cls.navigation__info}>
              <Breadcrumb items={[]}/>
              <Flex align="center" justify="space-between">
                <h1 className={cls.warehouses_title}>Склад {warehose?.title}</h1>
                <Flex gap={10}>
                  <Button type="primary" onClick={() => router.push(`/warehouses/edit/${warehouse_id}`)}>Редактировать склад</Button>
                  <Button disabled={submitted} danger onClick={() => WarehouseDELETE(warehouse_id)}>Удалить</Button>
                </Flex>
              </Flex>
            </div>
          </>
        )
      }
    </div>
  )
}
