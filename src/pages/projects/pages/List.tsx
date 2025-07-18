'use client'

import React from 'react'

import {  SortAscendingOutlined } from '@ant-design/icons'
import { Badge, Button, Flex, List as ListAntd, Pagination } from 'antd'
import Image from 'next/image'

import { BantikPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { SearchField } from '@/shared/ui/search-field/search-field'

import { Projects } from '..'
import cls from '../styles/list.module.css'
import ModalCreateProjects from '../ui/modals/ModalCreate/modal-create-projects'

export const List = () => {
  const {
    breadcrumbData,
    services,
    PAGE_SIZE,
    defaultDraggerProps,
    form,
    submitted,
    isServiceLoading,
    currentPage,
    isAlphabetical,
    actions:{
      createModal,
      ServicesGET,
      router,
      createService,
      handlePageChange,
      setCurrentPage,
      handleServiceSearch,
      toggleAlphabetical,
    },
  } = Projects.Hooks.List.use()

  React.useEffect(() => {
    ServicesGET()
  }, [])

  const displayedResults = React.useMemo(() => {
    if (!services?.results) return []
    const results = [...services.results]

    if (isAlphabetical) {
      results.sort((a, b) => a.name.localeCompare(b.name))
    }

    return results
  }, [services, isAlphabetical])

  return (
    <div>
      <div className="main">
        <Flex className={cls.header}>
          <Breadcrumb items={breadcrumbData}/>
        </Flex>
        <div className={cls.main_title}>
          <h2>Сервисы</h2>
          <Flex className={cls.filter__panel}>
            <div>
              <SearchField onChange={(e) => handleServiceSearch(e)}/>
            </div>
            <Button onClick={toggleAlphabetical} className={cls.btn} icon={<SortAscendingOutlined />} type={isAlphabetical ? 'primary' : 'default'}>
              A-Z
            </Button>
            <Button onClick={createModal.onOpen} className={cls.btn} type="primary">
              Добавить сервисы
            </Button>
          </Flex>
        </div>
        <ListAntd
          size="small"
          grid={{
            gutter: 30,
            column: 5,
            xxl: 5,
            xl: 5,
            lg: 4,
            md: 3,
            sm: 2,
            xs: 2,
          }}
          loading={isServiceLoading}
          dataSource={displayedResults}
          renderItem={(item) => (
            <ListAntd.Item key={item.id} style={{ padding: 0 }}>
              <Badge
                dot={item.additional_services.length! > 0}
                offset={[ -2, 2 ]}
              >

                <div onClick={() => router.push(`/admin/projects/${item.id}`)} className={cls.card}>
                  <div className={cls.card_image_wrap}>
                    <Image
                      src={item.image || BantikPhoto.src}
                      alt={item.name || 'image'}
                      fill
                      sizes="100vw"
                      className={cls.card_image}
                      priority={true}
                    />
                  </div>
                  <div className={cls.card__info}>
                    <div className={cls.card__title}>
                      {item.name}
                    </div>
                    <div className={cls.card__price}>
                      {parseInt(item.price)} сом
                    </div>
                  </div>
                </div>
              </Badge>
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
        createService={createService}
        defaultDraggerProps={defaultDraggerProps}
        form={form}
        submitted={submitted}
        services={services}
      />
    </div>
  )
}
