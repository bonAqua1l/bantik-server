'use client'

import React from 'react'

import { Button, Checkbox, Divider, Form, Modal, UploadProps } from 'antd'
import { FormInstance } from 'antd/lib'

import { Projects } from '@/pages/projects'
import { ProjectsType } from '@/pages/projects/types'
import { ProjectsRules } from '@/pages/projects/validate'
import { debounce } from '@/shared/tools/debounce'
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

const PAGE_SIZE_SELECT = 20

const ModalCreateProjects: React.FC<Props> = ({
  isModalOpen,
  onCloseModal,
  submitted,
  form,
  defaultDraggerProps,
  createService,
}) => {
  const [options, setOptions] = React.useState<{ value: number; label: string }[]>([])
  const [optionsLoading, setOptionsLoading] = React.useState(false)
  const [nextOptionsUrl, setNextOptionsUrl] = React.useState<string | null>(null)

  const fetchOptions = React.useCallback(async (search?: string, url?: string) => {
    setOptionsLoading(true)
    try {
      const response = await Projects.API.List.getServices(
        search,
        url || `/services/?limit=${PAGE_SIZE_SELECT}&include_additional=true`,
        undefined,
      )
      const newOptions = response.data.results.map((item: ProjectsType.Service) => ({
        value: item.id,
        label: item.name,
      }))

      setOptions((prev) => [...prev, ...newOptions.filter((o: { value: number }) => !prev.some((p) => p.value === o.value))])
      setNextOptionsUrl(response.data.next)
    } finally {
      setOptionsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (isModalOpen) {
      setOptions([])
      fetchOptions()
    }
  }, [isModalOpen, fetchOptions])

  const handleSelectScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement

    if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 5 && nextOptionsUrl && !optionsLoading) {
      fetchOptions(undefined, nextOptionsUrl)
    }
  }

  const handleSelectSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        setOptions([])
        fetchOptions(value, `/services/?limit=${PAGE_SIZE_SELECT}&include_additional=true&search=${value}`)
      }, 500),
    [fetchOptions],
  )

  return (
    <Modal
      className={cls.modal}
      classNames={{ header: cls.modal__header, body: cls.modal__body, footer: cls.modal__footer }}
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
        <Button form="createProducts" htmlType="submit" type="primary" key="submit" loading={submitted}>
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
        // onFinish={(data) => console.log('data', data)}
      >
        <TextField name="name" placeholder="Введите название сервиса" label="Название сервиса" rules={ProjectsRules.InputRules} />

        <TextField name="duration" placeholder="Введите длительность сервиса" label="Длительность сервиса" type="number" />

        <TextField name="price" placeholder="Введите цену сервиса" label="Цена сервиса" type="number" />

        <SelectField
          name="parent_services"
          label="Родительский сервис"
          placeholder="Выберите сервис"
          allowClear
          mode="multiple"
          showSearch
          filterOption={false}
          options={options}
          loading={optionsLoading}
          onPopupScroll={handleSelectScroll}
          onSearch={handleSelectSearch}
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
