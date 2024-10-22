import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  try {
    const request = await fetch("https://api.landmark-api.com/user/api/v1/validate-token", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }) 
    if(request.ok) {
        return NextResponse.next()
    }
    throw new Error('Token is not validated on backend')
  } catch (error) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}