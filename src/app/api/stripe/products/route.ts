import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET() {
  try {
    const products = await stripe.products.list({
      active: true,
    })

    const formattedProducts = products.data.map((product) => ({
      id: product.id,
      name: product.name,
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error('Error fetching Stripe products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}