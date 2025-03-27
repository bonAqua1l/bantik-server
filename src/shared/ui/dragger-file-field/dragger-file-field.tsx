import React from 'react'

import { InboxOutlined } from '@ant-design/icons'
import { Upload, Form, message } from 'antd'

import cls from './dragger-file-field.module.css'

import type { UploadProps, UploadFile } from 'antd/lib/upload/interface'

const { Dragger } = Upload

function normFile(e: any) {
  const fileList = Array.isArray(e) ? e : e?.fileList

  return fileList && fileList.length > 0 ? fileList : null
}
interface Props extends UploadProps {
  rules?: any[]
  initialValue?: string
  valuePropName?: string
  label?: string
  defaultFilePath?: string | string[] | { id?: number; image: string }[]
  // eslint-disable-next-line no-unused-vars
  deleteFunc?: (file: any) => void
}

export const DraggerFileField: React.FC<Props> = (props) => {
  const { deleteFunc ,onChange, ...uploadProps } = props

  const handleRemove = async (file: UploadFile) => {
    try {
      if (file.status === 'done' && file.url) {
        deleteFunc?.(parseInt(file.uid))
      }

    } catch (error) {
      console.error('Error deleting file:', error)
      message.error('Ошибка при удалении файла')
    }
  }

  const handleChange = (info: any) => {
    if (onChange) {
      onChange(info)
    }
  }

  return (
    <Form.Item
      name={props.name}
      valuePropName={props.valuePropName || 'fileList'}
      label={props.label}
      className={cls.draggerField}
      getValueFromEvent={normFile}
    >
      <Dragger
        {...uploadProps}
        // fileList={fileList}
        onChange={(info) => handleChange(info)}
        onRemove={handleRemove}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Выберите файл</p>
        <p className="ant-upload-hint">Тут можно загрузить один или несколько файлов</p>
      </Dragger>
    </Form.Item>
  )
}
