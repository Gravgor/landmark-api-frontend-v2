import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.json()
  const cookie = await cookies()
  const { name, email, password } = body

  try {
    const response = await fetch(`${process.env.API_URL}auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      throw new Error('Registration failed')
    }

    const data = await response.json()
    const { token } = data

    // Set the token in an HTTP-only cookie
    cookie.set('auth_token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    return NextResponse.json({ message: 'User registered successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 400 }
    )
  }
}