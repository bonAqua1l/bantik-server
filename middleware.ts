import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { getSession, updateSession } from '@/shared/lib/session'
import { REFRESH_TOKEN_COOKIE_KEY } from '@/shared/utils/token-manager/consts'

const publicRoutes = ['/', '/auth']

export async function middleware(request: NextRequest) {
  const allCookies = await cookies()
  const refreshToken = allCookies.get(REFRESH_TOKEN_COOKIE_KEY)?.value
  const session = allCookies.get('session')?.value
  const user = await getSession()
  const userRole = user?.user?.role
  const pathname = request.nextUrl.pathname
  const isAuthPage = request.nextUrl.pathname === '/auth'

  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (session && !refreshToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (session && refreshToken && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`${userRole === 'worker' ? '/admin/timetable-worker' : '/admin/storage-requests/'}`, request.url))
  }

  if (userRole === 'worker' && pathname !== '/admin/timetable-worker') {
    return NextResponse.redirect(new URL('/admin/timetable-worker', request.url))
  }

  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
