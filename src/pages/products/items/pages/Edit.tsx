'use client'

import React from 'react'

import { Button, Flex, Form } from 'antd'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { DynamicField } from '@/shared/ui/dynamic-field/dynamic-field'
import { LoaderData } from '@/shared/ui/loader/Loader'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductItems } from '..'
import { ProductRules } from '../validate'

import cls from './../styles/edit.module.css'

interface Props {
    item_slug: string
}

export const EditProduct: React.FC<Props> = (props) => {
  const {
    contextHolder,
    breadcrumbData,
    isItemsLoading,
    submitted,
    items,
    productsColorsList,
    defaultDraggerProps,
    form,
    initialImageFileList,
    actions: {
      ProductItemsIDGET,
      EditProductItems,
      ProductsColorsGET,
      DeleteProductImage,
    },
  } = ProductItems.Hooks.Edit.use()

  React.useEffect(() => {
    ProductItemsIDGET(props.item_slug)
    ProductsColorsGET()
  }, [props.item_slug ,ProductItemsIDGET, ProductsColorsGET])

  React.useEffect(() => {
    if (items && items.images) {
      form.setFieldsValue({ images: initialImageFileList })
    }
  }, [items, form])

  return (
    <div className="main">
      {contextHolder}
      <Flex className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
      </Flex>

      <Flex className={cls.main_title}>
        <h2>Изменить товар “{items?.title}”</h2>
      </Flex>

      <LoaderData isLoading={isItemsLoading} data={items}>
        <div className={cls.main_form}>
          <Form
            form={form}
            className={cls.Form}
            initialValues={{ ...items, images: initialImageFileList }}
            onFinish={(data) => EditProductItems(props.item_slug, data)}
          >
            <TextField
              name="title"
              placeholder="Введите название товара"
              label="Название товара"
              rules={ProductRules.Title}
            />
            <TextField
              name="price"
              type="number"
              label="Цена"
              placeholder="Введите цену"
              rules={ProductRules.Price}
            />
            <TextField
              name="description"
              placeholder="Введите описание товара"
              label="Описание товара"
            />
            <DatePickerField
              name="expiration_date"
              label="Срок годности"
              placeholder="Укажите срок годности товара"
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
                  <Flex className={cls.color_picker_main} align={'center'} gap={5}>
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
            />

            <DraggerFileField
              label="Выберите картинку"
              name="images"
              className={cls.dragger_filed}
              deleteFunc={DeleteProductImage}
              {...defaultDraggerProps}
            />

            <Button
              htmlType="submit"
              type="primary"
              className={cls.btn}
              loading={submitted}
            >
              Сохранить
            </Button>
          </Form>
        </div>
      </LoaderData>
    </div>
  )
}
