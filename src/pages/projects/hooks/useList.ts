'use client'

import React, { ChangeEvent } from 'react'

import { Form, Upload, UploadFile } from 'antd'
import { UploadProps } from 'antd/lib'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'
import { useNotificationApi } from '@/shared/providers/NotificationProvider'
import { debounce } from '@/shared/tools/debounce'

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
  const [isAlphabetical, setIsAlphabetical] = React.useState(false)
  const api = useNotificationApi()
  const PAGE_SIZE = 10

  React.useEffect(() => {
    const stored = localStorage.getItem('servicesIsAlphabetical')

    if (stored !== null) setIsAlphabetical(stored === 'true')
  }, [])

  React.useEffect(() => {
    localStorage.setItem('servicesIsAlphabetical', String(isAlphabetical))
  }, [isAlphabetical])

  const toggleAlphabetical = () => setIsAlphabetical((prev) => !prev)

  const createService = (async (data: ProjectsType.Form) => {
    setSubmitted(true)
    try {
      const { ...rest } = data
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'image' && value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      if (
        Array.isArray(rest.image) &&
                  rest.image.length &&
                  typeof rest.image[0] !== 'string' &&
                  (rest.image[0] as UploadFile).originFileObj
      ) {
        formData.append('image', (rest.image[0] as UploadFile).originFileObj as File)
      } else if (!Array.isArray(rest.image)) {
        formData.append('image', '')
      }

      const response = await Projects.API.List.createServices(formData)

      console.log('status', response.status)
      console.log('error', response?.data?.name?.[0])

      if (response.status === 201) {
        form.resetFields()
        await ServicesGET()
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
      router.refresh()

    } catch (error: any) {
      if (error.status === 400 && error?.response.data?.name?.[0] === 'Услуга with this Название услуги already exists.') {
        api.error({
          message: 'Сервис с подобным названием уже существует.',
          placement: 'top',
          duration: 1.5,
        })
      }
      console.log('project create error', error)
    } finally {
      setSubmitted(false)
    }
  })

  const ServicesGET = React.useCallback(async (search?: string | undefined, url?: string, previusURL?: string) => {
    setServiceLoading(true)
    try {
      const response = await Projects.API.List.getServices(search ,url || '/services/?include_additional=true', previusURL)

      setServices(response.data)
    } catch (error) {
      console.error('project error', error)
    } finally {
      setServiceLoading(false)
    }
  }, [])

  const debounceSearch = debounce((search: string) => {
    ServicesGET(search)
  }, 1500)

  const handleServiceSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setServiceLoading(true)
    debounceSearch(e.target.value)
  }

  const handlePageChange = (page: number) => {
    if (isServiceLoading || page === currentPage) return

    const offset = (page - 1) * PAGE_SIZE

    const url = `/services/?limit=${PAGE_SIZE}&offset=${offset}&include_additional=true`

    ServicesGET(undefined ,url, undefined)
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
    isAlphabetical,
    actions: {
      createModal,
      router,
      ServicesGET,
      createService,
      handlePageChange,
      setCurrentPage,
      handleServiceSearch,
      toggleAlphabetical,
    },
  }
}

export const use = useList
