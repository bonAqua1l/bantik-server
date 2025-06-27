'use client'

import React from 'react'

import { Button, Flex, Form, Radio } from 'antd'
import dayjs from 'dayjs'

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

export const Edit: React.FC<Props> = ({ lead_id }) => {
  const {
    breadcrumbData,
    services,
    setSelectedServiceIds,
    availableDates,
    selectedDate,
    setSelectedDate,
    masterOptions,
    setSelectedMaster,
    timeOptions,
    selectedTime,
    setSelectedTime,
    submitted,
    form,
    router,
    clients,
    isNotUser,
    setIsNotUser,
    contextHolder,
    updateIncoming,
    incomingItemLoading,
    incomingItem,
    getIncomingDetails,
  } = ProductsIncoming.Hooks.Edit.use()

  React.useEffect(() => {
    if (lead_id) getIncomingDetails(lead_id)
  }, [lead_id, getIncomingDetails])

  return (
    <div className={cls.create}>
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData} />
      </div>

      <h1 className={cls.main__title}>Редактировать заявку</h1>

      <LoaderData isLoading={incomingItemLoading} data={incomingItem}>
        <Flex vertical className={cls.form}>
          {contextHolder}
          <Form id="editIncoming" form={form} onFinish={updateIncoming}>
            <Flex vertical gap={10} className={cls.inputs}>
              <SelectField
                name="service"
                placeholder="Выберите услуги"
                mode="multiple"
                options={services.map((s) => ({ value: s.id, label: s.name }))}
                label="Услуги"
                rules={[{ required: true }]}
                onChange={(v) => setSelectedServiceIds(v)}
              />

              <SelectField
                name="client"
                placeholder="Выберите клиента"
                options={clients.map((c) => ({ label: c.name, value: c.id }))}
                rules={[{ required: !isNotUser }]}
                label="Клиент"
                onChange={() => setIsNotUser(false)}
              />

              {isNotUser && (
                <>
                  <TextField
                    name="phone"
                    type="text"
                    label="Номер телефона клиента"
                    placeholder="Введите номер телефона: 9 цифр (без нуля)"
                    className={cls.form__item}
                    rules={[
                      { required: true, message: 'Введите номер телефона' },
                      { pattern: /^\d{9}$/, message: 'Номер должен содержать ровно 9 цифр' },
                    ]}
                  />
                  <TextField
                    name="client_name"
                    type="text"
                    label="Имя клиента"
                    placeholder="Введите имя клиента"
                    className={cls.form__item}
                    rules={[{ required: true }]}
                  />
                </>
              )}

              <DatePickerField
                name="date"
                placeholder="Выберите дату"
                label="Дата"
                showTime={false}
                allowedDates={availableDates}
                disabled={!availableDates.length}
                rules={[{ required: true }]}
                onChange={(d) => setSelectedDate(d ? d.format('YYYY-MM-DD') : null)}
                initialValue={selectedDate ? dayjs(selectedDate) : undefined}
              />

              <SelectField
                name="master"
                placeholder="Выберите мастера"
                label="Мастер"
                className={cls.form__item}
                options={masterOptions}
                rules={[{ required: true }]}
                disabled={!masterOptions.length}
                onChange={(v) => setSelectedMaster(v)}
              />

              <Form.Item
                name="time"
                label="Время"
                rules={[{ required: true, message: 'Выберите время' }]}
                help={!timeOptions.length && selectedDate ? 'На выбранный день нет свободного времени' : undefined}
                validateStatus={!timeOptions.length && selectedDate ? 'error' : undefined}
              >
                <Radio.Group
                  className={cls.radio_field}
                  options={timeOptions}
                  optionType="button"
                  buttonStyle="solid"
                  disabled={!timeOptions.length}
                  value={selectedTime ?? undefined}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </Form.Item>

              <TextField
                name="prepayment"
                type="text"
                label="Предоплата"
                placeholder="Введите предоплату если она есть"
                className={cls.form__item}
              />
            </Flex>

            <Flex gap={10} style={{ marginTop: 20 }}>
              <Button type="primary" style={{ width: 150 }} disabled={submitted} htmlType="submit">
                Изменить
              </Button>
              <Button
                style={{ width: 150 }}
                disabled={submitted}
                onClick={() => router.push('/admin/products/incoming')}
              >
                Отмена
              </Button>
            </Flex>
          </Form>
        </Flex>
      </LoaderData>
    </div>
  )
}
