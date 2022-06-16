export type UNITS_SOLD_TYPE =
  | '1,000'
  | '2,000'
  | '3,000'
  | '5,000'
  | '8,000'
  | '13,000'
  | '21,000'
  | '34,000'
  | '55,000';

export const UNITS_SOLD_PER_MONTH: any = {
  11: '1,000',
  22: '2,000',
  33: '3,000',
  44: '5,000',
  55: '8,000',
  66: '13,000',
  77: '21,000',
  88: '34,000',
  100: '55,000',
};

export const PLAN_PRICE_PER_UNITS_SOLD = {
  '1,000': 77,
  '2,000': 87,
  '3,000': 97,
  '5,000': 117,
  '8,000': 147,
  '13,000': 187,
  '21,000': 227,
  '34,000': 267,
  '55,000': 327,
};

export const LAUNCH_SAVING_PERCENTAGE_PER_UNITS_SOLD = {
  '1,000': 61,
  '2,000': 49,
  '3,000': 38,
  '5,000': 32,
  '8,000': 31,
  '13,000': 30,
  '21,000': 29,
  '34,000': 25,
  '55,000': 23,
};

export const LAUNCH_SAVING_PER_UNITS_SOLD = {
  '1,000': 47.03,
  '2,000': 43.03,
  '3,000': 37.03,
  '5,000': 37.03,
  '8,000': 47.03,
  '13,000': 57.03,
  '21,000': 67.03,
  '34,000': 67.03,
  '55,000': 77.03,
};

export const LAUNCH_DISCOUNT_PER_UNITS_SOLD = {
  '1,000': 29.97,
  '2,000': 43.97,
  '3,000': 59.97,
  '5,000': 79.97,
  '8,000': 99.97,
  '13,000': 129.97,
  '21,000': 159.97,
  '34,000': 199.97,
  '55,000': 249.97,
};

export const PRE_LAUNCH_PLAN = {
  id: 102,
  name: 'New-launch companies',
  monthlyPrice: 77,
  annualPrice: 804,
  ctaText: '$77 billed today, $197/ mo after that',
  desc: `usually with average annual revenue less than USD $700k.`,
  featureSubName: 'Update your supply chain system with',
  featuresLists: [
    {
      title: 'Take control your inventory system',
      featuresIncluded: [
        'Never out ot stock again, minimize sales loss',
        'Streamline and automate your future next orders',
        'Improve your supply chain efficiency with smart order system',
      ],
    },
    {
      title: 'Unlock growth & profits',
      featuresIncluded: [
        'Unlock your sales peak and seasonality',
        'Unlock your logistic savings',
        'Optimize your 3PL transfers, reimbursement eligibility, and more',
      ],
    },
    {
      title: 'Project cash flow',
      featuresIncluded: [
        'Project future healthy cash flow',
        'Bring financial into focus',
        'Keep your business in high liquidity all the time, and many more',
      ],
    },
  ],
};

export const SOLOPRENEUR_PLAN = {
  id: 102,
  name: 'Solopreneur companies',
  monthlyPrice: 97,
  annualPrice: 1001,
  ctaText: '$77 billed today, $197/ mo after that',
  desc: `usually with average annual revenue above USD $1M.`,
  featureSubName: 'Update your supply chain system with',
  featuresLists: [
    {
      title: 'Take control your inventory system',
      featuresIncluded: [
        'Never out ot stock again, minimize sales loss',
        'Streamline and automate your future next orders',
        'Improve your supply chain efficiency with smart order system',
      ],
    },
    {
      title: 'Unlock growth & profits',
      featuresIncluded: [
        'Unlock your sales peak and seasonality',
        'Unlock your logistic savings',
        'Optimize your 3PL transfers, reimbursement eligibility, and more',
      ],
    },
    {
      title: 'Project cash flow',
      featuresIncluded: [
        'Project future healthy cash flow',
        'Bring financial into focus',
        'Keep your business in high liquidity all the time, and many more',
      ],
    },
  ],
};

export const SMALL_TEAM_SELLER_PLAN = {
  id: 102,
  name: 'Teampreneur companies',
  monthlyPrice: 77,
  annualPrice: 805,
  ctaText: '$77 billed today, $197/ mo after that',
  desc: `usually with average annual revenue $2-5M.`,
  featureSubName: 'Update your supply chain system with',
  featuresLists: [
    {
      title: 'Take control your inventory system',
      featuresIncluded: [
        'Never out ot stock again, minimize sales loss',
        'Streamline and automate your future next orders',
        'Improve your supply chain efficiency with smart order system',
      ],
    },
    {
      title: 'Unlock growth & profits',
      featuresIncluded: [
        'Unlock your sales peak and seasonality',
        'Unlock your logistic savings',
        'Optimize your 3PL transfers, reimbursement eligibility, and more',
      ],
    },
    {
      title: 'Project cash flow',
      featuresIncluded: [
        'Project future healthy cash flow',
        'Bring financial into focus',
        'Keep your business in high liquidity all the time, and many more',
      ],
    },
  ],
};

