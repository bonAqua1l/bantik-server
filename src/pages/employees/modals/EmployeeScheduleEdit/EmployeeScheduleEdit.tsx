'use client'

import React from 'react'

import { Button, Flex, Form, Modal, Tag, TimePicker } from 'antd'
import { FormInstance } from 'antd/es/form'
import dayjs from 'dayjs'

import { EmployeeTypes } from '../../types'

import cls from './EmployeeScheduleEdit.module.css'

interface Props {
  schedule: EmployeeTypes.Schedule | null
  isModalOpen: boolean
  onCloseModal: () => void
  form: FormInstance
  onFinish: any
  submitted: boolean
  contextHolder: React.ReactNode
}

const EmployeeScheduleEdit: React.FC<Props> = ({
  isModalOpen,
  onCloseModal,
  schedule,
  form,
  onFinish,
  submitted,
  contextHolder,
}) => {
  return (
    <Modal
      rootClassName={cls.modal}
      title="Изменение графика работы"
      open={isModalOpen}
      centered
      width="625px"
      onCancel={onCloseModal}
      footer={(
        <Flex className={cls.btns} key="btns" gap={10} justify="flex-end">
          <Button onClick={onCloseModal}>Отмена</Button>
          <Button
            type="primary"
            htmlType="submit"
            form="scheduleForm"
            loading={submitted}
          >
            Сохранить
          </Button>
        </Flex>
      )}
    >
      {contextHolder}

      <Form
        id="scheduleForm"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          time: schedule
            ? [
              dayjs(schedule.start_time, 'HH:mm:ss'),
              dayjs(schedule.end_time, 'HH:mm:ss'),
            ]
            : undefined,
        }}
      >
        <Flex className={cls.form} gap={10}>
          <Form.Item label="День недели">
            <Tag>{schedule?.weekday_name}</Tag>
          </Form.Item>

          <Form.Item
            name="time"
            label="Время"
            rules={[{ required: true, message: 'Укажите время' }]}
          >
            <TimePicker.RangePicker format="HH:mm" minuteStep={5} />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  )
}

export default EmployeeScheduleEdit
