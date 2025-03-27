'use client'

import React from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Divider, Flex, Spin, Tooltip } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { axiosRequest } from '@/shared/api/axios'
import { QStorageLogoMini } from '@/shared/assets/icons'
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux'
import { NEXT_PUBLIC_API_URL } from '@/shared/utils/consts'
import { login } from '@/store/actions/user'

import cls from './SidebarWarehouse.module.css'

export const SidebarWarehouse: React.FC = () => {
  const warehouses = useAppSelector((state) => state.warehoses.warehouses)
  const currentWarehouse = useAppSelector((state) => state.user.userData?.current_warehouse)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const SelectStorage = React.useCallback(async (storage_id: number) => {
    try {
      const response = await axiosRequest.post('/users/set_current_warehouse/', {
        warehouse_id: storage_id,
      })

      if (response.status === 200) {
        dispatch(login(response.data))

        await fetch(`${NEXT_PUBLIC_API_URL}/api/users/set-user/`, {
          method: 'POST',
          body: JSON.stringify(response.data),
        })

        router.push('/products/incoming/')
      }
    } catch (error) {
      console.log('select storage error', error)
    }
  }, [])

  return (
    <Flex vertical gap={10} className={cls.sidebar_wrapper}>
      <Tooltip placement="right" title="QStorage">
        <Flex
          className={`${cls.warehouse_item_logo}`}
          onClick={() => router.push('/me')}
        >
          <QStorageLogoMini/>
        </Flex>
      </Tooltip>

      <Flex className={cls.divider_block}>
        <Divider className={cls.divider} />
      </Flex>
      {
        warehouses && warehouses.length > 0 ? (
          <>
            {
              warehouses.map((item) => (
                <React.Fragment key={item.id}>
                  <Tooltip placement="right" title={`Склад ${item.title}`}>
                    <Flex
                      onClick={() => SelectStorage(item.id)}
                      className={`${cls.warehouse_item} ${currentWarehouse === item.id && cls.warehouse_item__selected}`}
                    >
                      {item.image ? (
                        <Image src={item.image} alt={item.title} width={55} height={55} className={cls.image} />
                      ) : (
                        `${item.title}`
                      )}
                    </Flex>
                  </Tooltip>
                </React.Fragment>
              ))
            }
          </>
        ) : (
          <Spin/>
        )
      }
      <Tooltip placement="right" title={'Создать склад'}>
        <Flex
          className={`${cls.warehouse_item_plus}`}
          onClick={() => router.push('/warehouses/create')}
        >
          <PlusOutlined/>
        </Flex>
      </Tooltip>
    </Flex>
  )
}
