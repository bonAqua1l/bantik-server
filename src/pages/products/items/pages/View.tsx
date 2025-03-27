/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'

import { Button, Card, Carousel, Descriptions, Divider, Flex } from 'antd'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { ProductItems } from '..'
import Loader from '../../../../../app/loading'
import cls from '../styles/view.module.css'

interface Props {
    item_slug: string
}

export const ViewProduct: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    itemDetail,
    expanded,
    contextHolder,
    parsedCharacteristics,
    actions: {
      router,
      ProductItemsBySlugGET,
      getFormattedDescription,
      toggleDescription,
      deleteProduct,
    },
  } = ProductItems.Hooks.View.use()

  React.useEffect(() => {
    ProductItemsBySlugGET(String(props.item_slug))
  }, [])

  if (!itemDetail) {
    return <Loader/>
  }

  return (
    <div className="main">
      <div className={cls.page}>
        {contextHolder}
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
          <Flex className={cls.actions_main} justify="space-between" align="center">
            <h2>Товар ”{itemDetail.title}”</h2>
            <div className={cls.actions}>
              <Button onClick={() => router.push(`/products/items/edit/${itemDetail.slug}`)} type="primary">Редактировать</Button>
              <Button onClick={() => deleteProduct(itemDetail.slug)} className={cls.btn_red}>Удалить</Button>
            </div>
          </Flex>
        </div>

        <Divider />

        <div className={cls.mainBlock}>
          <Card className={cls.carouselCard}>
            {itemDetail?.images?.length > 0 ? (
              <Carousel arrows infinite className={cls.carousel}>
                {itemDetail.images.map((img) => (
                  <img
                    src={img.image}
                    alt="Product image"
                    className={cls.image}
                    style={{ objectFit: 'cover' }}
                    key={img.id}
                  />
                ))}
              </Carousel>
            ) : (
              <img
                src={NoPhoto.src}
                alt="Product image"
                className={cls.image}
                style={{ objectFit: 'cover' }}
              />
            )}
          </Card>

          <Card className={cls.infoCard}>
            <Descriptions
              size="middle"
              bordered
              column={1}
            >
              <Descriptions.Item label="Цена">{itemDetail.price} сом</Descriptions.Item>
              <Descriptions.Item label="Описание">
                {getFormattedDescription()}
                {itemDetail.description ? (
                  itemDetail?.description.length > 245 && (
                    <button onClick={toggleDescription} className={'moreButton'}>
                      {expanded ? 'Скрыть' : 'Еще...'}
                    </button>
                  )
                ) : 'У продукта нету описание'}
              </Descriptions.Item>
              <Descriptions.Item label="Срок годности">{itemDetail.expiration_date}</Descriptions.Item>
              <Descriptions.Item label="Склад №">{itemDetail.warehouse}</Descriptions.Item>
              <Descriptions.Item label="Цвета">
                {itemDetail.colors && itemDetail.colors.length > 0 ? (
                  itemDetail.colors.map((color) => (
                    <span
                      key={color.id}
                      style={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: color.hash_code,
                        marginRight: 8,
                      }}
                    />
                  ))
                ) : (
                  'Нет цветов'
                )}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <Divider />

        <Card title="Характеристики" size="small" className={cls.characteristicsBlock}>
          {Object.keys(parsedCharacteristics).length ? (
            <Descriptions size="small" bordered column={1}>
              {parsedCharacteristics.map((characteristic, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Descriptions.Item key={index} label={characteristic.key}>
                  {characteristic.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          ) : (
            <p>Нет дополнительных характеристик</p>
          )}
        </Card>

        <Divider />

        {itemDetail.barcode && (
          <div className={cls.barcodeBlock}>
            <h3>Штрих-код</h3>
            <Flex justify={'center'}>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className={cls.barcode_img}
                src={itemDetail.barcode}
                alt="Barcode"
              />
            </Flex>
          </div>
        )}
      </div>
    </div>
  )
}
