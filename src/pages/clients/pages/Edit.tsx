'use client'

import React from 'react'

import { Button, Flex, Form } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { LoaderData } from '@/shared/ui/loader/Loader'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Clients } from '..'
import cls from '../styles/create.module.css'

interface Props {
  clients_id: string
}

export const Edit: React.FC<Props> = (props) => {
  const { breadcrumbData, contextHolder, form, submitted, clients, clientsLoading,actions: { EditClients, ClientsGET } } = Clients.Hooks.Edit.use()

  React.useEffect(() => {
    ClientsGET(Number(props.clients_id))
  }, [])

  return (
    <div className="main">
      <Flex style={{ flexDirection: 'column', width: 500 }}>
        <Flex align={'center'} justify={'space-between'}>
          <Breadcrumb items={breadcrumbData}/>
          <h2>Изменить клиента</h2>
        </Flex>

        <LoaderData data={clients} isLoading={clientsLoading}>
          <Form form={form} initialValues={{ ...clients }} className={cls.main_form} onFinish={(data) => EditClients(Number(clients?.id), data)}>
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
        </LoaderData>

      </Flex>
    </div>
  )
}
