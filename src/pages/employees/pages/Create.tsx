'use client'
/* eslint-disable react/no-array-index-key */

import React from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Select, TimePicker } from 'antd'
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
    weekdayData,
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
            <TextField name="about" placeholder="Введите описание" label="О мастере" />
            <FormItem name={'services'} label="Выберите сервисы" rules={[{ required: true, message: 'Поле обязательно' }]} className={cls.radio_field}>
              <Checkbox.Group>
                {
                  services.map((service) => (
                    <Checkbox key={service.id} value={service.id}>{service.name}</Checkbox>
                  ))
                }
              </Checkbox.Group>
            </FormItem>
            <TextField type="password" name="password" placeholder="Пароль" label="Пароль сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <div>
              <h3>График работы</h3>
              <Form.List name="schedule">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...rest }) => (
                      <Flex key={key} gap={18} align="flex-end" justify="space-between">
                        <Form.Item
                          {...rest}
                          name={[name, 'weekday']}
                          label="День недели"
                          className={cls.formItemField}
                          rules={[{ required: true, message: 'Обязательно' }]}
                        >
                          <Select
                            options={weekdayData.map((d) => ({
                              value: d.weekday,
                              label: d.weekday_name,
                            }))}
                            placeholder="День"
                            style={{ width: 150 }}
                          />
                        </Form.Item>

                        <Form.Item
                          {...rest}
                          name={[name, 'time']}
                          label="Время"
                          className={cls.formItemField}
                          rules={[{ required: true, message: 'Обязательно' }]}
                        >
                          <TimePicker.RangePicker format="HH:mm" minuteStep={5} />
                        </Form.Item>

                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          className={cls.btn_red}
                          style={{ display: fields.length ? 'initial' : 'none' }}
                        />
                      </Flex>
                    ))}

                    <Flex justify="end">
                      <Button
                        type="default"
                        onClick={() => add()}
                        disabled={fields.length >= 7}
                        style={{ marginTop: 25 }}
                      >
                        Добавить <PlusOutlined />
                      </Button>
                    </Flex>
                  </>
                )}
              </Form.List>

            </div>
            <Button htmlType="submit" type="primary" className={cls.btn} loading={submitted} style={{ marginTop: '15px' }}>Сохранить</Button>
          </Form>
        </Flex>

      </Flex>
    </div>
  )
}
