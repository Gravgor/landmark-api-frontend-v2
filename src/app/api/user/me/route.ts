import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('auth_token')

  if (!authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const response = await fetch(`${process.env.API_URL}user/api/v1/me`, {
      headers: {
        'Authorization': `Bearer ${authToken.value}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    let userData = await response.json()
    userData.accessToken = authToken.value
    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      { error: 'An error occurred while fetching user data' },
      { status: 500 }
    )
  }
}