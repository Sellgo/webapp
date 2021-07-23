export interface SubscriptionPlan {
  subscriptionId: number;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  isDailyPlan: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    subscriptionId: 7, // subscriptionID if needed
    name: 'Wholesale Arbitrage $1',
    monthlyPrice: 0,
    annualPrice: 0,
    isDailyPlan: true,
  },
  {
    subscriptionId: 6, // subscriptionID if needed
    name: 'Starter',
    monthlyPrice: 37,
    annualPrice: 323,
    isDailyPlan: false,
  },
  {
    subscriptionId: 2, // subscriptionID if needed
    name: 'Professional',
    monthlyPrice: 97,
    annualPrice: 971,
    isDailyPlan: false,
  },
  {
    subscriptionId: 1, // subscriptionID if needed
    name: 'Team',
    monthlyPrice: 177,
    annualPrice: 1763,
    isDailyPlan: false,
  },
  {
    subscriptionId: 8, // subscriptionID if needed
    name: 'Seller Scout Pro',
    monthlyPrice: 117,
    annualPrice: 995,
    isDailyPlan: false,
  },
];
