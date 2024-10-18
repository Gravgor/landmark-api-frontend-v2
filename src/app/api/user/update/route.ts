import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth_token')
    const body = await request.json()
    const { name, password } = body

    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const response = await fetch(`${process.env.API_URL}user/api/v1/update`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${authToken.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, password})
        })
        if (!response.ok) {
            throw new Error('There was error with updating user')
        }
        return NextResponse.json({message: 'User updated success'})
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'An unexpected error occurred' },
            { status: 400 }
          )
    }
}