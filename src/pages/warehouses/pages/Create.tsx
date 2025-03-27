'use client'

import React from 'react'

import { Breadcrumb, Button, Form } from 'antd'

import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Warehouses } from '..'
import cls from '../styles/create.module.css'

export const Create = () => {
  const {
    breadcrumbData,
    form,
    contextHolder,
    submitted,
    actions: {
      createWarehouse,
    },
  } = Warehouses.Hooks.Create.use()

  return (
    <div className={'main'}>
      {contextHolder}
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
        <h1 className={cls.warehouses_title}>Создать новый склад</h1>
      </div>

      <Form form={form} className={cls.form} onFinish={(data) => createWarehouse(data)}>
        <TextField name="title" placeholder="Название склада" label="Введите название склада" />
        <h1 className={cls.image_title}>Выберите картинку для склада</h1>
        <DraggerFileField name="image" maxCount={1} />
        <Button htmlType="submit" type="primary" className={cls.btn} loading={submitted}>Создать</Button>
      </Form>
    </div>
  )
}
