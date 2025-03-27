'use client'

import React from 'react'

import { Breadcrumb, Button, Flex, Form, InputNumber, Space, Spin, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { UploadFile } from 'antd/lib'
import Image from 'next/image'
import Link from 'next/link'

import { NoPhoto } from '@/shared/assets/images'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { SearchField } from '@/shared/ui/search-field/search-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductsIncoming } from '..'
import { ProductsItemsTypes } from '../../items/types'
import cls from '../styles/create.module.css'
import { ProductsIncomingTypes } from '../types'
import ModalCreateIncomingItem from '../ui/modals/modal-create-incoming-product'
import { InputRules } from '../validate'

const createProductsColumn = () => {
  const columns: ColumnsType<ProductsItemsTypes.Item> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => (
        <Space>
          <Image
            src={record.first_image?.image || NoPhoto.src}
            alt={record.title}
            style={{ objectFit: 'cover' }}
            width={50}
            height={40}
            className={cls.table_image}
          />
          <Link href={`/products/items/${record.slug}/`}>{record.title}</Link>
        </Space>
      ),
    },
    {
      title: 'Срок годности',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
    {
      title: 'Штрих код',
      dataIndex: 'barcode',
      key: 'barcode',
      render: (_, record) => (
        <Image
          src={record.barcode || NoPhoto.src}
          alt={record.title}
          style={{ objectFit: 'cover' }}
          width={100}
          height={40}
          className={cls.table_image}
        />
      ),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
  ]

  return columns
}

const createSelectedProductsColumns = (setSelectedProducts: any) => {
  const handleQuantityChange = (value: number | null, record: ProductsIncomingTypes.SelectedItem) => {
    setSelectedProducts((prev: any[]) =>
      prev.map((item) =>
        item.product === record.product ? { ...item, quantity: value ?? 0 } : item,
      ),
    )
  }

  const handlePriceChange = (value: number | null, record: ProductsIncomingTypes.SelectedItem) => {
    setSelectedProducts((prev: any[]) =>
      prev.map((item) =>
        item.product === record.product ? { ...item, purchase_price: value ?? 0 } : item,
      ),
    )
  }

  const columns: ColumnsType<ProductsIncomingTypes.SelectedItem> = [
    {
      title: 'Товар',
      dataIndex: 'product_title',
      key: 'product_title',
      render: (_, record) => (
        <Link href={`/products/${record.product}/`}>{record.product_title}</Link>
      ),
    },
    {
      title: 'Количество товара',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <InputNumber
          min={0}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(value, record)}
          placeholder="0"
        />
      ),
    },
    {
      title: 'Цена закупки',
      dataIndex: 'purchase_price',
      key: 'purchase_price',
      render: (_, record) => (
        <InputNumber
          min={0}
          value={Number(record.purchase_price)}
          onChange={(value) => handlePriceChange(value, record)}
          placeholder="0"
        />
      ),
    },
    {
      title: 'Общая стоимость',
      dataIndex: 'sum',
      key: 'sum',
      render: (_, record) => {
        const totalPrice = Number(record.purchase_price) * Number(record.quantity)

        return <span>{totalPrice ? totalPrice : 0} сом.</span>
      },

    },
  ]

  return columns
}

interface Props {
  incoming_id: number
}

