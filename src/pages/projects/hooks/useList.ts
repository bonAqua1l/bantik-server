'use client'

import React from 'react'

import { Form, Upload } from 'antd'
import { UploadProps } from 'antd/lib'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'
import { useNotificationApi } from '@/shared/providers/NotificationProvider'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useList() {
  const [form] = Form.useForm()
  const [currentPage, setCurrentPage] = React.useState(1)
  const createModal = useDisclosure()
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const [services, setServices] = React.useState<ProjectsType.ServiceResponse | undefined>(undefined)
  const [isServiceLoading, setServiceLoading] = React.useState(false)
  const api = useNotificationApi()
  const PAGE_SIZE = 10

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

      if (response.status === 201) {
        form.resetFields()
        await ServicesGET()
        api.success({
          message: 'Сервис успешно создан',
          placement: 'top',
        })
      } else if (response.status === 400 && response?.data?.name?.[0] === 'Услуга with this Название услуги already exists.') {
        api.error({
          message: 'Мындай аталыштагы товар бар',
          placement: 'top',
          duration: 1.5,
        })
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
      router.refresh()

    } catch (error) {
      console.log('project create error', error)
    } finally {
      setSubmitted(false)
    }
  })

  const ServicesGET = React.useCallback(async (url?: string, previusURL?: string) => {
    setServiceLoading(true)
    try {
      const response = await Projects.API.List.getServices(url || '/services/?include_additional=true', previusURL)

      setServices(response.data)
    } catch (error) {
      console.error('project error', error)
    } finally {
      setServiceLoading(false)
    }
  }, [])

  const handlePageChange = (page: number) => {
    if (isServiceLoading || page === currentPage) return

    const offset = (page - 1) * PAGE_SIZE

    const url = `/services/?limit=${PAGE_SIZE}&offset=${offset}&include_additional=true`

    ServicesGET(url, undefined)
    setCurrentPage(page)
  }

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
    submitted,
    form,
    breadcrumbData,
    services,
    defaultDraggerProps,
    PAGE_SIZE,
    isServiceLoading,
    currentPage,
    actions: {
      createModal,
      router,
      ServicesGET,
      createService,
      handlePageChange,
      setCurrentPage,
    },
  }
}

export const use = useList
