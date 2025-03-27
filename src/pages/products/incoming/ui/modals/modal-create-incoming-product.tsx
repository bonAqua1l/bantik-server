'use client'

import React from 'react'

import { Button, Divider, Flex, Form, Modal } from 'antd'

import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { DynamicField } from '@/shared/ui/dynamic-field/dynamic-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductsIncoming } from '../..'
import { InputRules } from '../../validate'

import cls from './modal-create-incoming-product.module.css'

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const ModalCreateIncomingItem: React.FC<Props> = ({ isModalOpen, onCloseModal }) => {
  const {
    contextHolder,
    submitted,
    form,
    isCreated,
    productsColorsList,
    defaultDraggerProps,
    actions: { createProduct, ProductsColorsGET },
  } = ProductsIncoming.Hooks.CreateProduct.use()

  React.useEffect(() => {
    if (isCreated) {
      onCloseModal()
    }
  }, [isCreated, onCloseModal])

  React.useEffect(() => {
    ProductsColorsGET()
  }, [ProductsColorsGET])

  return (
    <Modal
      className={cls.modal}
      classNames={{
        header: cls.modal__header,
        body: cls.modal__body,
        footer: cls.modal__footer,
      }}
      title="Добавить товар"
      width="800px"
      open={isModalOpen}
      centered
      onCancel={onCloseModal}
      okButtonProps={{ style: { display: 'none' } }}
      footer={[
        <Button disabled={submitted} onClick={onCloseModal} key="back">Отмена</Button>,
        <Button
          form="createProducts"
          htmlType="submit"
          type="primary"
          key="submit"
          loading={submitted}
          style={{ boxShadow: 'none', border: 'none' }}
        >
          Создать
        </Button>,
      ]}
    >
      {contextHolder}
      <Divider className={cls.divider} />
      <Form
        id="createProducts"
        className={cls.form}
        form={form}
        onFinish={createProduct}
      >
        <TextField
          name="title"
          type="text"
          label="Название продукта"
          placeholder="Введите название продукта"
          rules={InputRules.Field}
          className={cls.form__item}
        />
        <TextField
          name="price"
          type="number"
          label="Цена"
          placeholder="Введите цену"
          rules={InputRules.Field}
          className={cls.form__item}
        />
        <TextField
          name="description"
          type="text"
          label="Описание"
          placeholder="Введите описание продукта"
          className={cls.form__item}
        />
        <DatePickerField
          name="expiration_date"
          label="Срок годности"
          placeholder="Укажите срок годности товара"
          className={cls.form__item}
        />
        <SelectField
          name="color"
          label="Цвет"
          placeholder="Выберите цвет"
          className={cls.form__item}
          options={productsColorsList?.map(color => ({
            title: color.name,
            value: color.id,
            label: (
              <Flex className={cls.color_picker_main} gap={5}>
                <div>{color.name}</div>
                <div className={cls.color_square} style={{ background: `${color.hash_code}` }}/>
              </Flex>
            ),
          }))}
        />
        <DynamicField
          listName="characteristics"
          className={cls.form__item}
          buttonAddLabel="Добавить характеристики"
          rules={InputRules.Field}
        />
        <DraggerFileField
          name="images"
          valuePropName="images"
          label="Выберите файл"
          className={cls.dragger_filed}
          {...defaultDraggerProps}
        />
      </Form>
    </Modal>
  )
}

export default ModalCreateIncomingItem
