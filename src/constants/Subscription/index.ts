import { SubscriptionPlan, SummaryDetails } from '../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7];
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    subscriptionId: 13, // subscriptionID if needed
    name: 'Wholesale Arbitrage $2',
    monthlyPrice: 0,
    annualPrice: 0,
    isDailyPlan: true,
  },
  {
    subscriptionId: 10, // subscriptionID if needed
    name: 'Starter',
    monthlyPrice: 49,
    annualPrice: 348,
    isDailyPlan: false,
  },
  {
    subscriptionId: 11, // subscriptionID if needed
    name: 'Professional',
    monthlyPrice: 99,
    annualPrice: 828,
    isDailyPlan: false,
  },
  {
    subscriptionId: 12, // subscriptionID if needed
    name: 'Team',
    monthlyPrice: 119,
    annualPrice: 1068,
    isDailyPlan: false,
  },
];

export const SUBSCRIPTION_DETAILS: { [key: string]: SummaryDetails } = {
  wholesalearbitrage$2: {
    name: 'Wholesale Arbitrage $2',
    id: 13,
    monthlyPrice: -1,
    annualPrice: -1,
    dailyPrice: 1.99,
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
    id: 10,
    monthlyPrice: 49,
    annualPrice: 348,
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
    id: 11,
    monthlyPrice: 99,
    annualPrice: 828,
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
    id: 12,
    monthlyPrice: 119,
    annualPrice: 1068,
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
  SUBSCRIPTION_DETAILS.wholesalearbitrage$2,
  SUBSCRIPTION_DETAILS.starter,
  SUBSCRIPTION_DETAILS.professional,
  SUBSCRIPTION_DETAILS.team,
];

export const subscriptionDetailsMapping: { [key: string]: number } = {
  starter: 10,
  professional: 11,
  team: 12,
  wholesalearbitrage$2: 13,
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
