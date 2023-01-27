import { SubscriptionPlan, SummaryDetails } from '../../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7, 13];
export const MONTHLY_AND_ANNUAL_PLANS_IDS = [10, 11, 12];
export const FREE_ACCOUNT_SUBSCRIPTION_ID = 5;

/* Used in webapp pricing page */
export const MONTHLY_AND_ANNUAL_PLANS = [
  {
    id: 10, // subscriptionID if needed
    name: 'Starter',
    productsDatabase: 0,
    salesEstimateCount: 1000,
    monthlyPrice: 77,
    annualPrice: 467,
    monthlyLookups: 100,
    annualLookups: 1400,
    desc: `Accelerate your seller research process.`,
    featureSubName: 'Start with',
    featuresLists: [
      {
        title: 'Own your market',
        featuresIncluded: [
          'Verified professional email(s)',
          'Basic seller insights',
          'Seller map access',
        ],
      },
    ],
  },
  {
    id: 11,
    name: 'Professional',
    productsDatabase: 0,
    salesEstimateCount: 2000,
    monthlyPrice: 147,
    annualPrice: 1187,
    monthlyLookups: 240,
    annualLookups: 3600,
    featureSubName: 'Everything in starter plan, plus',
    desc: `Filter the best seller, faster.`,
    isNew: true,
    featuresLists: [
      {
        title: 'Turn your leads into pipeline',
        featuresIncluded: [
          'Verified personal and other email(s),',
          'Mobile and direct phone number(s),',
          'Send physical mail integration, and more,',
        ],
      },
    ],
  },
  {
    id: 12,
    name: 'Elite',
    productsDatabase: 0,
    salesEstimateCount: 3000,
    monthlyPrice: 297,
    annualPrice: 2987,
    monthlyLookups: 800,
    annualLookups: 12000,
    featureSubName: 'Everything in professional plan, plus',
    desc: `Achieve more ROI.`,
    featuresLists: [
      {
        title: 'Hit your ambitious revenue goals',
        featuresIncluded: [
          'Social Media link/ username(s)*',
          'Zapier, Hubspot and Salesforce integrations',
          'Data/ CRM enrichments',
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
    monthlyPrice: 297,
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
    id: 10,
    idWithLegacyPlans: [10, 6],
    monthlyPrice: 77,
    annualPrice: 467,
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
    monthlyPrice: 147,
    annualPrice: 1187,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
    benefits: [
      'Full access in Chrome Extension + Sales Estimation',
      '5,000 Sellers in Seller Database or Seller Map per month',
      'Export data to spreadsheet',
    ],
  },
  team: {
    name: 'Elite',
    id: 12,
    idWithLegacyPlans: [12, 1],
    monthlyPrice: 297,
    annualPrice: 2987,
    dailyPrice: -1,
    subDescription: '7-Days Money Back Guarantee',
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
  // if (planType === 'elite') {
  //   planType = 'team';
  // }
  if (!planType) {
    return SUBSCRIPTION_DETAILS.starter;
  }

  const planDetails = SUBSCRIPTION_DETAILS[planType];

  if (!planDetails) {
    return SUBSCRIPTION_DETAILS.starter;
  }
  return planDetails;
};
