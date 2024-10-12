'use server'

import { decrypt, encrypt } from "@/lib/encrypt"
import { cookies } from "next/headers"
type Plan = "free" | "pro"

export async function createAccount(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const plan = formData.get("plan") as Plan

  try {
    // 1. Create user account
    const createAccountResponse = await fetch(
      `${process.env.API_URL}subscription/create-user-account`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, plan }),
      }
    )

    if (!createAccountResponse.ok) {
      throw new Error("Failed to create account")
    }

    const accountData = await createAccountResponse.json()

    // 2. Encrypt and store credentials in cookies
    const encryptedCredentials = await encrypt(JSON.stringify({ email, password }))
    cookies().set('temp_credentials', encryptedCredentials, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 300, // 5 minutes
      path: '/',
    })

    // 3. Handle pro plan subscription
    if (plan === "pro") {
      const userID = accountData.User.id
      const planType = "monthly"
      const stripeResponse = await fetch(
        `${process.env.API_URL}subscription/create-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID, planType }),
        }
      )

      if (!stripeResponse.ok) {
        throw new Error("Failed to create Stripe checkout session")
      }

      const stripeData = await stripeResponse.json()
      return { success: true, sessionId: stripeData.sessionId }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in account creation process:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}

export async function loginAfterRedirect() {
    try {
      // 1. Retrieve and decrypt the stored credentials
      const encryptedCredentials = cookies().get('temp_credentials')?.value
      if (!encryptedCredentials) {
        throw new Error("No credentials found")
      }
  
      const { email, password } = JSON.parse(await decrypt(encryptedCredentials))
  
      // 2. Perform login
      const loginResponse = await fetch(`${process.env.API_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
  
      if (!loginResponse.ok) {
        throw new Error("Failed to log in after redirection")
      }
  
      const loginData = await loginResponse.json()
      const { token } = loginData
  
      // 3. Set the authentication token as a cookie
      cookies().set('auth_token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      })
  
      return { success: true }
    } catch (error) {
      console.error("Error in login after redirection:", error)
      return { success: false, message: "An error occurred during login. Please try again." }
    }
  }