export const MATURE_BRAND_PLAN = {
  id: 102,
  name: 'Fast-growth brands',
  monthlyPrice: 77,
  annualPrice: 805,
  ctaText: '$77 billed today, $197/ mo after that',
  desc: `usually with average annual revenue USD $6-20M.`,
  featureSubName: 'Update your supply chain system with',
  featuresLists: [
    {
      title: 'Take control your inventory system',
      featuresIncluded: [
        'Never out ot stock again, minimize sales loss',
        'Streamline and automate your future next orders',
        'Improve your supply chain efficiency with smart order system',
      ],
    },
    {
      title: 'Unlock growth & profits',
      featuresIncluded: [
        'Unlock your sales peak and seasonality',
        'Unlock your logistic savings',
        'Optimize your 3PL transfers, reimbursement eligibility, and more',
      ],
    },
    {
      title: 'Project cash flow',
      featuresIncluded: [
        'Project future healthy cash flow',
        'Bring financial into focus',
        'Keep your business in high liquidity all the time, and many more',
      ],
    },
  ],
};

export const ENTERPRISE_PLAN = {
  title: 'Enterprises or Agencies',
  subtitle: 'Do you manage multiple brands that have different account owners?',
  planName: 'We solve multichannel challenges with singular focus',
  featuresLists: [
    {
      title: 'Multiple omni',
      featuresIncluded: ['Omni brands', 'Omni store accounts', 'Omni users, and many more'],
    },
    {
      title: 'Business success',
      featuresIncluded: [
        'Dedicated account manager',
        '24/7 stellar tech support',
        'API integration, and many more',
      ],
    },
    {
      title: 'Data security',
      featuresIncluded: [
        'Secure via 256-BIT SSL',
        'Encryption at channel and storage',
        'Data owned by you, and many more',
      ],
    },
  ],
};

export const SELLER_TYPE_PER_UNITS_SOLD = {
  '1,000': PRE_LAUNCH_PLAN,
  '2,000': PRE_LAUNCH_PLAN,
  '3,000': SOLOPRENEUR_PLAN,
  '5,000': SOLOPRENEUR_PLAN,
  '8,000': SMALL_TEAM_SELLER_PLAN,
  '13,000': SMALL_TEAM_SELLER_PLAN,
  '21,000': MATURE_BRAND_PLAN,
  '34,000': MATURE_BRAND_PLAN,
  '55,000': MATURE_BRAND_PLAN,
};

export const getPlanPrice = (unitsSold: UNITS_SOLD_TYPE) => {
  if (PLAN_PRICE_PER_UNITS_SOLD[unitsSold]) {
    return PLAN_PRICE_PER_UNITS_SOLD[unitsSold];
  } else {
    return 0;
  }
};

export const getLaunchDiscount = (unitsSold: UNITS_SOLD_TYPE) => {
  if (LAUNCH_DISCOUNT_PER_UNITS_SOLD[unitsSold]) {
    return LAUNCH_DISCOUNT_PER_UNITS_SOLD[unitsSold];
  } else {
    return 0;
  }
};

export const getLaunchSaving = (unitsSold: UNITS_SOLD_TYPE) => {
  if (LAUNCH_SAVING_PER_UNITS_SOLD[unitsSold]) {
    return LAUNCH_SAVING_PER_UNITS_SOLD[unitsSold];
  } else {
    return 0;
  }
};

export const getLaunchSavingPercentage = (unitsSold: UNITS_SOLD_TYPE) => {
  if (LAUNCH_SAVING_PERCENTAGE_PER_UNITS_SOLD[unitsSold]) {
    return LAUNCH_SAVING_PERCENTAGE_PER_UNITS_SOLD[unitsSold];
  } else {
    return 0;
  }
};

export const getSliderValue = (unitsSold: UNITS_SOLD_TYPE) => {
  return (
    Object.keys(UNITS_SOLD_PER_MONTH).find((key: any) => UNITS_SOLD_PER_MONTH[key] === unitsSold) ||
    '0'
  );
};

export const getSellerPlan = (unitsSold: UNITS_SOLD_TYPE) => {
  const plan = SELLER_TYPE_PER_UNITS_SOLD[unitsSold];
  return {
    ...plan,
    ctaText: `$0 billed today, $${getPlanPrice(unitsSold)}/ mo after that`,
  };
};

export const getSellerLaunchDiscount = (unitsSold: UNITS_SOLD_TYPE) => {
  const plan = SELLER_TYPE_PER_UNITS_SOLD[unitsSold];
  return {
    ...plan,
    ctaText: `$0 billed today, $${getLaunchDiscount(unitsSold)}/ mo after that`,
  };
};

export const getNearestUnitsSold = (unitsSold: number) => {
  if (!unitsSold) {
    return '1,000';
  }
  const listOfUnitsSold = Object.keys(PLAN_PRICE_PER_UNITS_SOLD);
  let currentNearestUnitsSold = '';
  listOfUnitsSold.forEach(units => {
    const unitsSoldMilestone = parseInt(units.replace(/,/g, ''), 10);
    if (unitsSoldMilestone >= unitsSold) {
      if (currentNearestUnitsSold === '') {
        currentNearestUnitsSold = units;
      } else {
        const currentNearestUnitsSoldMilestone = parseInt(
          currentNearestUnitsSold.replace(/,/g, ''),
          10
        );
        const newDiff = unitsSoldMilestone - unitsSold;
        const currDiff = currentNearestUnitsSoldMilestone - unitsSold;
        if (newDiff <= currDiff) {
          currentNearestUnitsSold = units;
        }
      }
    }
  });
  if (!currentNearestUnitsSold) {
    currentNearestUnitsSold = '55,000';
  }

  return currentNearestUnitsSold;
};
