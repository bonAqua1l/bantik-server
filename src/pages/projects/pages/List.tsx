'use client'

import React from 'react'

import { BorderlessTableOutlined } from '@ant-design/icons'
import {  Button, Flex, List as ListAntd, Pagination } from 'antd'
import Image from 'next/image'

import { BantikPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { Projects } from '..'
import cls from '../styles/list.module.css'
import ModalCreateProjects from '../ui/modals/ModalCreate/modal-create-projects'

export const List = () => {
  const {
    breadcrumbData,
    services,
    PAGE_SIZE,
    contextHolder,
    defaultDraggerProps,
    form,
    submitted,
    isServiceLoading,
    currentPage,
    actions:{
      createModal,
      ServicesGET,
      router,
      createService,
      handlePageChange,
      setCurrentPage,
    },
  } = Projects.Hooks.List.use()

  React.useEffect(() => {
    ServicesGET()
  }, [])

  return (
    <div>
      <div className="main">
        <Flex className={cls.header}>
          <Breadcrumb items={breadcrumbData}/>
          <Flex className={cls.filter__panel}>
            <Button onClick={createModal.onOpen} className={cls.btn} type="primary">
              Добавить сервисы
            </Button>
          </Flex>
        </Flex>
        <div className={cls.main_title}>
          <h2>Сервисы</h2>
        </div>
        <ListAntd
          size={'small'}
          grid={{
            gutter: 16,
            column: 7,
            xxl: 7,
            xl: 7,
            lg: 4,
            md: 3,
            sm: 2,
            xs: 2,
          }}
          loading={!services?.results}
          dataSource={services?.results}
          renderItem={(item) => (
            <ListAntd.Item
              key={item.id}
              style={{
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: 0,
              }}
            >
              <div onClick={() => router.push(`/admin/projects/${item.id}`)} style={{ borderColor: '#001529' }} className={cls.card}>
                <Flex justify={'center'}>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: '120px' }}
                    className={cls.card_image}
                    src={item.image || BantikPhoto.src}
                    alt={item.name ||  'image'}
                    priority={true}
                  />
                </Flex>
                <div className={cls.card__info}>
                  <h2><BorderlessTableOutlined/> {item.name}</h2>
                  <p>{item.price} сом</p>
                </div>
              </div>
            </ListAntd.Item>
          )}
        />
        <Pagination
          className={cls.pagination}
          total={services?.count}
          current={currentPage}
          pageSize={PAGE_SIZE}
          disabled={isServiceLoading}
          showSizeChanger={false}
          onChange={(page) => {
            setCurrentPage(page)
            handlePageChange(page)
          }}
        />
      </div>
      <ModalCreateProjects
        onCloseModal={createModal.onClose}
        isModalOpen={createModal.isOpen}
        contextHolder={contextHolder}
        createService={createService}
        defaultDraggerProps={defaultDraggerProps}
        form={form}
        submitted={submitted}
      />
    </div>
  )
}
