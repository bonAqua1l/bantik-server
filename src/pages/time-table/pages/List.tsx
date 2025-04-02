'use client'

import React, { useEffect } from 'react'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Card, Button, Spin, Timeline, Flex } from 'antd'
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
        <Flex align={'center'} justify={'space-between'}>
          <h1 className={cls.title}>Расписание</h1>
          <Flex gap={8}>
            <SelectField
              placeholder="Выбрать сервис"
              options={services?.map(item => ({
                label: item.name,
                value: item.id,
              }))}
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
          <span className={cls.dateDisplay}>
            {currentDate.format('DD MMMM YYYY')}
          </span>
          <Button icon={<RightOutlined />} onClick={handleNext} />
        </div>
      </div>

      <Spin spinning={loading}>
        <div className={cls.scrollWrapper}>
          <div className={cls.daysRow}>
            {days.map((dayItem) => {
              const { day, date, leads } = dayItem
              const formattedDate = dayjs(date).format('DD MMM YYYY')

              return (
                <div key={date} className={cls.dayColumn}>
                  <Card
                    className={cls.dayCard}
                    title={(
                      <div className={cls.dayCardHeader}>
                        <Link href={`/admin/timetable/${dayItem.date}`}>{day}</Link>
                        <div className={cls.dayDate}>{formattedDate}</div>
                      </div>
                    )}
                  >
                    {!leads?.length && (
                      <div className={cls.noRecords}>
                        Нет записей на этот день
                      </div>
                    )}

                    {leads?.length > 0 && (
                      <Timeline className={cls.leadsTimeline}>
                        {leads.map((lead) => {
                          const time = dayjs(lead.date_time).format('HH:mm')
                          const confirmed = lead.is_confirmed ? 'Да' : 'Нет'

                          return (
                            <Timeline.Item key={lead.id}>
                              <div className={cls.leadInfo}>
                                <div>
                                  <strong>Мастер:</strong> {lead.master.first_name}{' '}
                                  {lead.master.last_name}
                                </div>
                                <div>
                                  <strong>Услуга:</strong> {lead.service.name}
                                </div>
                                <div>
                                  <strong>Подтв.:</strong> {confirmed}
                                </div>
                                <div>
                                  <strong>Время:</strong> {time}
                                </div>
                              </div>
                            </Timeline.Item>
                          )
                        })}
                      </Timeline>
                    )}
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </Spin>
    </div>
  )
}
