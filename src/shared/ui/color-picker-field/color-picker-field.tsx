'use client'

import React from 'react'

import { Form, FormItemProps } from 'antd'
import { Rule } from 'antd/es/form'

import cls from './color-picker-field.module.css'

interface ColorPickerFieldProps extends FormItemProps {
  label?: string
  rules?: Rule[]
  initialValue?: string
  name?: string
  onClick?: any
  options: string[]
  selectedColor?: string
}

export const ColorPickerField: React.FC<ColorPickerFieldProps> = ({
  label,
  name,
  rules,
  initialValue,
  onClick,
  options,
  selectedColor,
}) => {
  const handleColorClick = (color: string) => {
    if (onClick) {
      onClick(color)
    }
  }

  return (
    <Form.Item label={label} name={name} rules={rules} initialValue={initialValue}>
      <div className={cls.wrapper}>
        {options.map((color) => (
          <div
            key={color}
            className={cls.colorSquare}
            style={{
              backgroundColor: color,
              border: selectedColor === color ? '2px solid black' : '1px solid #ddd',
              cursor: 'pointer',
            }}
            onClick={() => handleColorClick(color)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleColorClick(color)
              }
            }}
          />
        ))}
      </div>
    </Form.Item>
  )
}
