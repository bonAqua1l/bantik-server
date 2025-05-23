'use client'

import React from 'react'

import { Empty, Flex } from 'antd'

import cls from '../styles/view.module.css'

//sdfsdf

export const View = () => {
  return (
    <div>
      <Flex className={cls.auth} justify="center" align="center">
        <Empty description={'QStorage'} />
      </Flex>
    </div>
  )
}
