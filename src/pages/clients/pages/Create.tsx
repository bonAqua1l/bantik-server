'use client'

import React from 'react'

import { Button, Flex, Form } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Clients } from '..'
import cls from '../styles/create.module.css'

export const Create = () => {
  const { breadcrumbData, contextHolder, form, submitted, actions: { CreateClients } } = Clients.Hooks.Create.use()

  return (
    <div className="main">
      <Flex style={{ flexDirection: 'column', width: 500 }}>
        <Flex align={'center'} justify={'space-between'}>
          <Breadcrumb items={breadcrumbData}/>
          <h2>Создать клиента</h2>
        </Flex>

        <Form form={form} className={cls.main_form} onFinish={CreateClients}>
          {contextHolder}
          <TextField
            name="name"
            placeholder="Введите Имя"
            label="Имя"
            rules={[{ required: true, message: 'Поле обязательно' }]}
          />
          <TextField
            name="phone"
            placeholder="Введите номер"
            label="Номер"
            rules={[{ required: true, message: 'Поле обязательно' }]}
          />
          <Button htmlType="submit" type="primary" loading={submitted} style={{ marginTop: 15 }}>
            Сохранить
          </Button>
        </Form>

      </Flex>
    </div>
  )
}
