import React from 'react';

/* Components */
import GenericPlanCardHead from '../GenericPlanCardHead';

interface Props {
  // product details
  name: string;
  monthlyPrice: number;
  launchDiscount: number;
  launchSaving: number;
  launchSavingPercentage: number;
  annualPrice: number;
  desc: string;

  // plan details
  planId: number;
  isMonthly: boolean;
  setIsMonthly: (isMonthly: boolean) => void;
  isPaidSellerSubscription: boolean;

  // used for price summary card head inside table comparision
  withToggle?: boolean;
  className?: string;
  isNew?: boolean;
  isSmall?: boolean;
  isPurple?: boolean;
  handleChange?: () => any;
  ctaText?: string;
  requestChangeSubscription: (name: string, id: number, mode: string) => void;
}

const PricingPlansCardHead: React.FC<Props> = props => {
  const {
    name,
    monthlyPrice,
    launchDiscount,
    launchSaving,
    launchSavingPercentage,
    annualPrice,
    desc,
    isNew,
    isMonthly,
    setIsMonthly,
    withToggle,
    handleChange,
    isSmall,
    isPurple,
    ctaText,
    planId,
    requestChangeSubscription,
    className,
    isPaidSellerSubscription,
  } = props;

  return (
    <>
      <GenericPlanCardHead
        isPurple={isPurple}
        isNew={isNew}
        isSmall={isSmall}
        name={name}
        desc={desc}
        monthlyPrice={monthlyPrice}
        launchDiscount={launchDiscount}
        launchSaving={launchSaving}
        launchSavingPercentage={launchSavingPercentage}
        setIsMonthly={setIsMonthly}
        annualPrice={annualPrice}
        isMonthly={isMonthly}
        planId={planId}
        requestChangeSubscription={requestChangeSubscription}
        isPaidSellerSubscription={isPaidSellerSubscription}
        // Optional props
        withToggle={withToggle}
        ctaText={ctaText}
        className={className}
        handleChange={handleChange}
      />
    </>
  );
};

PricingPlansCardHead.defaultProps = {
  withToggle: false,
  className: '',
  isNew: false,
  isSmall: false,
  isPurple: false,
  handleChange: () => null,
  ctaText: '',
};

export default PricingPlansCardHead;
