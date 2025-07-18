import React from 'react'

import { Avatar, Button, Flex, Form, Modal } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import TextArea from 'antd/es/input/TextArea'

import { getRoles } from '@/shared/tools/getRoles'
import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'

import { Employees } from '../..'
import { EmployeeTypes } from '../../types'

import cls from './EmployeeFireModal.module.css'

interface Props {
  user: EmployeeTypes.Item | null
  isModalOpen: boolean
  onCloseModal: () => void
}

const EmployeeFireModal = ({ isModalOpen, onCloseModal, user }: Props) => {
  const { submitted, contextHolder, actions: { employeeFire } } = Employees.Hooks.List.use()

  return (
    <Modal
      rootClassName={cls.modal}
      title="Увольнение сотрудника"
      open={isModalOpen}
      centered={true}
      width="625px"
      onCancel={() => {
        onCloseModal()
      }}
      footer={(
        <Flex className={cls.btns} key={'btns'} gap={10} justify="flex-end">
          <Button onClick={onCloseModal}>Отмена</Button>
          <Button type="primary" htmlType="submit" form="fireEmployee" loading={submitted}>Уволить сотрудника</Button>
        </Flex>
      )}
    >
      {contextHolder}
      <React.Fragment>
        <Flex className={cls.employee_card}>
          <Avatar style={{ backgroundColor: '#FA541C' }} size={45}>{user?.first_name ? user?.first_name[0] : ''}</Avatar>
          <span className={cls.employee_roles}>{getRoles(user?.role ? user?.role : '')}</span>
          <h1 className={cls.employee_name}>{`${user?.first_name} ${user?.last_name}`}</h1>
        </Flex>

        <Form onFinish={async (values) => {
          await employeeFire((user?.uuid ? user?.uuid : ''), values)
          onCloseModal()
        }} id="fireEmployee"
        >
          <Flex className={cls.form} gap={10}>
            <DatePickerField name="termination_date" placeholder="Введите дату увольнение" />
            <DatePickerField name="termination_order_date" placeholder="Введите дату указа увольнение" />
            <FormItem name="termination_reason" noStyle>
              <TextArea placeholder="Введите причину увольнение" />
            </FormItem>
          </Flex>
        </Form>
      </React.Fragment>
    </Modal>
  )
}

export default EmployeeFireModal
