import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const cookieStore = await cookies()

    cookieStore.set('session', '', { path: '/', expires: new Date(0), httpOnly: true, secure: true })

    return NextResponse.json({ success: true, data: 'Пользователь успешно был удален' })

  } catch (error) {
    console.log('error users me', error)

    return NextResponse.json({ success: false, message: error })
  }
}
