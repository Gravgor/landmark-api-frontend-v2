import { cookies } from 'next/headers'

const API_BASE_URL = process.env.API_URL

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value

  if (!token) {
    throw new Error('No authentication token found')
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  console.log(response)
  if (!response.ok) {
    throw new Error('API request failed')
  }

  return response.json()
}

export async function getUserBillingInfo() {
    return fetchWithAuth('/subscription/manage/get-billing')
  }