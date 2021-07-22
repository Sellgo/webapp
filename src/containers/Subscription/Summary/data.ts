export interface SummaryDetails {
  name: string;
  subDescription: string;
  benefits: string[];
  id: number;
  monthlyPrice: number;
  annualPrice: number;
}

export const subscriptionDetails: { [key: string]: SummaryDetails } = {
  enterprise: {
    name: 'Enterprise',
    id: 3,
    monthlyPrice: 49,
    annualPrice: 348,
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '100 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  wholesalearbitrage$1: {
    name: 'Wholesale Arbitrage $1',
    id: 7,
    monthlyPrice: 1,
    annualPrice: 1,
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '200 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  privatelabel$1: {
    name: 'Private Label $1',
    id: 9,
    monthlyPrice: 1,
    annualPrice: 1,
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '1000 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  starter: {
    name: 'Starter',
    id: 6,
    monthlyPrice: 37,
    annualPrice: 323,
    subDescription: '14-Days Money Back Guarantee',
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
    subDescription: '14-Days Money Back Guarantee',
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
    subDescription: '14-Days Money Back Guarantee',
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
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '1000 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
};

export const generateSubscriptionDetails = (planType: string) => {
  if (!planType) {
    return subscriptionDetails.starter;
  }

  const planDetails = subscriptionDetails[planType];

  if (!planDetails) {
    return subscriptionDetails.starter;
  }
  return planDetails;
};
