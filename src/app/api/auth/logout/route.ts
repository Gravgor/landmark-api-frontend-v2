import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()

    cookieStore.delete('auth_token')

    const response = NextResponse.json({ message: 'Logged out successfully' })

    response.cookies.set('auth_token', '', {
      expires: new Date(0),
      path: '/', 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}