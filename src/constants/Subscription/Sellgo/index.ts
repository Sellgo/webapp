import { SubscriptionPlan, SummaryDetails } from '../../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7, 13];
export const MONTHLY_AND_ANNUAL_PLANS_IDS = [10, 11, 12];
export const FREE_ACCOUNT_SUBSCRIPTION_ID = 5;

/* Used in webapp pricing page */
export const MONTHLY_AND_ANNUAL_PLANS = [
  {
    id: 10, // subscriptionID if needed
    name: 'Starter',
    displayName: 'Personal',
    productsDatabase: 0,
    salesEstimateCount: 1000,
    monthlyPrice: 77,
    annualPrice: 467,
    monthlyLookups: 100,
    annualLookups: 1200,
    desc: `Essential for finding your prospects`,
    featureSubName: 'Everything in Free, plus',
    featuresLists: [
      {
        title: '',
        featuresIncluded: [
          'Verified emails, direct phones and social media links',
          'Contact management',
          'Bulk export',
          'Basic CRM integration',
          'Seller map access',
        ],
      },
    ],
  },
  // {
  //   id: 11,
  //   name: 'Professional',
  //   productsDatabase: 0,
  //   salesEstimateCount: 2000,
  //   monthlyPrice: 147,
  //   annualPrice: 1187,
  //   monthlyLookups: 250,
  //   annualLookups: 3000,
  //   featureSubName: 'Everything in starter plan, plus',
  //   desc: `Filter the best seller, faster.`,
  //   featuresLists: [
  //     {
  //       title: 'Turn your leads into pipeline',
  //       featuresIncluded: [
  //         'Verified personal and other email(s),',
  //         'Mobile and direct phone number(s),',
  //         'Advanced analytics, and more,',
  //       ],
  //     },
  //   ],
  // },
  {
    id: 12,
    name: 'Elite',
    displayName: 'Business',
    productsDatabase: 0,
    salesEstimateCount: 3000,
    monthlyPrice: 347,
    annualPrice: 2987,
    monthlyLookups: 500,
    annualLookups: 6000,
    featureSubName: 'Everything in professional plan, plus',
    desc: `Perfect for small teams with simple workflows`,
    isNew: true,
    featuresLists: [
      {
        title: '',
        featuresIncluded: [
          'Advanced prospecting filter',
          'Bulk prospecting',
          'Advanced decision maker data',
          'Advanced company data',
          'Bulk prospecting (25 contacts)',
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
    monthlyPrice: 77,
    annualPrice: 467,
    isDailyPlan: false,
  },
  {
    subscriptionId: 11, // subscriptionID if needed
    name: 'Professional',
    dailyPrice: 0,
    monthlyPrice: 147,
    annualPrice: 1187,
    isDailyPlan: false,
  },
  {
    subscriptionId: 12, // subscriptionID if needed
    name: 'Elite',
    dailyPrice: 0,
    monthlyPrice: 347,
    annualPrice: 2987,
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
    name: 'Elite  (D)',
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
    displayName: 'Personal',
    id: 10,
    idWithLegacyPlans: [10, 6],
    monthlyPrice: 77,
    annualPrice: 467,
    dailyPrice: -1,
    monthlyLookups: 100,
    annualLookups: 1200,
    annualSavingPercentage: 49,
    subDescription: '',
    benefits: ['Full access to Chrome extension.', 'Limited access to seller database suite.', ''],
  },
  professional: {
    name: 'Professional',
    displayName: '',
    id: 11,
    idWithLegacyPlans: [11, 2],
    monthlyPrice: 147,
    annualPrice: 1187,
    monthlyLookups: 250,
    annualLookups: 3000,
    dailyPrice: -1,
    annualSavingPercentage: 33,
    subDescription: '',
    benefits: [
      'Full access in Chrome Extension + Sales Estimation',
      '5,000 Sellers in Seller Database or Seller Map per month',
      'Export data to spreadsheet',
    ],
  },
  team: {
    name: 'Elite',
    displayName: 'Business',
    id: 12,
    idWithLegacyPlans: [12, 1],
    monthlyPrice: 347,
    annualPrice: 2987,
    dailyPrice: -1,
    monthlyLookups: 700,
    annualLookups: 8400,
    annualSavingPercentage: 28,
    subDescription: '',
    benefits: [
      '20,000 Sellers in Seller Database or Seller Map per month',
      'Top view of 20,000 sellers in the Seller Map',
      'Export data to spreadsheet',
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
  if (planName === 'elite') {
    planName = 'team';
  }
  const DEFAULT_PLAN_ID = 10;
  const id = subscriptionDetailsMapping[planName];
  if (id) {
    return id;
  } else {
    return DEFAULT_PLAN_ID;
  }
};

export const getSubscriptionNameKey = (id: number) => {
  const subscriptionName = Object.keys(subscriptionDetailsMapping).find(
    (key: string) => subscriptionDetailsMapping[key] === id
  );
  return subscriptionName || '';
};

export const generateSubscriptionDetails = (planType: string) => {
  if (planType === 'elite') {
    planType = 'team';
  }
  if (!planType) {
    return SUBSCRIPTION_DETAILS.starter;
  }

  const planDetails = SUBSCRIPTION_DETAILS[planType];

  if (!planDetails) {
    return SUBSCRIPTION_DETAILS.starter;
  }
  return planDetails;
};
