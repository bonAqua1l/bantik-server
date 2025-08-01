'use client'

import React from 'react'

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Button, Checkbox, Flex, Form, Input, Select, TimePicker } from 'antd'
import FormItem from 'antd/es/form/FormItem'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { LoaderData } from '@/shared/ui/loader/Loader'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Employees } from '..'
import cls from '../styles/edit.module.css'

interface Props {
  employee_id: string
}

export const Edit: React.FC<Props> = (props) => {
  const {
    defaultDraggerProps,
    breadcrumbData,
    contextHolder,
    form,
    employee,
    services,
    isEmployeeLoading,
    submitted,
    actions: { EmployeeGET, EditEmployee, getServices, getWeekdayOptions },
  } = Employees.Hooks.Edit.use()

  React.useEffect(() => {
    EmployeeGET(props.employee_id)
    getServices()
  }, [EmployeeGET, getServices, props.employee_id])

  // Отладка
  React.useEffect(() => {
  }, [services])

  return (
    <div className="main">
      <Flex vertical className={cls.employee}>
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
              onFinish={(data) => EditEmployee(props.employee_id, data)}
            >
              <TextField
                name="first_name"
                placeholder="Введите имя пользвотеля"
                label="Имя сотрудника"
              />
              <TextField
                name="last_name"
                placeholder="Введите фамилию пользвотеля"
                label="Фамилия сотрудника"
              />
              <TextField
                name="surname"
                placeholder="Введите отчество пользвотеля"
                label="Отчество сотрудника"
              />
              <TextField
                name="email"
                placeholder="Введите email пользвотеля"
                label="Email сотрудника"
              />

              <FormItem
                name="services"
                label="Выберите сервисы"
                rules={[{ required: true, message: 'Поле обязательно' }]}
                className={cls.radio_field}
              >
                <Checkbox.Group>
                  {(services || []).map((service) => (
                    <Checkbox key={service.id} value={service.id}>
                      {service.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </FormItem>

              <DraggerFileField
                name="avatar"
                label="Изменить аватар"
                className={cls.dragger_filed}
                {...defaultDraggerProps}
              />

              <div className={cls.dynamic}>
                <h3>График работы</h3>
                <Form.List name="schedule">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...rest }) => (
                        <Flex key={key} gap={18} align="center" justify="space-between">
                          <Form.Item {...rest} name={[name, 'id']} hidden>
                            <Input />
                          </Form.Item>

                          <Form.Item
                            {...rest}
                            name={[name, 'weekday']}
                            label="День недели"
                            className={cls.formItemField}
                            rules={[{ required: true, message: 'Обязательно' }]}
                          >
                            <Select
                              options={getWeekdayOptions(name)}
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

                          <MinusCircleOutlined onClick={() => remove(name)} className={cls.btn_red} />
                        </Flex>
                      ))}

                      <Flex justify="end">
                        <Button
                          type="default"
                          onClick={() => add()}
                          disabled={(form.getFieldValue('schedule') || []).length >= 7}
                          style={{ marginTop: 25 }}
                        >
                          Добавить <PlusOutlined />
                        </Button>
                      </Flex>
                    </>
                  )}
                </Form.List>
              </div>

              <Button
                htmlType="submit"
                type="primary"
                className={cls.btn}
                loading={submitted}
                style={{ marginTop: 15 }}
              >
                Сохранить
              </Button>
            </Form>
          </Flex>
        </LoaderData>
      </Flex>
    </div>
  )
}
