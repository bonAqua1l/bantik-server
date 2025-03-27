'use client'

import React from 'react'

import { Button, Flex, Form, Radio } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Employees } from '..'
import cls from '../styles/create.module.css'

export const Create = () => {
  const {
    breadcrumbData,
    submitted,
    actions: {
      CreateEmployee,
    },
  } = Employees.Hooks.Create.use()

  return (
    <div className="main">
      <Flex className={cls.employee}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
        </div>

        <Flex className={cls.main_title}>
          <h2>Создать сотрудника</h2>
        </Flex>

        <Flex className={cls.main_form}>
          <Form className={cls.form} onFinish={(data) => CreateEmployee(data)}>
            <TextField name="first_name" placeholder="Введите имя пользвотеля" label="Имя сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <TextField name="last_name" placeholder="Введите фамилию пользвотеля" label="Фамилия сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <TextField name="surname" placeholder="Введите отчество пользвотеля" label="Отчество сотрудника" />
            <TextField name="email" placeholder="Введите email пользвотеля" label="Email сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <Form.Item name={'role'} label="Выберите роль" rules={[{ required: true, message: 'Поле обязательно' }]} className={cls.radio_field}>
              <Radio.Group>
                <Radio value={'manager'}>Менеджер</Radio>
                <Radio value={'worker'}>Работник</Radio>
                <Radio value={'director'}>Директор</Radio>
              </Radio.Group>
            </Form.Item>
            <Button htmlType="submit" type="primary" className={cls.btn} loading={submitted}>Сохранить</Button>
          </Form>
        </Flex>

      </Flex>
    </div>
  )
}
