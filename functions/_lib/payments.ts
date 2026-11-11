import Stripe from 'stripe';import {type Env,HttpError} from './core';
export function stripeClient(env:Env){if(!env.STRIPE_RESTRICTED_KEY)throw new HttpError(503,'Online payment is not connected.');return new Stripe(env.STRIPE_RESTRICTED_KEY,{apiVersion:'2026-10-28.endive',httpClient:Stripe.createFetchHttpClient(),maxNetworkRetries:2})}
