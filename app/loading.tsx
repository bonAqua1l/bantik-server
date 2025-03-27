import React from 'react'

import { Flex, Spin } from 'antd'

export default function Loader() {
  return (
    <Flex justify="center" align="center" className="loader">
      <Spin size="large" />
    </Flex>
  )
}
