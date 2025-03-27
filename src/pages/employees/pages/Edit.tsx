'use client'

import React from 'react'

import { Button, Flex, Form, Radio } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { LoaderData } from '@/shared/ui/loader/Loader'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Employees } from '..'
import cls from '../styles/edit.module.css'

interface Props {
    employee_id: string
}

export const Edit: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    employee,
    form,
    isEmployeeLoading,
    submitted,
    actions: {
      EmployeeGET,
      EditEmployee,
    },
  } = Employees.Hooks.Edit.use()

  React.useEffect(() => {
    EmployeeGET(props.employee_id)
  }, [])

  return (
    <div className="main">
      <Flex className={cls.employee}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
        </div>

        <Flex className={cls.main_title}>
          <h2>Изменить сотрудника</h2>
        </Flex>

        <LoaderData isLoading={isEmployeeLoading} data={employee}>
          <Flex className={cls.main_form}>
            <Form form={form} className={cls.form} initialValues={{ ...employee }} onFinish={(data) => EditEmployee(props.employee_id, data)}>
              <TextField name="first_name" placeholder="Введите имя пользвотеля" label="Имя сотрудника" />
              <TextField name="last_name" placeholder="Введите фамилию пользвотеля" label="Фамилия сотрудника" />
              <TextField name="surname" placeholder="Введите отчество пользвотеля" label="Отчество сотрудника" />
              <TextField name="email" placeholder="Введите email пользвотеля" label="Email сотрудника" />
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
        </LoaderData>

      </Flex>
    </div>
  )
}
