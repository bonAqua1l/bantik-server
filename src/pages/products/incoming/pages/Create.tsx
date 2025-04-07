'use client'

import React from 'react'

import { Button, Checkbox, Flex, Form } from 'antd'
import FormItem from 'antd/es/form/FormItem'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductsIncoming } from '..'
import cls from '../styles/create.module.css'

export const Create = () => {
  const {
    breadcrumbData,
    userResponsible,
    services,
    submitted,
    form,
    router,
    clients,
    isNotUser,
    contextHolder,
    filteredServices,
    actions: {
      ProductsIncomingUsers,
      createIncoming,
      ServiceGET,
      ClientsGET,
      setIsNotUser,
      setFilteredServices,
    },
  } = ProductsIncoming.Hooks.Create.use()

  React.useEffect(() => {
    ServiceGET()
    ProductsIncomingUsers()
    ClientsGET()
  }, [])

  //commit

  return (
    <div>
      <div className={cls.create}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
        </div>

        <h1 className={cls.main__title}>Создать заявку</h1>

        <Flex vertical className={cls.form}>
          {contextHolder}
          <Form id="createIncoming" form={form} onFinish={(data) => createIncoming(data)}>
            <Flex vertical gap={10} className={cls.inputs}>
              <SelectField
                name="client"
                placeholder="Выберите клиента"
                options={clients?.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                rules={[{ required: isNotUser ? false : true }]}
                label="Клиент"
                onChange={() => {
                  setIsNotUser(false)
                }}
              />

              {
                isNotUser ? (
                  <>
                    <TextField
                      name="phone"
                      type="text"
                      label="Номер телефона клиента"
                      placeholder="Введите номер телефона: 9 цифр (без нуля)"
                      className={cls.form__item}
                      rules={[
                        { required: isNotUser ? true : false, message: 'Введите номер телефона' },
                        { pattern: /^\d{9}$/, message: 'Номер должен содержать ровно 9 цифр' },
                      ]}
                    />

                    <TextField
                      name="client_name"
                      type="text"
                      label="Имя клиента"
                      placeholder="Введите предоплату если она есть"
                      className={cls.form__item}
                      rules={[{ required: isNotUser ? true : false }]}
                    />
                  </>
                ) : null
              }

              <DatePickerField
                name="date_time"
                placeholder="Введите дату"
                label="Дата"
                showTime={true}
                rules={[{ required: true }]}
              />
              <TextField
                name="prepayment"
                type="text"
                label="Предоплата"
                placeholder="Введите предоплату если она есть"
                className={cls.form__item}
              />
              <SelectField
                name="master"
                className={cls.form__item}
                placeholder="Выберите мастера"
                label="Мастер:"
                options={userResponsible?.map(responsible => ({
                  value: responsible.uuid,
                  label: `${responsible.first_name} ${responsible.last_name}`,
                }))}
                rules={[{ required: true }]}
                onChange={(value) => {
                  const selected = userResponsible?.find(master => master.uuid === value)

                  setFilteredServices(selected?.services || [])
                }}
              />
              <FormItem name={'services'} label="Выберите сервисы" rules={[{ required: true, message: 'Поле обязательно' }]} className={cls.radio_field}>
                <Checkbox.Group>
                  {
                    filteredServices?.map((service) => (
                      <Checkbox key={service.id} value={service.id}>{service.name}</Checkbox>
                    ))
                  }
                </Checkbox.Group>
              </FormItem>
            </Flex>

            <Flex gap={10} style={{ marginTop: '20px' }}>
              <Button type="primary" style={{ width: '150px' }} disabled={submitted} htmlType="submit" form="createIncoming">Создать</Button>
              <Button style={{ width: '150px' }} disabled={submitted} onClick={() => router.push('/admin/products/incoming')}>Отмена</Button>
            </Flex>
          </Form>
        </Flex>
      </div>
    </div>
  )
}
