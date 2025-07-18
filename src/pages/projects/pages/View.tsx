'use client'

import React from 'react'

import { Button, Card, Flex } from 'antd'
import Image from 'next/image'

import { BantikPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Projects } from '..'
import Loader from '../../../../app/loading'
import cls from '../styles/view.module.css'

interface Props {
  service_id: number
}

export const View: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    items,
    actions: { router, ServiceIDGET, deleteService },
  } = Projects.Hooks.View.use()

  React.useEffect(() => {
    ServiceIDGET(Number(props.service_id))
  }, [props.service_id, ServiceIDGET])

  if (!items) {
    return <Loader />
  }

  return (
    <div className="main">
      <Flex align="center" className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
        <Flex className={cls.filter__panel}>
          <Button
            danger
            onClick={() => deleteService(Number(props.service_id))}
            className={cls.btn}
          >
            Удалить
          </Button>
        </Flex>
      </Flex>

      <div className={cls.main_title}>
        <h2>{items.is_additional ? 'Дополнительный сервис' : 'Сервис'} “{items.name}”</h2>
      </div>

      <Card style={{ marginTop: 16 }}>
        <Flex className={cls.card_container} align="start" gap={24}>
          <Image
            src={items.image || BantikPhoto.src}
            alt={items.name}
            width={0}
            height={0}
            sizes="100vw"
            className={cls.card_image}
            priority
          />

          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: 8 }}>{items.name}</h2>
            <p style={{ color: '#888' }}>
              Длительность: <b>{items.duration} мин</b>
            </p>
            <p style={{ color: '#888' }}>
              Цена: <b>{parseInt(items.price)} сом</b>
            </p>

            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                onClick={() => {
                  router.push(`/admin/projects/edit/${items.id}/`)
                }}
              >
                Изменить сервис
              </Button>
            </div>
          </div>
        </Flex>
      </Card>

      {items.additional_services.length !== 0 ? (
        <>
          <div className={cls.main_title}>
            <h2>Дополнительные услуги</h2>
          </div>
          <Flex wrap="wrap" gap={16} className={cls.additional_list}>
            {items.additional_services.map((service) => (
              <Card
                key={service.id}
                hoverable
                className={cls.additional_card}
                onClick={() => router.push(`/admin/projects/${service.id}`)}
              >
                <Image
                  src={service.image || BantikPhoto.src}
                  alt={service.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={cls.additional_card_image}
                  priority
                />
                <div className={cls.additional_info}>
                  <h3>{service.name}</h3>
                  <p>{parseInt(service.price)} сом</p>
                </div>
              </Card>
            ))}
          </Flex>
        </>
      ) : null}
    </div>
  )
}
