'use client'

import React from 'react'

import { Button, Flex, Form } from 'antd'
import Image from 'next/image'

import { AuthHeroImage } from '@/shared/assets/images'
import { TextField } from '@/shared/ui/textfield/textfield'
import { TextFieldPassword } from '@/shared/ui/textfield-password/textfield-password'

import { use } from '../hooks'
import cls from '../styles/view.module.css'
import { LoginTypes } from '../types'
import { AuthRules } from '../validate'

export const View = () => {
  const [form] = Form.useForm()
  const {
    contextHolder,
    isLoading,
    actions: {
      login,
    },
  } = use()

  const onFinish = (data: LoginTypes.Form) => {
    login(data)
  }

  return (
    <div>
      <Flex className={cls.auth} justify="center" align="center">

        <Flex align="center" gap={90} className={cls.main_flex}>
          <Form className={cls.form} onFinish={onFinish} name="loginForm" form={form}>
            <h1>Вход</h1>
            {contextHolder}
            <Flex className={cls.form_flex} justify="center" align="center">
              <Flex className={cls.form__items} gap={16}>
                <TextField
                  name="email"
                  type="email"
                  label="Email"
                />

                <TextFieldPassword
                  name="password"
                  type="password"
                  label="Пароль"
                  rules={AuthRules.Password}
                />

                <Button
                  type="primary"
                  loading={isLoading}
                  htmlType="submit"
                  className={cls.form__btn}
                >
                  Войти
                </Button>
              </Flex>
            </Flex>
          </Form>
        </Flex>
      </Flex>

      <Image src={AuthHeroImage} alt="hero_image" className={cls.hero_image} />
      <div className={cls.black_block} />
    </div>
  )
}
