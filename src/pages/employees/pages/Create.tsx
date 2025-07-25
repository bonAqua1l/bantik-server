'use client'
/* eslint-disable react/no-array-index-key */

import React from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Select, TimePicker } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Employees } from '..'
import cls from '../styles/create.module.css'

export const Create = () => {
  const {
    breadcrumbData,
    defaultDraggerProps,
    submitted,
    contextHolder,
    services,
    form,
    handleServiceScroll,
    servicesHasMore,
    servicesLoading,
    getWeekdayOptions,
    actions: { CreateEmployee, getServices },
  } = Employees.Hooks.Create.use()

  React.useEffect(() => {
    getServices()
  }, [getServices])

  return (
    <div className="main">
      <Flex className={cls.employee}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData} />
        </div>

        <Flex className={cls.main_title} style={{ margin: '15px 0' }}>
          <h2>Создать сотрудника</h2>
        </Flex>

        <Flex className={cls.main_form}>
          {contextHolder}
          <Form form={form} className={cls.form} onFinish={CreateEmployee}>
            <TextField name="first_name" placeholder="Введите имя пользвотеля" label="Имя сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <TextField name="last_name" placeholder="Введите фамилию пользвотеля" label="Фамилия сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <TextField name="surname" placeholder="Введите отчество пользвотеля" label="Отчество сотрудника" />
            <TextField name="email" placeholder="Введите email пользвотеля" label="Email сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <TextField type="password" name="password" placeholder="Пароль" label="Пароль сотрудника" rules={[{ required: true, message: 'Поле обязательно' }]} />
            <TextField name="about" placeholder="Введите описание" label="О мастере" />
            <SelectField
              name="services"
              label="Выберите сервисы"
              placeholder="Выберите сервисы"
              mode="multiple"
              options={services.map((s) => ({ value: s.id, label: s.name }))}
              rules={[{ required: true, message: 'Поле обязательно' }]}
              loading={servicesLoading}
              dropdownStyle={servicesHasMore ? undefined : { overflowY: 'hidden' }}
              onPopupScroll={servicesHasMore ? handleServiceScroll : undefined}
              style={{ height: 'auto' }}
            />
            <DraggerFileField
              name="avatar"
              label="Изменить аватар"
              className={cls.dragger_filed}
              {...defaultDraggerProps}
            />

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
                          <Select options={getWeekdayOptions(name)} placeholder="День" style={{ width: 150 }} />
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

            <Button htmlType="submit" type="primary" className={cls.btn} loading={submitted} style={{ marginTop: 15 }}>
              Сохранить
            </Button>
          </Form>
        </Flex>
      </Flex>
    </div>
  )
}
