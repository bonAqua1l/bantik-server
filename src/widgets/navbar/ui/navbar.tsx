'use client'

import React from 'react'

import {
  Layout,
} from 'antd'

import cls from './navbar.module.css'

const { Header } = Layout

export const Navbar = () => {
  return (
    <>
      <Header className={cls.navbar}>
        <h1>hello</h1>
      </Header>
    </>
  )
}
