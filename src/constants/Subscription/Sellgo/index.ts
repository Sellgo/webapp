import { SubscriptionPlan, SummaryDetails } from '../../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7, 13];
export const FREE_ACCOUNT_SUBSCRIPTION_ID = 5;

/* Used in webapp pricing page */
export const MONTHLY_AND_ANNUAL_PLANS = [
  {
    id: 10, // subscriptionID if needed
    name: 'Starter',
    productsDatabase: 0,
    salesEstimateCount: 1000,
    monthlyPrice: 37,
    annualPrice: 324,
    desc: `Accelerate your seller research process`,
    featureSubName: 'Start with',
    featuresLists: [
      {
        title: 'Own your market',
        featuresIncluded: [
          'Accurate contacts and locations',
          'Basic seller revenue insights',
          'Basic seller map access',
        ],
      },
    ],
  },
  {
    id: 11,
    name: 'Professional',
    productsDatabase: 0,
    salesEstimateCount: 2000,
    monthlyPrice: 97,
    annualPrice: 924,
    featureSubName: 'Full single-user access, plus',
    desc: `Find the best seller, faster.`,
    isNew: true,
    featuresLists: [
      {
        title: 'Turn leads into pipeline',
        featuresIncluded: [
          'Essential contact data and advanced company insights',
          'Export data for annual plan',
          'Advanced quota',
        ],
      },
    ],
  },
  {
    id: 12,
    name: 'Team',
    productsDatabase: 0,
    salesEstimateCount: 3000,
    monthlyPrice: 177,
    annualPrice: 1764,
    featureSubName: 'Everything in professional plan, plus',
    desc: `Achieve more ROI.`,
    featuresLists: [
      {
        title: 'Hit revenue goals',
        featuresIncluded: [
          'Advanced seller research with accurate contact data',
          'Full use of Seller Database/ Map',
          'Seller Map top view 20,000 sellers',
        ],
      },
    ],
  },
];

/* Used in Change plan Modal */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    subscriptionId: 10, // subscriptionID if needed
    name: 'Starter',
    dailyPrice: 0,
    monthlyPrice: 37,
    annualPrice: 324,
    isDailyPlan: false,
  },
  {
    subscriptionId: 11, // subscriptionID if needed
    name: 'Professional',
    dailyPrice: 0,
    monthlyPrice: 97,
    annualPrice: 924,
    isDailyPlan: false,
  },
  {
    subscriptionId: 12, // subscriptionID if needed
    name: 'Team',
    dailyPrice: 0,
    monthlyPrice: 177,
    annualPrice: 1764,
    isDailyPlan: false,
  },
  {
    subscriptionId: 7, // subscriptionID if needed
    name: 'Wholesale Arbitrage $1 (D)',
    dailyPrice: 1,
    isLegacy: true,
    monthlyPrice: 0,
    annualPrice: 0,
    isDailyPlan: true,
  },
  {
    subscriptionId: 6, // subscriptionID if needed
    name: 'Starter (D)',
    dailyPrice: 0,
    isLegacy: true,
    monthlyPrice: 37,
    annualPrice: 323,
    isDailyPlan: false,
  },
  {
    subscriptionId: 2, // subscriptionID if needed
    name: 'Professional (D)',
    dailyPrice: 0,
    isLegacy: true,
    monthlyPrice: 97,
    annualPrice: 971,
    isDailyPlan: false,
  },
  {
    subscriptionId: 1, // subscriptionID if needed
    name: 'Team  (D)',
    dailyPrice: 0,
    isLegacy: true,
    monthlyPrice: 177,
    annualPrice: 1763,
    isDailyPlan: false,
  },
];

/* Used in Summary page */
export const SUBSCRIPTION_DETAILS: { [key: string]: SummaryDetails } = {
  starter: {
    name: 'Starter',
    id: 10,
    idWithLegacyPlans: [10, 6],
    monthlyPrice: 37,
    annualPrice: 324,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Full access to Chrome extension.',
      'Limited access to seller database suite.',
      '7-day money back guarantee',
    ],
  },
  professional: {
    name: 'Professional',
    id: 11,
    idWithLegacyPlans: [11, 2],
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
    idWithLegacyPlans: [12, 1],
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

export const SUBSCRIPTION_DETAILS_LIST: SummaryDetails[] = [
  SUBSCRIPTION_DETAILS.starter,
  SUBSCRIPTION_DETAILS.professional,
  SUBSCRIPTION_DETAILS.team,
];

export const subscriptionDetailsMapping: { [key: string]: number } = {
  starter: 10,
  professional: 11,
  team: 12,
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
