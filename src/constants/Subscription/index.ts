import { SubscriptionPlan, SummaryDetails } from '../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7, 13];
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    subscriptionId: 13, // subscriptionID if needed
    name: 'Wholesale Arbitrage $1.99',
    monthlyPrice: 0,
    annualPrice: 0,
    isDailyPlan: true,
  },
  {
    subscriptionId: 10, // subscriptionID if needed
    name: 'Starter',
    monthlyPrice: 37,
    annualPrice: 324,
    isDailyPlan: false,
  },
  {
    subscriptionId: 11, // subscriptionID if needed
    name: 'Professional',
    monthlyPrice: 97,
    annualPrice: 924,
    isDailyPlan: false,
  },
  {
    subscriptionId: 12, // subscriptionID if needed
    name: 'Team',
    monthlyPrice: 177,
    annualPrice: 1764,
    isDailyPlan: false,
  },
];

export const SUBSCRIPTION_DETAILS: { [key: string]: SummaryDetails } = {
  wholesalearbitrage$2: {
    name: 'Wholesale Arbitrage $1.99',
    id: 13,
    monthlyPrice: -1,
    annualPrice: -1,
    dailyPrice: 1.99,
    subDescription: '',
    benefits: ['Basic Wholesale, Retail Arbitrage', 'Unlimited access in our Profit Finder'],
  },
  starter: {
    name: 'Starter',
    id: 10,
    monthlyPrice: 37,
    annualPrice: 324,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Chrome Extension + 1,000 Sales Estimation/ month',
      'Basic Seller Research',
      'Basic Keyword Research',
      'Sellgo support',
    ],
  },
  professional: {
    name: 'Professional',
    id: 11,
    monthlyPrice: 97,
    annualPrice: 924,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Full access in Chrome Extension + Sales Estimation',
      '1,500 Sellers in Seller Database or Map per month',
      'Full access (export) of Seller Research (Annual Pay)',
      '5,000 tracking keywords in the Product Rank Tracker',
      'Unlimited access in our Profit Finder',
      'Zapier Integration',
    ],
  },
  team: {
    name: 'Team',
    id: 12,
    monthlyPrice: 177,
    annualPrice: 1764,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Full access in Chrome Extension + Sales Estimation',
      '5,000 Sellers in Seller Database or Map per month',
      'Full access (export) of Seller Research (Annual Pay)',
      '8,000 tracking keywords in the Product Rank Tracker',
      'Unlimited access in our Profit Finder',
      'Zapier Integration',
    ],
  },
};

export const PAYMENT_MODES = ['daily', 'monthly', 'yearly'];

export const PROMO_START_DATE = '2021-11-5';
export const PROMO_CAMPAIGNS = ['beta'];
export const BETA_FIRST_300 = 'OZGVRR33';
export const BETA_SECOND_700 = 'L9PHLXY1';

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
  const DEFAULT_PROFESSIONAL_PLAN_ID = 11;
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
