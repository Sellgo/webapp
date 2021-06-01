export interface SummaryDetails {
  name: string;
  subDescription: string;
  benefits: string[];
  id: number;
  monthlyPrice: number;
  annualPrice: number;
}

export const subscriptionDetails: { [key: string]: SummaryDetails } = {
  starter: {
    name: 'Starter',
    id: 6,
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
  suite: {
    name: 'Suite',
    id: 1,
    monthlyPrice: 69,
    annualPrice: 588,
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '200 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  professional: {
    name: 'Professional',
    id: 2,
    monthlyPrice: 129,
    annualPrice: 996,
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
    return subscriptionDetails.suite;
  }

  const planDetails = subscriptionDetails[planType];

  if (!planDetails) {
    return subscriptionDetails.suite;
  }
  return planDetails;
};