export const Edit = ({ incoming_id }: Props) => {
  const {
    form,
    incoming,
    isIncomingLoading,
    isProductsLoading,
    products,
    userResponsible,
    createModal,
    submitted,
    breadcrumbData,
    defaultDraggerProps,
    selectedProducts,
    contextHolder,
    user,
    actions: {
      IncomingIdGET,
      ProductsGET,
      ProductsIncomingUsersGET,
      handleSearchProducts,
      handlePageChange,
      setSelectedProducts,
      onSelectProducts,
      editIncoming,
      deleteFiles,
    },
  } = ProductsIncoming.Hooks.Edit.use()

  React.useEffect(() => {
    if (incoming_id) {
      IncomingIdGET(incoming_id)
      if (user?.role !== 'worker') {
        ProductsIncomingUsersGET()
      }
    }
  }, [incoming_id])

  // TODO перенести useCreateProduct в этот используемый hook
  React.useEffect(() => {
    if (!createModal.isOpen) {
      ProductsGET()
    }
  }, [createModal.isOpen])

  return (
    <div>
      {contextHolder}
      <div className={cls.create}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
        </div>

        <h1 className={cls.main__title}>Редактировать приход товаров</h1>

        {
          isIncomingLoading ? (
            <Spin/>
          ) : (
            <Flex vertical className={cls.form}>
              <Form
                id="editIncoming"
                form={form}
                onFinish={(data) => editIncoming(data, incoming_id)}
                initialValues={{
                  ...incoming,
                  responsible: {
                    title: incoming?.responsible.first_name,
                    value: `${incoming?.responsible.first_name} ${incoming?.responsible.last_name}`,
                    userObj: incoming?.responsible,
                  },
                }}
              >
                <Flex className={cls.products} vertical gap={20}>
                  <Flex gap={20} vertical className={cls.selected_products_table}>
                    <h1 className={cls.products__title}>Выбрано товаров: <span className={cls.counter}>{selectedProducts.length} товаров</span></h1>

                    <Table
                      columns={createSelectedProductsColumns(setSelectedProducts)}
                      dataSource={selectedProducts}
                      rowKey={(record) => record.product ? record.product : ''}
                      scroll={{ x: 'max-content' }}
                      rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: selectedProducts.map((item) => item.product),
                      }}
                      pagination={false}
                      rootClassName={`${selectedProducts.length > 0 ? cls.selected_table_has : cls.selected_table}`}
                    />
                  </Flex>

                  <Flex gap={20} className={cls.products_table} vertical>
                    <Flex className={cls.products_header} justify="space-between" align="center">
                      <Flex align="center" gap={20} className={cls.search_and_title}>
                        <h1 className={cls.products__title}>Товары:</h1>

                        <SearchField onChange={(e) => handleSearchProducts(e)} />
                      </Flex>

                      <Flex gap={15} className={cls.create_btn}>
                        <Button onClick={createModal.onOpen} className={cls.filter_btn} type="primary">Создать товар</Button>
                      </Flex>
                    </Flex>

                    <Table
                      columns={createProductsColumn()}
                      dataSource={products?.results ? products.results : []}
                      loading={isProductsLoading}
                      scroll={{ x: 'max-content' }}
                      rowKey={(record) => record.slug ? record.slug : ''}
                      rowSelection={{
                        type: 'checkbox',
                        onChange: onSelectProducts,
                        selectedRowKeys: selectedProducts.map((item) => item.product),
                      }}
                      pagination={{
                        position: ['bottomRight'],
                        pageSize: 10,
                        onChange: handlePageChange,
                      }}
                      rootClassName={cls.products_table_main}
                    />
                  </Flex>
                </Flex>

                <Flex vertical gap={10} className={cls.inputs}>
                  <TextField
                    name="act"
                    type="text"
                    label="Номер документа:"
                    placeholder="Введите номер"
                    className={cls.form__item}
                    rules={InputRules.DocumentNumber}
                  />
                  <TextField
                    name="supplier"
                    type="text"
                    label="Поставщик:"
                    placeholder="Введите поставщика"
                    className={cls.form__item}
                    rules={InputRules.Field}
                  />
                  <TextField
                    name="message"
                    type="text"
                    label="Комментарий"
                    placeholder="Введите комментарий для прихода"
                    className={cls.form__item}
                  />
                  {
                    user?.role !== 'worker' && (
                      <SelectField
                        name="responsible"
                        className={cls.form__item}
                        placeholder="Выберите ответственного"
                        label="Ответственный:"
                        options={userResponsible?.map(responsible => ({
                          title: responsible.first_name,
                          value: `${responsible.first_name} ${responsible.last_name}`,
                          userObj: responsible,
                        }))}
                        rules={InputRules.Field}
                      />
                    )
                  }

                  <DraggerFileField
                    name="files"
                    valuePropName="fileList"
                    {...defaultDraggerProps}
                    className={cls.dragger_filed}
                    onRemove={(file) => deleteFiles(+(file as UploadFile & { id: string }).id)}
                  />
                </Flex>

                <Flex gap={10}>
                  <Button type="primary" style={{ width: '150px' }} disabled={submitted} htmlType="submit" form="editIncoming">Изменить</Button>
                  <Button style={{ width: '150px' }} disabled={submitted}>Отмена</Button>
                </Flex>
              </Form>
            </Flex>
          )
        }

      </div>
      <ModalCreateIncomingItem
        onCloseModal={createModal.onClose}
        isModalOpen={createModal.isOpen}
      />
    </div>
  )
}
