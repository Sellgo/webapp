import { AppConfig } from './config';

const stripe = window.Stripe(AppConfig.STRIPE_API_KEY);

export default stripe;
