'use client'

import React from 'react'

import { Button, Checkbox, Flex, Form } from 'antd'
import FormItem from 'antd/es/form/FormItem'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Employees } from '..'
import cls from '../styles/create.module.css'

export const Create = () => {
  const {
    breadcrumbData,
    submitted,
    contextHolder,
    services,
    actions: {
      CreateEmployee,
      getServices,
    },
  } = Employees.Hooks.Create.use()

  React.useEffect(() => {
    getServices()
  }, [])

  return (
    <div className="main">
      <Flex className={cls.employee}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
        </div>

        <Flex className={cls.main_title} style={{ margin: '15px 0px' }}>
          <h2>Создать сотрудника</h2>
        </Flex>

        <Flex className={cls.main_form}>
          {contextHolder}
          <Form className={cls.form} onFinish={(data) => CreateEmployee(data)}>
            <TextField name="first_name" placeholder="Введите имя пользвотеля" label="Имя сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <TextField name="last_name" placeholder="Введите фамилию пользвотеля" label="Фамилия сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <TextField name="surname" placeholder="Введите отчество пользвотеля" label="Отчество сотрудника" />
            <TextField name="email" placeholder="Введите email пользвотеля" label="Email сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <FormItem name={'services'} label="Выберите сервисы" rules={[{ required: true, message: 'Поле обязательно' }]} className={cls.radio_field}>
              <Checkbox.Group>
                {
                  services.map((service) => (
                    <Checkbox key={service.id} value={service.id}>{service.name}</Checkbox>
                  ))
                }
              </Checkbox.Group>
            </FormItem>
            <Button htmlType="submit" type="primary" className={cls.btn} loading={submitted} style={{ marginTop: '15px' }}>Сохранить</Button>
          </Form>
        </Flex>

      </Flex>
    </div>
  )
}
