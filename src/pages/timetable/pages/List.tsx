'use client'

import React, { useEffect } from 'react'

import { LeftOutlined, RightOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Button, Card, Flex, Spin } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { SelectField } from '@/shared/ui/select-field/select-field'

import { Timetable } from '..'
import cls from '../styles/list.module.css'

export const List = () => {
  const {
    breadcrumbData,
    currentDate,
    loading,
    services,
    servicesLoading,
    employee,
    days,
    actions: {
      TimetableGET,
      ServicesGET,
      handleNext,
      handlePrev,
      getEmployeesList,
      handleServiceChange,
      handleMasterChange,
      handleServiceSearch,
      handleServiceScroll,
      router,
    },
  } = Timetable.Hooks.List.use()

  useEffect(() => {
    TimetableGET(currentDate.format('YYYY-MM-DD'))
    ServicesGET()
    getEmployeesList()
  }, [])

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
        <Flex style={{ marginTop: 18 }} align="center" justify="space-between" wrap="wrap" gap={16}>
          <h1 className={cls.title}>Расписание</h1>
          <Flex gap={8} wrap="wrap">
            <SelectField
              placeholder="Выбрать сервис"
              options={services.map(item => ({ label: item.name, value: item.id }))}
              showSearch
              filterOption={false}
              loading={servicesLoading}
              onSearch={handleServiceSearch}
              onPopupScroll={handleServiceScroll}
              onChange={handleServiceChange}
            />
            <SelectField
              placeholder="Выбрать мастера"
              options={employee?.map(item => ({
                value: item.uuid,
                label: `${item.first_name} ${item.last_name}`,
              }))}
              onChange={handleMasterChange}
            />
          </Flex>
        </Flex>

        <div className={cls.controls}>
          <Button icon={<LeftOutlined />} onClick={handlePrev} />
          <span className={cls.dateDisplay}>{currentDate.format('DD MMMM YYYY')}</span>
          <Button icon={<RightOutlined />} onClick={handleNext} />
        </div>
      </div>

      <Spin spinning={loading}>
        <div className={cls.scrollWrapper}>
          <div className={cls.daysRow}>
            {days.map(({ day, date, leads }) => (
              <div key={date} className={cls.dayColumn}>
                <h3 className={cls.dayHeader}>
                  <span className={cls.dayHeaderSpan} onClick={() => router.push(`/admin/timetable/${date}`)}>{day}</span>
                  <span className={cls.dayDate}>{dayjs(date).format('DD MMM YYYY')}</span>
                </h3>

                {!leads.length && <div className={cls.noRecords}>Нет записей</div>}

                {leads.map(lead => {
                  const time = dayjs(lead.date_time).format('HH:mm')
                  const confirmed = lead.is_confirmed
                  const icon = confirmed ? (
                    <CheckCircleFilled className={cls.successIcon} />
                  ) : (
                    <CloseCircleFilled className={cls.errorIcon} />
                  )

                  return (
                    <Card key={lead.id} className={cls.leadCard}>
                      <Flex gap={8} align="flex-start">
                        {icon}
                        <Flex vertical gap={4} className={cls.leadBody}>
                          <Flex justify="space-between" align="center">
                            <Link
                              href="/admin/employees/"
                              className={cls.masterLink}
                            >
                              {lead.master.first_name} {lead.master.last_name}
                            </Link>
                            {/* <Tag color={confirmed ? 'green' : 'volcano'}>
                              {confirmed ? 'Подтверждено' : 'Не подтверждено'}
                            </Tag> */}
                          </Flex>

                          <Flex vertical gap={2}>
                            {lead.services.map(item => (
                              <Link
                                key={item.id}
                                href={`/admin/projects/${item.id}`}
                                className={cls.serviceLink}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </Flex>

                          <div className={cls.time}>{time}</div>
                        </Flex>
                      </Flex>
                    </Card>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </Spin>
    </div>
  )
}
