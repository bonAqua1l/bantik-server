'use client'

import { Button, Result } from 'antd'
import { useRouter } from 'next/navigation'

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <Result
      status="404"
      title="Страница не найдена (404)"
      subTitle="Похоже, вы оказались не там где надо!"
      extra={<Button type="primary" onClick={() => router.push('/products/incoming')}>Вернуться домой</Button>}
    />
  )
}
