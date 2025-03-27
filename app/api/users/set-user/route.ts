import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { encrypt } from '@/shared/lib/session'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const session = await encrypt({ user: body })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
      httpOnly: true,
    })

    return NextResponse.json({ success: true, data: 'Пользователь успешно был установлен' })
  } catch (error) {
    console.log('error users me', error)

    return NextResponse.json({ success: false, message: error })
  }
}
