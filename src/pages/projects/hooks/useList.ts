'use client'

import React, { useState } from 'react'

import { Form, notification, Upload } from 'antd'
import { UploadProps } from 'antd/lib'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useList() {
  const [form] = Form.useForm()
  const createModal = useDisclosure()
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const [isCreated, setIsCreated] = React.useState(false)
  const [services, setServices] = useState<ProjectsType.Service[] | undefined>(undefined)
  const [api, contextHolder] = notification.useNotification()

  const createService = (async (data: ProjectsType.Form) => {
    setSubmitted(true)
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      if (Array.isArray(data.image) && data.image[0]) {
        const file = data.image[0].originFileObj

        if (file) {
          formData.append('image', file)
        }
      }

      const response = await Projects.API.List.createServices(formData)

      if (response.status === 201 || response.status === 200) {
        api.success({
          message: 'Сервис успешно создан',
          placement: 'top',
        })
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
      await ServicesGET()
      router.refresh()

      setIsCreated(true)
    } catch (error) {
      console.log('project create error', error)
    } finally {
      setSubmitted(false)
    }
  })

  const ServicesGET = React.useCallback(async () => {
    try {
      const response = await Projects.API.List.getServices()

      setServices(response.data.results)
    } catch (error) {
      console.error('project error', error)
    }
  }, [])

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/admin/projects', title: 'Сервисы' },
  ]

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
    isCreated,
    contextHolder,
    submitted,
    form,
    breadcrumbData,
    services,
    defaultDraggerProps,
    actions: {
      createModal,
      router,
      ServicesGET,
      createService,
    },
  }
}

export const use = useList
