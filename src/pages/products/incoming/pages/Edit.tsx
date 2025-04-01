'use client'

import React from 'react'

import { Button, Flex, Form } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { LoaderData } from '@/shared/ui/loader/Loader'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductsIncoming } from '..'
import cls from '../styles/create.module.css'

interface Props {
  lead_id: number
}

export const Edit = ({ lead_id }: Props) => {
  const {
    breadcrumbData,
    userResponsible,
    services,
    submitted,
    form,
    router,
    clients,
    isNotUser,
    incomingItem,
    incomingItemLoading,
    actions: {
      ProductsIncomingUsers,
      createIncoming,
      ServiceGET,
      ClientsGET,
      setIsNotUser,
      getIncomingDetails,
    },
  } = ProductsIncoming.Hooks.Edit.use()

  React.useEffect(() => {
    if (lead_id) {
      ServiceGET()
      ProductsIncomingUsers()
      ClientsGET()
      getIncomingDetails(lead_id)
    }
  }, [lead_id])

  return (
    <div>
      <div className={cls.create}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
        </div>

        <h1 className={cls.main__title}>Редактировать заявку</h1>

        <LoaderData isLoading={incomingItemLoading} data={incomingItem}>
          <Flex vertical className={cls.form}>
            <Form
              id="createIncoming"
              form={form}
              onFinish={(data) => createIncoming(data, lead_id)}
              initialValues={
                {
                  ...incomingItem,
                  client: incomingItem?.client.id,
                  service: incomingItem?.service.id,
                  master: incomingItem?.master.uuid,
                }
              }
            >
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
                />
                <SelectField
                  name="service"
                  className={cls.form__item}
                  placeholder="Выберите сервис"
                  label="Сервис:"
                  options={services?.map(service => ({
                    value: service.id,
                    label: service.name,
                  }))}
                  rules={[{ required: true }]}
                />
              </Flex>

              <Flex gap={10} style={{ marginTop: '20px' }}>
                <Button type="primary" style={{ width: '150px' }} disabled={submitted} htmlType="submit" form="createIncoming">Изменить</Button>
                <Button style={{ width: '150px' }} disabled={submitted} onClick={() => router.push('/admin/products/incoming')}>Отмена</Button>
              </Flex>
            </Form>
          </Flex>
        </LoaderData>
      </div>
    </div>
  )
}
