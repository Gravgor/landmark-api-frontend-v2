import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }

  try {
    // Validate token with backend
    const response = await fetch(`${process.env.API_URL}user/api/v1/validate-token`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`
      },
    })

    if (response.ok) {
      return NextResponse.json({ isAuthenticated: true })
    } else {
      throw new Error('Invalid token')
    }
  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }
}