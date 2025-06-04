/* eslint-disable no-unused-vars */
'use client'

import React from 'react'

import { DatePicker } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import dayjs, { Dayjs } from 'dayjs'

import cls from './date-picker-field.module.css'

import type { DatePickerProps } from 'antd'
import type { Rule } from 'antd/es/form'

interface Props extends DatePickerProps {
  label?: string
  rules?: Rule[]
  allowedDates?: string[]
  initialValue?: string | Dayjs
  onChange?: (value: Dayjs | null) => void
  disablePast?: boolean
  showTime?: boolean
}

export const DatePickerField: React.FC<Props> = (props) => {
  const disabledDate = (current: Dayjs) => {
    if (props.disablePast && current && current < dayjs().startOf('day')) {
      return true
    }
    if (props.allowedDates?.length) {
      return !props.allowedDates.includes(current.format('YYYY-MM-DD'))
    }

    return false
  }

  const handleChange: DatePickerProps['onChange'] = (v) => props.onChange?.(v)

  return (
    <FormItem
      label={props.label}
      name={props.name}
      className={cls.dateField}
      rules={props.rules}
      initialValue={props.initialValue ? dayjs(props.initialValue) : undefined}
      getValueProps={(v) => ({
        value: v ? (dayjs.isDayjs(v) ? v : dayjs(v)) : v,
      })}
    >
      <DatePicker
        placeholder={props.placeholder}
        onChange={handleChange}
        className={`${cls.datepicker} ${props.className}`}
        showTime={props.showTime ? { format: 'HH:mm' } : false}
        disabledDate={disabledDate}
      />
    </FormItem>
  )
}
