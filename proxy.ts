import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const userCookie = request.cookies.get('revoshop-user')
  const isLoggedIn = userCookie && userCookie.value
  
  if (request.nextUrl.pathname.startsWith('/cart') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (request.nextUrl.pathname.startsWith('/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/cart/:path*', '/admin/:path*']
}