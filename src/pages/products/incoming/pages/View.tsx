'use client'

import React from 'react'

import { EditOutlined, FileOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Tag } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import { NoPhoto } from '@/shared/assets/images'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { LoaderData } from '@/shared/ui/loader/Loader'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsIncoming } from '..'
import cls from '../styles/view.module.css'

interface Props {
  incoming_id: string
}

export const View: React.FC<Props> = ({ incoming_id }) => {
  const {
    breadcrumbData,
    incomingItem,
    incomingItemLoading,
    actions: {
      getIncomingDetails,
      getTagColor,
      checkStatus,
    },
  } = ProductsIncoming.Hooks.View.use()

  React.useEffect(() => {
    if (incoming_id) {
      getIncomingDetails(incoming_id)
    }
  }, [incoming_id])

  return (
    <div>
      <div className="main">
        <LoaderData isLoading={incomingItemLoading} data={incomingItem}>
          <div className={cls.navigation__info}>
            <Breadcrumb items={breadcrumbData}/>

            <Flex className={cls.incoming_header} justify="space-between" align="center">
              <Flex align="center" gap={10} className={cls.incoming_header_title}>
                <h2>Приход товаров #{incomingItem?.act}</h2>

                <span className={cls.incoming_date}>{dayjs(incomingItem?.date).format('DD MMMM YYYY HH:mm')}</span>
                <Tag color={getTagColor(incomingItem?.status ? incomingItem?.status : '')}>{checkStatus(incomingItem?.status ? incomingItem?.status : '')}</Tag>
              </Flex>

              <Flex gap={10} align="center" className={cls.btns}>
                <Button type="primary" icon={<EditOutlined/>} iconPosition="end"><Link href={`/products/incoming/edit/${incomingItem?.id}/`}>Редактировать</Link></Button>
                {/* <Button type="primary" icon={<EditOutlined/>} iconPosition="end" className={cls.edit}>Редактировать</Button> */}
              </Flex>
            </Flex>
          </div>

          <Flex className={cls.incoming_info} vertical>
            <Flex className={cls.incoming_info__block}>
              <h3 className={cls.details_title}>Детали прихода</h3>
            </Flex>

            <Flex className={cls.details_items} vertical gap={10}>
              {
                incomingItem?.items.map((product) => (
                  <Flex className={cls.details_item} key={product.product.slug} gap={10}>
                    <Image src={product.product.first_image?.image ? `${NEXT_PUBLIC_COMPANY_BASE_URL}${product.product.first_image?.image}` : NoPhoto.src} alt={product.product_title} width={150} height={150} className={cls.incoming_product_image} />

                    <Flex className={cls.product_typography} vertical>
                      <Flex className={cls.product_price_title}>
                        <h1 className={cls.product_title}>{product.product_title}</h1>
                      </Flex>

                      <div className={cls.act}>
                        <span className={cls.heading}>Срок годности:</span> {product.product.expiration_date}
                      </div>

                      <div>
                        <span className={cls.heading}>Кол-во:</span> {product.quantity}
                      </div>

                      <div>
                        <span className={cls.heading}>Цена за товар:</span> {product.product.price}
                      </div>

                      <div>
                        <span className={cls.heading}>Общая цена за товар:</span> {product.purchase_price}
                      </div>

                      <Image src={`${NEXT_PUBLIC_COMPANY_BASE_URL}${product.product.barcode}`} className={cls.barcode} alt="barcode" width={120} height={50} />
                    </Flex>
                  </Flex>
                ))
              }
            </Flex>

            <Divider className={cls.divider} />

            <Flex className={cls.total} vertical gap={5}>
              <span className={cls.total_quantity}>
                <span className={cls.heading}>Общее кол-во прихода:</span> {incomingItem?.total_quantity}
              </span>
              <span className={cls.total_quantity}>
                <span className={cls.heading}>Общая цена прихода:</span> {incomingItem?.total_price}
              </span>
            </Flex>
          </Flex>

          <Flex className={cls.docs} vertical>
            <h1 className={cls.details_title}>Документы прихода</h1>

            <Flex className={cls.docs_items} vertical gap={10}>
              {
                incomingItem?.files.map((file, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Flex className={cls.docs_item} key={i} align="center">
                    <Link href={file.file} className={cls.file}>
                      {file.name}
                      <FileOutlined className={cls.file_svg}/>
                    </Link>
                  </Flex>
                ))
              }
            </Flex>
          </Flex>
        </LoaderData>
      </div>
    </div>
  )
}
