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

/**
 * Per-country currency + USD conversion rate. Product prices are stored in USD;
 * at payment we charge in the currency of the customer's selected country.
 *
 * `rate` is "1 USD = N units of this currency". `currency` is the ISO 4217 code
 * Stripe expects (lowercased on use). All currencies here use 2-decimal minor
 * units (cents/paise), so the smallest-unit math is a uniform `* 100`.
 *
 * Rates are approximate settlement rates, not live FX — adjust as needed.
 */
const COUNTRY_CURRENCY: Record<string, { currency: string; rate: number }> = {
  US: { currency: 'usd', rate: 1 },
  CA: { currency: 'cad', rate: 1.37 },
  GB: { currency: 'gbp', rate: 0.79 },
  AU: { currency: 'aud', rate: 1.52 },
  IN: { currency: 'inr', rate: 83 },
};

const FALLBACK = COUNTRY_CURRENCY.US;

/**
 * Resolves the charge currency + rate for a country code, converting a USD
 * amount into the integer minor-unit value Stripe requires. Unknown countries
 * fall back to USD so a charge always succeeds with a sensible amount.
 */
export function resolveCharge(usdAmount: number, country: string): {
  amount: number;
  currency: string;
  rate: number;
} {
  const entry = COUNTRY_CURRENCY[country] ?? FALLBACK;
  return {
    amount: Math.round(usdAmount * entry.rate * 100),
    currency: entry.currency,
    rate: entry.rate,
  };
}

export async function createPaymentIntent(
  usdAmount: number,
  country: string,
  metadata: Record<string, string>,
  // India export regulations require a description and shipping details when an
  // India-based account charges a foreign card. We always send them so the
  // charge is accepted regardless of card origin.
  exportDetails: { description: string; shipping: Stripe.PaymentIntentCreateParams.Shipping },
): Promise<{ paymentIntent: Stripe.PaymentIntent | null; currency: string; rate: number }> {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const { amount, currency, rate } = resolveCharge(usdAmount, country);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
    description: exportDetails.description,
    shipping: exportDetails.shipping,
    metadata,
  });

  return { paymentIntent, currency, rate };
}

export async function retrievePaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent | null> {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  return stripe.paymentIntents.retrieve(paymentIntentId);
}
