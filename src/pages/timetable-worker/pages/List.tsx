'use client'
import React, { useEffect } from 'react'

import { Avatar, Card, Flex, Spin, Timeline } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { TimetableWorker } from '..'
import cls from '../styles/list.module.css'

export const List = () => {
  const {
    breadcrumbData,
    worker,
    loading,
    actions: {
      ServicesGET,
    },
  } = TimetableWorker.Hooks.List.use()

  useEffect(() => {
    ServicesGET()
  }, [])

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
      </div>

      <Spin spinning={loading}>
        <div className={cls.scrollWrapper}>
          <div className={cls.daysRow}>
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
                <Flex wrap="wrap" gap="1rem">
                  {worker?.services.map(service => (
                    <Card
                      key={service.id}
                      title={service.name}
                      className={cls.serviceCard}
                      // eslint-disable-next-line @next/next/no-img-element
                      cover={service.image ? <img src={service.image} alt={service.name} /> : null}
                    >
                      <p><strong>Длительность:</strong> {service.duration} мин</p>
                      <p><strong>Цена:</strong> {parseInt(service.price)} сом</p>
                    </Card>
                  ))}
                </Flex>
              </div>
            </div>

            <h2 className={cls.servicesTitle}>Расписание работника</h2>
            <Flex gap={15} align={'center'}>
              {worker?.schedule.map((item, id) => (
              // eslint-disable-next-line react/no-array-index-key
                <div key={id} className={cls.dayColumn}>
                  <Card
                    className={cls.dayCard}
                    title={(
                      <div className={cls.dayCardHeader}>
                        <h3 className={cls.dayName}>{item.weekday_name_russian}</h3>
                      </div>
                    )}
                  >
                    <Timeline className={cls.leadsTimeline}>
                      <Timeline.Item>
                        <div className={cls.leadInfo}>
                          <div><strong style={{ display: 'block' }}>Начало рабочего дня:</strong> {item.start_time}</div>
                          <div><strong style={{ display: 'block' }}>Конец рабочего дня:</strong> {item.end_time}</div>
                        </div>
                      </Timeline.Item>
                    </Timeline>
                  </Card>
                </div>
              ))}
            </Flex>

          </div>
        </div>
      </Spin>
    </div>
  )
}
