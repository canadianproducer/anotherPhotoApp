import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const stripe = STRIPE_SECRET_KEY 
  ? new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2026-04-22.dahlia',
      appInfo: {
        name: 'StudioSnap AI MVP',
      },
    })
  : null;

// Mock mode helper to test flow without Stripe
export const isMockPaymentMode = !stripe;
