'use client'

import React from 'react'

import { Card, Col, Flex, Row, Spin } from 'antd'
import Title from 'antd/lib/typography/Title'
import dayjs from 'dayjs'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Timetable } from '..'
import cls from '../styles/view.module.css'

interface Props {
    timetable_date: string
}

export const View = ({ timetable_date }: Props) => {
  const {
    breadcrumbData,
    loading,
    timetable,
    actions: {
      TimetableGET,
      formatRussianDate,
    },
  } = Timetable.Hooks.View.use()

  console.log(timetable_date)

  React.useEffect(() => {
    TimetableGET(timetable_date)
  }, [timetable_date])

  return (
    <div className={cls.main}>
      <Spin spinning={loading}>
        <Flex style={{ flexDirection: 'column' }}>
          <Breadcrumb items={breadcrumbData} />

          <Title level={2} className={cls.headerTitle}>
            {formatRussianDate(timetable?.date, timetable?.day)}
          </Title>
        </Flex>

        <div className={cls.leadsContainer}>
          <Row gutter={[16, 16]}>
            {timetable?.leads?.map((lead) => {
              const time = dayjs(lead.date_time).format('HH:mm')

              return (
                <Col xs={24} sm={12} md={8} lg={6} key={lead.id}>
                  <Card
                    hoverable
                    className={cls.leadCard}
                    title={<span className={cls.leadTitle}>Клиент: {lead.client_name}</span>}
                  >
                    <div className={cls.leadInfo}>
                      <span style={{ fontWeight: 'bold' }}>Телефон:</span> <span>{lead.phone}</span>
                    </div>
                    <div className={cls.leadInfo}>
                      <span style={{ fontWeight: 'bold' }}>Услуга:</span> <Link href={`/admin/projects/${lead.service.id}`}><span>{lead.service.name}</span></Link>
                    </div>
                    <div className={cls.leadInfo}>
                      <span style={{ fontWeight: 'bold' }}>Цена:</span> <span>{parseInt(lead.service.price)} сом</span>
                    </div>
                    <div className={cls.leadInfo}>
                      <span style={{ fontWeight: 'bold' }}>Время:</span> <span>{time}</span>
                    </div>
                    <div className={cls.leadInfo}>
                      <span style={{ fontWeight: 'bold' }}>Длительность:</span> <span>{lead.service.duration} мин</span>
                    </div>
                    <div className={cls.leadInfo}>
                      <span style={{ fontWeight: 'bold' }}>Мастер:</span>{' '}
                      <span>{lead.master.first_name} {lead.master.last_name}</span>
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>
      </Spin>
    </div>
  )
}
