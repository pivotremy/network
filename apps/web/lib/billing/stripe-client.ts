import 'client-only';

import type { Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

let stripeClientPromise: Promise<Stripe | null>;

export function getStripeClient(): Promise<Stripe | null> {
  if (!stripeClientPromise) {
    stripeClientPromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
    );
  }

  return stripeClientPromise;
}

export function formatStripeDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}