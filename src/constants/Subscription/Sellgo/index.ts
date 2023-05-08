import { SubscriptionPlan, SummaryDetails } from '../../../interfaces/Subscription';

export const DAILY_SUBSCRIPTION_PLANS = [7, 13];
export const MONTHLY_AND_ANNUAL_PLANS_IDS = [30, 11, 32];
export const FREE_ACCOUNT_SUBSCRIPTION_ID = 5;

/* Used in webapp pricing page */
export const MONTHLY_AND_ANNUAL_PLANS = [
  {
    id: 30, // subscriptionID if needed
    name: 'Starter',
    displayName: 'Professional',
    productsDatabase: 0,
    salesEstimateCount: 1000,
    monthlyPrice: 499,
    annualPrice: 4790,
    monthlyLookups: 1000,
    annualLookups: 12000,
    desc: `Essential for finding your prospects`,
    featureSubName: 'Start with:',
    featuresLists: [
      {
        title: '',
        featuresIncluded: ['Unlimited search', 'Bulk list export', 'CRM integration'],
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
    id: 32,
    name: 'Elite',
    displayName: 'Business',
    productsDatabase: 0,
    salesEstimateCount: 3000,
    monthlyPrice: 999,
    annualPrice: 9590,
    monthlyLookups: 3000,
    annualLookups: 36000,
    featureSubName: 'Everything in Professional plan, plus',
    desc: `Perfect for small teams with simple workflows`,
    isNew: true,
    featuresLists: [
      {
        title: '',
        featuresIncluded: [
          'Buying intent signals',
          'Decision maker enrichment',
          'Advanced engagement',
        ],
      },
    ],
  },
];

/* Used in Change plan Modal */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    subscriptionId: 30, // subscriptionID if needed
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
    subscriptionId: 32, // subscriptionID if needed
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
    displayName: 'Professional',
    id: 30,
    idWithLegacyPlans: [30, 10, 6],
    monthlyPrice: 499,
    annualPrice: 4790,
    dailyPrice: -1,
    monthlyLookups: 1000,
    annualLookups: 12000,
    annualSavingPercentage: 20,
    subDescription: '',
    benefits: ['Full access to Chrome extension.', 'Limited access to seller database suite.', ''],
    monthlyBenefits: [
      { name: 'checked', description: '1. 1 user' },
      { name: 'checked', description: '2. 1,000 brand insights per month' },
      { name: 'checked', description: '3. Contact info with emails' },
    ],
    annuallyBenefits: [
      { name: 'checked', description: '1. 1 user' },
      { name: 'checked', description: '2. 12,000 brand insights per year, get all upfront' },
      { name: 'checked', description: '3. Contact info with emails' },
    ],
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
    id: 32,
    idWithLegacyPlans: [32, 12, 1],
    monthlyPrice: 999,
    annualPrice: 9590,
    dailyPrice: -1,
    monthlyLookups: 3000,
    annualLookups: 36000,
    annualSavingPercentage: 20,
    subDescription: '',
    benefits: [
      '20,000 Sellers in Seller Database or Seller Map per month',
      'Top view of 20,000 sellers in the Seller Map',
      'Export data to spreadsheet',
    ],
    monthlyBenefits: [
      { name: 'checked', description: '1. Start at 5 users' },
      { name: 'checked', description: '2. 3,000 brand insights per month' },
      { name: 'checked', description: '3. Contact info with emails, phones, social media' },
    ],
    annuallyBenefits: [
      { name: 'checked', description: '1. Start at 5 users' },
      { name: 'checked', description: '2. 36,000 brand insights per year, get all upfront' },
      { name: 'checked', description: '3. Contact info with emails, phones, social media' },
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
  starter: 30,
  professional: 11,
  team: 32,
};

export const subscriptionDetailsMappingById: { [key: number]: string } = {
  30: 'starter',
  11: 'professional',
  32: 'team',
};

export const subscriptionDetailsMappingByPlanName: { [key: string]: string } = {
  personal: 'starter',
  business: 'team',
};

export const getSubscriptionID = (planName: string) => {
  if (planName === 'elite') {
    planName = 'team';
  }
  const DEFAULT_PLAN_ID = 30;
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

export const getSubscriptionDetailsById = (planId: number) => {
  const planType = subscriptionDetailsMappingById[planId];
  return generateSubscriptionDetails(planType);
};

export const isSubscriptionUpgrading = (
  currentSubscription: SummaryDetails,
  isCurrentSubscriptionBilledMonthly: boolean,
  selectedSubscription: SummaryDetails,
  isSelectedSubscriptionBilledMonthly: boolean
) => {
  const currentPrice = isCurrentSubscriptionBilledMonthly
    ? currentSubscription.monthlyPrice
    : currentSubscription.annualPrice;
  const comparisonPrice = isSelectedSubscriptionBilledMonthly
    ? selectedSubscription.monthlyPrice
    : selectedSubscription.annualPrice;
  return comparisonPrice > currentPrice;
};
