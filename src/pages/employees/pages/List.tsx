/* eslint-disable no-unused-vars */
'use client'

import React from 'react'

import { Avatar, Button, Flex, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { getFullName } from '@/shared/tools/getFullName'
import { getRoles } from '@/shared/tools/getRoles'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Employees } from '..'
import EmployeeFireModal from '../modals/EmployeeFireModal/EmployeeFireModal'
import cls from '../styles/list.module.css'
import { EmployeeTypes } from '../types'

const createColumns = (handleSelectedEmployee: (employee: EmployeeTypes.Item) => void, onOpenFireModal: () => void, router: any, deleteUser: any) => {
  const columns: ColumnsType<EmployeeTypes.Item> = [
    {
      title: 'ФИО',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (_, record) => (
        <Flex align="center">
          {record.avatar ? (
            <Avatar className={cls.avatar} src={record.avatar} size={32}/>
          ) : (
            <Avatar style={{ backgroundColor: '#001529' }} size={32}>{record.first_name ? record.first_name[0] : ''}</Avatar>
          )}
          <span style={{ marginLeft: 8 }}>{getFullName(record.first_name, record.last_name, record.surname)}</span>
        </Flex>
      ),
    },
    {
      title: 'Должность',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => (
        <span>{getRoles(record.role)}</span>
      ),
    },
    {
      title: 'Действие',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Flex gap={15}>
          <Button onClick={() => router.push(`/admin/employees/edit/${record.uuid}`)}>Изменить</Button>

          <Button onClick={() => deleteUser(record.uuid)}>Удалить</Button>
        </Flex>
      ),
    },
  ]

  return columns
}

export const List = () => {
  const {
    isEmployeesLoading,
    employees,
    breadcrumbData,
    fireEmployeeModal,
    selectedEmployee,
    actions: {
      getEmployeesList,
      handleSelectedEmployee,
      router,
      deleteUser,
    },
  } = Employees.Hooks.List.use()

  React.useEffect(() => {
    getEmployeesList()
  }, [])

  return (
    <div className="main">
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
      </div>

      <Flex className={cls.main_title} justify="space-between" align="center" style={{ margin: '15px 0px' }}>
        <h2>Мастера</h2>

        <Button type="primary" onClick={() => router.push('/admin/employees/create/')}>Добавить мастера</Button>
      </Flex>

      <Table
        rowKey="uuid"
        columns={createColumns(handleSelectedEmployee, fireEmployeeModal.onOpen, router, deleteUser)}
        dataSource={employees ? employees : []}
        loading={isEmployeesLoading}
        pagination={{ position: ['bottomRight'] }}
        scroll={{ x: 900 }}
      />

      <EmployeeFireModal isModalOpen={fireEmployeeModal.isOpen} onCloseModal={fireEmployeeModal.onClose} user={selectedEmployee} />
    </div>
  )
}
