import { Select } from 'antd'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import { SelectProps } from 'antd/lib'

import cls from './select-field.module.css'

interface Props extends SelectProps {
  label?: string
  name?: string
  initialValue?: string
  rules?: Rule[]
  height?: number
}

export const SelectField: React.FC<Props> = (props) => {

  return (
    <FormItem
      className={cls.selectField}
      label={props.label}
      initialValue={props.initialValue}
      rules={props.rules}
      name={props.name}
    >
      <Select
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        style={props.style}
        onChange={props.onChange}
        options={props.options}
        placeholder={props.placeholder}
        className={props.className}
      />
    </FormItem>
  )
}
