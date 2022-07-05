import { SubscriptionPlan, SummaryDetails } from '../../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7, 13];
export const FREE_TRIAL_SUBSCRIPTION_ID = 100;

/* Used in webapp pricing page */
export const MONTHLY_AND_ANNUAL_PLANS = [
  {
    id: 105, // subscriptionID if needed
    name: 'New-launch companies',
    productsDatabase: 0,
    salesEstimateCount: 1000,
    monthlyPrice: 77,
    annualPrice: 739.2,
    desc: `usually with an average annual revenue less than USD $700k.`,
    featureSubName: 'Start with',
    featuresLists: [
      {
        title: 'Best inventory optimization starts here',
        featuresIncluded: [
          'Full access to the AiStock all-in-one inventory suite',
          'Smart order future 12 month',
          '25 SKUs per Amazon store',
          '5,000 units sold/ mo',
        ],
      },
    ],
  },
];

/* Used in Change plan Modal */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    subscriptionId: 105, // subscriptionID if needed
    name: 'Aistock',
    dailyPrice: 0,
    monthlyPrice: 77,
    annualPrice: 739.2,
    isDailyPlan: false,
  },
];

/* Used in Summary page */
export const SUBSCRIPTION_DETAILS: { [key: string]: SummaryDetails } = {
  aistock: {
    name: 'New-launch companies',
    id: 105,
    idWithLegacyPlans: [],
    monthlyPrice: 77,
    annualPrice: 739.2,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Chrome Extension + 1,000 Sales Estimation/ month',
      'Basic Seller Research',
      'Basic Keyword Research',
      'Sellgo support',
    ],
  },
};

export const PAYMENT_MODES = ['daily', 'monthly', 'yearly'];

export const SUBSCRIPTION_DETAILS_LIST: SummaryDetails[] = [SUBSCRIPTION_DETAILS.aistock];

export const subscriptionDetailsMapping: { [key: string]: number } = {
  aistock: 105,
};

export const getSubscriptionID = (planName: string) => {
  const DEFAULT_PROFESSIONAL_PLAN_ID = 105;
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

export const SUBSCRIPTION_PURCHASE_PHASES = {
  EMAIL_INPUT: 'EMAIL_INPUT',
  PAYMENT_INPUT: 'PAYMENT_INPUT',
};
