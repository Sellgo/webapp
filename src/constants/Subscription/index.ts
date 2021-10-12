import { SubscriptionPlan, SummaryDetails } from '../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7];
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
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

export const SUBSCRIPTION_DETAILS: { [key: string]: SummaryDetails } = {
  wholesalearbitrage$1: {
    name: 'Wholesale Arbitrage $1',
    id: 7,
    monthlyPrice: -1,
    annualPrice: -1,
    dailyPrice: 1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '200 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  starter: {
    name: 'Starter',
    id: 6,
    monthlyPrice: 37,
    annualPrice: 323,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '1000 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  professional: {
    name: 'Professional',
    id: 2,
    monthlyPrice: 97,
    annualPrice: 971,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '1000 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  sellerscoutpro: {
    name: 'Seller Scout Pro',
    id: 8,
    monthlyPrice: 117,
    annualPrice: 995,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '1000 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  team: {
    name: 'Team',
    id: 1,
    monthlyPrice: 177,
    annualPrice: 1763,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '1000 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
};

export const PAYMENT_MODES = ['daily', 'monthly', 'yearly'];

export const SUBSCRIPTION_DETAILS_LIST: SummaryDetails[] = [
  SUBSCRIPTION_DETAILS.wholesalearbitrage$1,
  SUBSCRIPTION_DETAILS.starter,
  SUBSCRIPTION_DETAILS.professional,
  SUBSCRIPTION_DETAILS.team,
  SUBSCRIPTION_DETAILS.sellerscoutpro,
];

export const subscriptionDetailsMapping: { [key: string]: number } = {
  starter: 6,
  professional: 2,
  sellerscoutpro: 8,
  team: 1,
  wholesalearbitrage$1: 7,
  privatelabel$1: 9,
};

export const getSubscriptionID = (planName: string) => {
  const DEFAULT_PROFESSIONAL_PLAN_ID = 2;
  const id = subscriptionDetailsMapping[planName];
  if (id) {
    return id;
  } else {
    return DEFAULT_PROFESSIONAL_PLAN_ID;
  }
};

export const getSubscriptionNameKey = (id: number) => {
  const subscriptionName = Object.keys(subscriptionDetailsMapping).find(
    (key: string) => subscriptionDetailsMapping[key] === id
  );
  return subscriptionName || '';
};

export const generateSubscriptionDetails = (planType: string) => {
  if (!planType) {
    return SUBSCRIPTION_DETAILS.starter;
  }

  const planDetails = SUBSCRIPTION_DETAILS[planType];

  if (!planDetails) {
    return SUBSCRIPTION_DETAILS.starter;
  }
  return planDetails;
};
