'use client'

import React from 'react'

import { Form, notification, Upload } from 'antd'
import { UploadProps } from 'antd/lib'
import { useRouter } from 'next/navigation'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const [items, setItems] = React.useState<ProjectsType.ServiceDetail | undefined>(undefined)
  const [isProjectsLoading, setIsProjectsLoading] = React.useState(true)
  const [api, contextHolder] = notification.useNotification()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/projects', title: 'Сервисы' },
    { href: `/admin/projects/${items?.id}`, title: items?.name },
    { href: '#', title: 'Изменить' },
  ]

  const ServiceIDGET = React.useCallback(async (id: number) => {
    try {
      const response = await Projects.API.Edit.getServiceById(id)

      setItems(response.data)
    } catch (error) {
      console.log('products by id projects', error)
    } finally {
      setIsProjectsLoading(false)
    }
  }, [])

  const EditService = React.useCallback(async (id: string, data: ProjectsType.FormEdit) => {
    setSubmitted(true)

    try {
      const dataToSend = {
        ...data,
        image: !Array.isArray(data.image) ? null : data.image,
      }

      const formData: any = new FormData()

      Object.entries(dataToSend).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      if (dataToSend.image === null) {
        formData.append('image', '')
      } else if (Array.isArray(dataToSend.image) && dataToSend.image[0]) {
        const file = dataToSend.image[0].originFileObj

        if (file) {
          formData.append('image', file)
        }
      }

      const response = await Projects.API.Edit.editService(id, formData)

      if (response.status === 200) {
        api.success({
          message: 'Сервис успешно был изменён',
          placement: 'top',
        })
        router.push(`/admin/projects/${id}`)
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
    } catch (error) {
      console.log('error edit employee', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  const defaultDraggerProps: UploadProps = {
    name: 'image',
    accept: 'image/*',
    maxCount: 1,
    beforeUpload(file) {
      if (!file.type.startsWith('image/')) {
        console.error(`Файл не изображение: "${file.name}"`)

        return Upload.LIST_IGNORE
      }

      return false
    },
  }

  return {
    breadcrumbData,
    items,
    isProjectsLoading,
    form,
    contextHolder,
    submitted,
    defaultDraggerProps,
    actions: {
      router,
      ServiceIDGET,
      EditService,
    },
  }
}

export const use = useEdit
