'use client'

import React from 'react'

import { Breadcrumb, Button, Form, Spin } from 'antd'

import { TextField } from '@/shared/ui/textfield/textfield'

import { Warehouses } from '..'
import cls from '../styles/create.module.css'

interface Props {
    warehouse_id: number
}

export const Edit = ({ warehouse_id }: Props) => {
  const {
    breadcrumbData,
    form,
    contextHolder,
    submitted,
    isWarehouseLoading,
    warehouse,
    actions: {
      editWarehouse,
      WarehouseGET,
    },
  } = Warehouses.Hooks.Edit.use()

  React.useEffect(() => {
    if (warehouse_id) {
      WarehouseGET(warehouse_id)
    }
  }, [warehouse_id])

  return (
    <div className={'main'}>
      {contextHolder}
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
        <h1 className={cls.warehouses_title}>Редактировать склад</h1>
      </div>

      {
        isWarehouseLoading ? (
          <Spin/>
        ) : (
          <Form form={form} className={cls.form} onFinish={(data) => editWarehouse(data, warehouse_id)} initialValues={warehouse ? warehouse : undefined}>
            <TextField name="title" placeholder="Название склада" label="Введите название склада" />
            <Button htmlType="submit" type="primary" className={cls.btn} loading={submitted}>Изменить</Button>
          </Form>
        )
      }
    </div>
  )
}
