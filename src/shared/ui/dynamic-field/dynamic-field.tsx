import React from 'react'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Button, Input, Flex } from 'antd'
import { Rule } from 'antd/es/form'
import { FormItemProps } from 'antd/lib'

import cls from './dynamic-field.module.css'

interface Props extends FormItemProps {
  className?: string,
  rules?: Rule[],
  listName: string | number | (string | number)[],
  buttonAddLabel: string,
}

export const DynamicField: React.FC<Props> = (props) => {
  return (
    <Form.List name={props.listName}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Flex gap={18} align={'flex-end'} justify={'space-between'} key={index}>
                <Form.Item
                  name={[field.name, 'key']}
                  label={'Свойство (пр. Цвет)'}
                  rules={props.rules}
                  className={cls.formItemField}
                >
                  <Input className={props.className} placeholder={'Ключ'} />
                </Form.Item>
                <Form.Item
                  name={[field.name, 'value']}
                  label={'Значения (пр. Белый, Черный, Синий)'}
                  rules={props.rules}
                  className={cls.formItemField}
                >
                  <Input
                    className={props.className}
                    suffix={(
                      <MinusCircleOutlined
                        style={{ display: `${fields.length ? 'initial' : 'none'}` }}
                        onClick={() => remove(field.name)}
                        className={cls.btn_red}
                      />
                    )}
                    placeholder={'Значение'}
                  />
                </Form.Item>
              </Flex>
            ))}
            <Form.Item>
              <Button
                type="default"
                onClick={() => add()}
                disabled={fields.length >= 15}
                style={{ marginTop: 25 }}
              >
                {props.buttonAddLabel} <PlusOutlined/>
              </Button>
            </Form.Item>
          </div>
        )
      }}
    </Form.List>
  )
}
