'use client'

import React from 'react'

import { Button, Checkbox, Divider, Form, Modal, UploadProps } from 'antd'
import { FormInstance } from 'antd/lib'

import { ProjectsType } from '@/pages/projects/types'
import { ProjectsRules } from '@/pages/projects/validate'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import cls from './modal-create-projects.module.css'

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
  submitted: boolean
  form: FormInstance
  defaultDraggerProps: UploadProps
  // eslint-disable-next-line no-unused-vars
  createService: (data: ProjectsType.Form) => Promise<any>
  services: ProjectsType.ServiceResponse | undefined
}

const ModalCreateProjects: React.FC<Props> = ({
  isModalOpen,
  onCloseModal,
  submitted,
  form,
  defaultDraggerProps,
  createService,
  services,
}) => {
  return (
    <Modal
      className={cls.modal}
      classNames={{
        header: cls.modal__header,
        body: cls.modal__body,
        footer: cls.modal__footer,
      }}
      title="Добавить сервис"
      width="800px"
      open={isModalOpen}
      centered
      onCancel={onCloseModal}
      okButtonProps={{ style: { display: 'none' } }}
      footer={[
        <Button disabled={submitted} onClick={onCloseModal} key="back">
          Отмена
        </Button>,
        <Button
          form="createProducts"
          htmlType="submit"
          type="primary"
          key="submit"
          loading={submitted}
        >
          Создать
        </Button>,
      ]}
    >
      <Divider className={cls.divider} />
      <Form
        id="createProducts"
        className={cls.form}
        form={form}
        onFinish={(data) =>
          createService(data).finally(() => {
            onCloseModal()
          })}
      >
        <TextField
          name="name"
          placeholder="Введите название сервиса"
          label="Название сервиса"
          rules={ProjectsRules.InputRules}
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

        <SelectField
          name="parent_service"
          label="Родительский сервис"
          placeholder="Выберите сервис"
          allowClear
          options={
            services?.results.map((s) => ({
              label: s.name,
              value: s.id,
            })) || []
          }
        />

        <Form.Item name="is_additional" valuePropName="checked">
          <Checkbox>Дополнительная услуга</Checkbox>
        </Form.Item>

        <DraggerFileField
          label="Выберите картинку"
          name="image"
          valuePropName="fileList"
          className={cls.dragger_filed}
          {...defaultDraggerProps}
        />
      </Form>
    </Modal>
  )
}

export default ModalCreateProjects
