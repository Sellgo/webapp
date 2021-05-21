import React from 'react';

/* Components */
import GenericPlanCardHead from '../GenericPlanCardHead';

interface Props {
  name: string;
  productsDatabase: number;
  annualPrice: number;
  planName: string;
  salesEstimateCount: number;
  isMonthly: boolean;
  monthlyPrice: number;
  desc: string;
  withToggle?: boolean;
  className?: string;
  handleChange?: (state: boolean) => any;
}

const PricingPlansCardHead: React.FC<Props> = props => {
  return (
    <>
      <GenericPlanCardHead {...props} />
    </>
  );
};

export default PricingPlansCardHead;
