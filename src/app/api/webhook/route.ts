import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (process.env.PAYMENTS_ENABLED !== 'true') {
    return NextResponse.json({ error: 'Payments are disabled.' }, { status: 503 })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const sig = req.headers.get('stripe-signature')

  if (!secretKey || !webhookSecret || !sig) {
    return NextResponse.json({ error: 'Stripe webhook is not configured.' }, { status: 503 })
  }

  const body = await req.text()
  const stripe = new Stripe(secretKey)
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      break
    case 'customer.subscription.deleted':
      break
  }

  return NextResponse.json({ received: true })
}
