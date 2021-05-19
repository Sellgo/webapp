export interface SummaryDetails {
  name: string;
  yearlyPrice: number;
  monthlyPrice: number;
  subDescription: string;
  benefits: string[];
}

export const subscriptionDetails: any = {
  professional: {
    name: 'Professional',
    yearlyPrice: 334,
    monthlyPrice: 12,
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '100 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
  starter: {
    name: 'Starter',
    yearlyPrice: 334,
    monthlyPrice: 12,
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
    yearlyPrice: 334,
    monthlyPrice: 12,
    subDescription: '14-Days Money Back Guarantee',
    benefits: [
      'Manage your supplier files in Supplier Management',
      '100 Products can be tracked through Product Tracker',
      'Unlimited access in our Profit Finder',
      'Sellgo support',
    ],
  },
};

export const generateSubscriptionDetails = (planType: string) => {
  if (!planType) {
    return subscriptionDetails.professional;
  }

  const planDetails = subscriptionDetails[planType];

  if (!planDetails) {
    return subscriptionDetails.professional;
  }
  return planDetails;
};
