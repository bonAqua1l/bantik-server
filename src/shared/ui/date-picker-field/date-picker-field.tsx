import React from 'react'

import { DatePicker } from 'antd'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import dayjs, { Dayjs } from 'dayjs'

import cls from './date-picker-field.module.css'

import type { DatePickerProps } from 'antd'

interface Props extends DatePickerProps {
  label?: string
  rules?: Rule[]
  initialValue?: string
  pickerMode?: 'year' | 'month' | 'date'
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: Dayjs | null) => void
}

export const DatePickerField: React.FC<Props> = (props) => {
  const handleChange: DatePickerProps['onChange'] = (dateValue) => {
    props.onChange?.(dateValue)
  }

  return (
    <FormItem
      label={props.label}
      className={cls.dateField}
      name={props.name}
      rules={props.rules}
      getValueProps={(value) => ({
        value: value ? (dayjs.isDayjs(value) ? value : dayjs(value)) : value,
      })}
    >
      <DatePicker
        picker={props.pickerMode}
        placeholder={props.placeholder}
        onChange={handleChange}
        className={`${cls.datepicker} ${props.className}`}
      />
    </FormItem>
  )
}
