'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { LoginTypes } from '@/pages/auth/types'

const secretKey = process.env.SECRET_KEY
const key = new TextEncoder().encode(secretKey)
const BASE_URL = process.env.NEXT_PUBLIC_COMPANY_BASE_URL

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })

    return payload
  } catch (error: any) {
    return error.code
  }
}

export async function loginSession(loginData: LoginTypes.Form) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })

    const data = await response.json()

    if (data.detail === 'No active account found with the given credentials') {
      return {
        success: false,
        ...data,
      }
    }

    const user = data.user
    const session = await encrypt({ user })
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const cookieStore = await cookies()

    cookieStore.set('session', session, { httpOnly: true, expires })

    return {
      success: true,
      ...data,
    }
  } catch (error) {
    console.error('Error in loginSession:', error)
    throw error
  }
}

export async function logout() {
  const cookieStore = await cookies()

  cookieStore.set('session', '')
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  if (!session) return null

  const decryptedSession = await decrypt(session)

  return decryptedSession
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value

  if (!session) {
    return NextResponse.next()
  }

  const parsed = await decrypt(session)

  parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const res = NextResponse.next()

  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })

  return res
}
