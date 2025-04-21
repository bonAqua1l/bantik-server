'use client'

import React from 'react'

import { Button, Checkbox, Flex, Form, Select, TimePicker, Space } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import dayjs from 'dayjs'

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
    services,
    contextHolder,
    actions: { EmployeeGET, EditEmployee, getServices },
  } = Employees.Hooks.Edit.use()

  React.useEffect(() => {
    EmployeeGET(props.employee_id)
    getServices()
  }, [])

  const weekdayOptions =
    employee?.schedule.map((s) => ({
      value: s.weekday,
      label: s.weekday_name,
    })) || []

  return (
    <div className="main">
      <Flex className={cls.employee}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData} />
        </div>
        <Flex className={cls.main_title}>
          <h2>Изменить сотрудника</h2>
        </Flex>
        <LoaderData isLoading={isEmployeeLoading} data={employee}>
          <Flex className={cls.main_form}>
            {contextHolder}
            <Form
              form={form}
              className={cls.form}
              initialValues={{
                ...employee,
                services: employee?.services.map((item) => item.id),
                schedule: employee?.schedule.map((item) => ({
                  weekday: item.weekday,
                  time: [
                    dayjs(item.start_time, 'HH:mm:ss'),
                    dayjs(item.end_time, 'HH:mm:ss'),
                  ],
                })),
              }}
              onFinish={EditEmployee}
            >
              <TextField name="first_name" placeholder="Введите имя пользвотеля" label="Имя сотрудника" />
              <TextField name="last_name" placeholder="Введите фамилию пользвотеля" label="Фамилия сотрудника" />
              <TextField name="surname" placeholder="Введите отчество пользвотеля" label="Отчество сотрудника" />
              <TextField name="email" placeholder="Введите email пользвотеля" label="Email сотрудника" />
              <FormItem name="services" label="Выберите сервисы" rules={[{ required: true, message: 'Поле обязательно' }]} className={cls.radio_field}>
                <Checkbox.Group>
                  {services.map((service) => (
                    <Checkbox key={service.id} value={service.id}>{service.name}</Checkbox>
                  ))}
                </Checkbox.Group>
              </FormItem>

              <Flex className={cls.schedule_block}>
                <span className={cls.schedule_label}>График работы</span>
                <Form.List name="schedule">
                  {(fields) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} align="center">
                          <FormItem
                            {...restField}
                            name={[name, 'weekday']}
                            rules={[{ required: true, message: 'День' }]}
                          >
                            <Select options={weekdayOptions} placeholder="День" style={{ width: 150 }} />
                          </FormItem>
                          <FormItem
                            {...restField}
                            name={[name, 'time']}
                            rules={[{ required: true, message: 'Время' }]}
                          >
                            <TimePicker.RangePicker format="HH:mm" minuteStep={5} />
                          </FormItem>
                        </Space>
                      ))}
                    </>
                  )}
                </Form.List>
              </Flex>

              <Button htmlType="submit" type="primary" className={cls.btn} loading={submitted}>Сохранить</Button>
            </Form>
          </Flex>
        </LoaderData>
      </Flex>
    </div>
  )
}
