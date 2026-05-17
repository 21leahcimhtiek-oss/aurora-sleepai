import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (process.env.PAYMENTS_ENABLED !== 'true') {
    return NextResponse.json(
      { error: 'Payments are disabled until checkout credentials are configured.' },
      { status: 503 }
    )
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const monthlyPrice = process.env.STRIPE_PRICE_PRO_MONTHLY
  const yearlyPrice = process.env.STRIPE_PRICE_PRO_YEARLY

  if (!secretKey || !appUrl || !monthlyPrice || !yearlyPrice) {
    return NextResponse.json({ error: 'Stripe checkout is not configured.' }, { status: 503 })
  }

  const stripe = new Stripe(secretKey)
  const plan = req.nextUrl.searchParams.get('plan') ?? 'pro_monthly'
  const priceId = plan === 'pro_yearly' ? yearlyPrice : monthlyPrice
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard?upgraded=1`,
    cancel_url: `${appUrl}/pricing`,
  })

  return NextResponse.redirect(session.url!)
}
