'use client'

import React from 'react'

import { Button, Divider, Form, Modal } from 'antd'

import { Projects } from '@/pages/projects'
import { ProjectsRules } from '@/pages/projects/validate'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import cls from './modal-create-projects.module.css'

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const ModalCreateProjects: React.FC<Props> = ({ isModalOpen, onCloseModal }) => {
  const {
    isCreated,
    contextHolder,
    submitted,
    form,
    defaultDraggerProps,
    actions: { createService },
  } = Projects.Hooks.List.use()

  React.useEffect(() => {
    if (isCreated) {
      onCloseModal()
    }
  }, [isCreated, onCloseModal])

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
        <Button disabled={submitted} onClick={onCloseModal} key="back">Отмена</Button>,
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
      {contextHolder}
      <Divider className={cls.divider} />
      <Form
        id="createProducts"
        className={cls.form}
        form={form}
        onFinish={createService}
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
