'use client'

import React from 'react'

import { Button, Flex, List } from 'antd'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { ProductItems } from '..'
import cls from '../styles/list.module.css'
import ModalCreateItem from '../ui/modal-create-item'

export const ListProducts: React.FC = () => {
  const {
    breadcrumbData,
    productsList,
    createModal,
    actions: {
      ProductsGET,
      router,
    },
  } = ProductItems.Hooks.List.use()

  // TODO перенести useCreateProduct в этот используемый hook
  React.useEffect(() => {
    if (!createModal.isOpen) {
      ProductsGET()
    }
  }, [createModal.isOpen])

  return (
    <div className="main">
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
        <Button className={cls.btn} onClick={createModal.onOpen} type="primary">Создать товар</Button>
      </div>
      <Flex className={cls.filterPanel}>
        <h2>Товары</h2>
      </Flex>
      <div className={cls.products_main}>
        <List
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
          loading={!productsList}
          dataSource={productsList}
          renderItem={(item) => (
            <List.Item
              key={item.slug}
              style={{
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: 0,
              }}
            >
              <div onClick={() => router.push(`/products/items/${item.slug}`)} className={cls.card}>
                <Flex justify={'center'}>
                  <Image
                    width={117}
                    height={106}
                    className={cls.card_image}
                    src={item.first_image?.image || NoPhoto.src}
                    alt={item.title}
                    priority
                  />
                </Flex>
                <div className={cls.card__info}>
                  <h2>{item.title}</h2>
                  <Flex gap={5}>
                    {item.color?.length ? (
                      item.color.map((color: any) => (
                        <div key={color.id} style={{ backgroundColor: color.hash_code }} className={cls.circle_color} />
                      ))
                    ) : (
                      <div className={cls.no_colors}>Нет цветов</div>
                    )}
                  </Flex>
                  <span>{parseInt(item.price)} сом</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <ModalCreateItem
        onCloseModal={createModal.onClose}
        isModalOpen={createModal.isOpen}
      />
    </div>
  )
}
