import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('Stripe secret key not configured. Set STRIPE_SECRET_KEY in .env');
}

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      typescript: true,
    })
  : null;

export function getStripePublishableKey(): string {
  return process.env.STRIPE_PUBLISHABLE_KEY || '';
}

export async function createPaymentIntent(
  amount: number,
  metadata: Record<string, string>
): Promise<Stripe.PaymentIntent | null> {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata,
  });
}

export async function retrievePaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent | null> {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  return stripe.paymentIntents.retrieve(paymentIntentId);
}