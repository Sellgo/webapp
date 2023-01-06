/* Interfaces */
import { KeyValuePair } from '../interfaces/Generic';

import {
  pay1DollarPlan,
  payMonthlyAndAnnualPlan,
} from '../constants/Pricing/SellgoPricing/allFeaturesTable';

export const allPlansFeatureMapper: KeyValuePair = {
  'Pricing & Plans': payMonthlyAndAnnualPlan,
  'Pay $1 for a day': pay1DollarPlan,
};

export const getAllFeaturesForPlans = (planName: string) => {
  const allFeatures = allPlansFeatureMapper[planName];
  if (!allFeatures) {
    return [
      {
        header: [],
        body: [[]],
      },
    ];
  }
  return allFeatures;
};
