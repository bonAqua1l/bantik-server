'use client'
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'

import { Avatar, Card, Flex, Spin, Timeline } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { TimetableWorker } from '..'
import cls from '../styles/list.module.css'

export const List = () => {
  const {
    breadcrumbData,
    worker,
    loading,
    myLeads,
    actions: { ServicesGET, MyLedsGet },
  } = TimetableWorker.Hooks.List.use()

  useEffect(() => {
    ServicesGET()
    MyLedsGet()
  }, [])

  console.log(myLeads)

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
      </div>
      <Spin spinning={loading}>
        <div className={cls.content}>
          <div className={cls.workerInfo}>
            <h2 className={cls.servicesTitle}>Работник:</h2>
            <Card className={cls.workerCard}>
              <Flex align="center" gap="1.5rem">
                <Avatar size={80} src={worker?.avatar} />
                <div>
                  <h2 className={cls.workerName}>{`${worker?.last_name ?? ''} ${worker?.first_name ?? ''} ${worker?.surname ?? ''}`}</h2>
                  <p><strong>Телефон:</strong> {worker?.phone_number ?? 'нету'}</p>
                  <p><strong>Email:</strong> {worker?.email}</p>
                </div>
              </Flex>
            </Card>

            <div className={cls.services}>
              <h2 className={cls.servicesTitle}>Услуги:</h2>
              <div className={cls.servicesRow}>
                {worker?.services.map(service => (
                  <Card
                    key={service.id}
                    title={service.name}
                    className={cls.serviceCard}
                    cover={service.image ? <Image width={0} height={0} sizes="100vw" src={service.image} alt={service.name} /> : null}
                  >
                    <p><strong>Длительность:</strong> {service.duration} мин</p>
                    <p><strong>Цена:</strong> {parseInt(service.price)} сом</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <h2 className={cls.servicesTitle}>Расписание работника</h2>
          <div className={cls.scheduleRow}>
            {worker?.schedule.map((item, id) => (
              <div key={id} className={cls.dayColumn}>
                <Card
                  className={cls.dayCard}
                  title={(
                    <div className={cls.dayCardHeader}>
                      <h3 className={cls.dayName}>{item.weekday_name_russian} |</h3>
                      <div className={cls.period}>{item.start_time} - {item.end_time}</div>
                    </div>
                  )}
                >
                  <Timeline className={cls.leadsTimeline}>
                    {myLeads?.map((lead) => (
                      lead.weekday === item.weekday ? (
                        <Timeline.Item key={lead.id}>
                          <Flex vertical gap={8}>
                            <div>Время: {new Date(lead.date_time).toLocaleString()}</div>
                            <div>Клиент: {lead.client_name}</div>
                            <div>Номер телефона: {lead.client.phone}</div>
                            {lead.services.map((item, index) => (
                              <React.Fragment key={index}>
                                <div>{index + 1}. Услуга: {item.name}</div>
                                <div>{index + 1}. Цена: {item.price} сом</div>
                              </React.Fragment>
                            ))}
                            <div>Время: {dayjs(lead.date_time).format('DD.MM.YYYY HH:mm')}</div>
                          </Flex>
                        </Timeline.Item>
                      ) : null
                    ))}
                  </Timeline>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Spin>
    </div>
  )
}
