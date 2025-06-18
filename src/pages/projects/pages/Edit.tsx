'use client'

import React from 'react'

import { Breadcrumb, Button, Flex, Form } from 'antd'

import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { LoaderData } from '@/shared/ui/loader/Loader'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Projects } from '..'
import cls from '../styles/edit.module.css'

interface Props {
  service_id: string
}

export const Edit: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    items,
    submitted,
    form,
    isProjectsLoading,
    defaultDraggerProps,
    actions: { ServiceIDGET, EditService },
  } = Projects.Hooks.Edit.use()

  React.useEffect(() => {
    ServiceIDGET(Number(props.service_id))
  }, [props.service_id, ServiceIDGET])

  return (
    <div className="main">
      <Flex className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
      </Flex>

      <Flex className={cls.main_title}>
        <h2>Изменить сервис “{items?.name}”</h2>
      </Flex>

      <LoaderData isLoading={isProjectsLoading} data={items}>
        <div className={cls.main_form}>
          <Form
            form={form}
            className={cls.Form}
            initialValues={{
              ...items,
              image: items?.image
                ? [{
                  uid: '-1',
                  name: 'current_image',
                  url: items.image,
                }]
                : [],
            }}
            onFinish={(data) => EditService(props.service_id, data)}
          >
            <TextField
              name="name"
              placeholder="Введите название сервиса"
              label="Название сервиса"
            />
            <TextField
              name="duration"
              placeholder="Введите длительность сервиса"
              label="Длительность сервиса"
              type="number"
            />

            <TextField
              name="price"
              placeholder="Введите цену сервиса"
              label="Цена сервиса"
              type="number"
            />

            <DraggerFileField
              label="Выберите картинку"
              name="image"
              valuePropName="fileList"
              className={cls.dragger_filed}
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
