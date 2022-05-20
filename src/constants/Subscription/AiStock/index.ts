import { SubscriptionPlan, SummaryDetails } from '../../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7, 13];
export const FREE_TRIAL_SUBSCRIPTION_ID = 100;

/* Used in webapp pricing page */
export const MONTHLY_AND_ANNUAL_PLANS = [
  {
    id: 101, // subscriptionID if needed
    name: 'Starter',
    productsDatabase: 0,
    salesEstimateCount: 1000,
    monthlyPrice: 37,
    annualPrice: 324,
    desc: `Ideal for sellers with revenue up to USD $100K/mo`,
    featureSubName: 'Start with',
    featuresLists: [
      {
        title: 'Discover Best Selling',
        featuresIncluded: [
          'Full access to the Chrome Extension',
          'Limited access to the rest of Sellgo All-In-One tool',
        ],
      },
    ],
  },
  {
    id: 102,
    name: 'Professional',
    productsDatabase: 0,
    salesEstimateCount: 2000,
    monthlyPrice: 97,
    annualPrice: 924,
    featureSubName: 'Full single-user access, plus',
    desc: `Ideal for sellers with revenue up to USD $300K/mo`,
    isNew: true,
    featuresLists: [
      {
        title: 'Optimize Wholesale leads',
        featuresIncluded: [
          'Full access to Profit Finder',
          'Variation and Multipack analysis',
          'Leads Tracker',
        ],
      },
      {
        title: 'Seller Research',
        featuresIncluded: [
          'Locate Amazon sellers with Seller Database/ Map',
          'Check sellers inventory',
          'Brand level category filter',
        ],
      },
      {
        title: 'Keyword Research',
        featuresIncluded: [
          'Reveal competitor keywords with Keyword Finder',
          'Keyword tracking with Product Rank Tracker',
          'Rank drop/ raise index',
        ],
      },
    ],
  },
  {
    id: 103,
    name: 'Team',
    productsDatabase: 0,
    salesEstimateCount: 3000,
    monthlyPrice: 177,
    annualPrice: 1764,
    featureSubName: 'Everything in professional plan, plus',
    desc: `Ideal for sellers with revenue up to USD $500K/mo`,
    featuresLists: [
      {
        title: 'Product Research',
        featuresIncluded: [
          'Full access to Chrome Extension Sales Estimation',
          'Full access to Product Research (incoming soon)',
          'Historical Data up to 1-year',
        ],
      },
      {
        title: 'Seller Research',
        featuresIncluded: [
          'Full use of Seller Database/ Map',
          'Seller Map Top View 20,000 Sellers*',
        ],
      },
      {
        title: 'Keyword Research',
        featuresIncluded: [
          'Full Access to Keyword Finder/ Database',
          'True Rank Performance index',
          'PPC Recampaign with Zapier integration*',
        ],
      },
      {
        title: 'Advanced access',
        featuresIncluded: ['Multi-user login', 'Priority onboarding'],
      },
    ],
  },
];

/* Used in Change plan Modal */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    subscriptionId: 101, // subscriptionID if needed
    name: 'Aistock Starter',
    dailyPrice: 0,
    monthlyPrice: 37,
    annualPrice: 324,
    isDailyPlan: false,
  },
  {
    subscriptionId: 102, // subscriptionID if needed
    name: 'Aistock Professional',
    dailyPrice: 0,
    monthlyPrice: 97,
    annualPrice: 924,
    isDailyPlan: false,
  },
  {
    subscriptionId: 103, // subscriptionID if needed
    name: 'Aistock Team',
    dailyPrice: 0,
    monthlyPrice: 177,
    annualPrice: 1764,
    isDailyPlan: false,
  },
];

/* Used in Summary page */
export const SUBSCRIPTION_DETAILS: { [key: string]: SummaryDetails } = {
  starter: {
    name: 'Aistock Starter',
    id: 101,
    idWithLegacyPlans: [],
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
    name: 'Aistock Professional',
    id: 102,
    idWithLegacyPlans: [],
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
    name: 'Aistock Team',
    id: 103,
    idWithLegacyPlans: [],
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
  starter: 101,
  professional: 102,
  team: 103,
};

export const getSubscriptionID = (planName: string) => {
  const DEFAULT_PROFESSIONAL_PLAN_ID = 102;
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
