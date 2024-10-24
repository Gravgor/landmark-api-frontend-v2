import { NextResponse } from 'next/server'
import Stripe from 'stripe'


export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  try {
    const prices = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
    })

    const formattedPrices = prices.data.map((price) => ({
      id: price.id,
      product: price.product,
      unit_amount: price.unit_amount,
      currency: price.currency,
      recurring: price.recurring,
    }))

    return NextResponse.json(formattedPrices)
  } catch (error) {
    console.error('Error fetching Stripe prices:', error)
    return NextResponse.json({ error: 'Failed to fetch prices' }, { status: 500 })
  }
}