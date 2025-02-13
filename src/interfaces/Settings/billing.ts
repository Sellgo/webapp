// These interfaces follow backends structure
export interface Quota {
  used: number;
  available: number;
}

export interface QuotaCollection {
  sales_estimation: Quota;
  profit_finder: Quota;
  product_tracker: Quota;
  seller_research: Quota;
  seller_detail?: Quota;
}

export interface StripeSubscriptionInfo {
  next_due_date: string;
  payment_amount: string;
}

export interface Transaction {
  receipt: string;
  card_type: string;
  card_number: string;
  id: string;
  desc: string;
  price: string;
  paid: boolean;
  date: string;
}

export interface CreditCard {
  brand: string;
  last4: string;
  exp_date: string;
}

export type SubscriptionPlanType =
  | 'Professional Plan'
  | 'Starter Plan'
  | 'Team Plan'
  | 'Wholesale Arbitrage $1 Plan'
  | 'Seller Scout Pro Plan'
  | 'Wholesale Arbitrage $1.99 Plan'
  | 'Personal Plan'
  | 'Business Plan'
  | null;
