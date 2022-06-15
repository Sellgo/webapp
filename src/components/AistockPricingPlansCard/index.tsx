import React from 'react';
import { v4 as uuid } from 'uuid';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PricingPlansCardHead from './PricingPlansCardHead';
import PricingPlansCardFeaturesList from './PricingPlansCardFeaturesList';

interface Props {
  // product details
  name: string;
  planId: number;
  setIsMonthly: (isMonthly: boolean) => void;
  requestChangeSubscription: (name: string, id: number) => void;
  monthlyPrice: number;
  launchDiscount: number;
  launchSaving: number;
  launchSavingPercentage: number;
  annualPrice: number;
  desc: string;
  featureSubName: string;
  featuresLists: any;
  isPurple?: boolean;
  // plan details
  isPaidSellerSubscription: boolean;
  isMonthly: boolean;
  className?: string;
  ctaText?: string;
}

const PricingPlansCard: React.FC<Props> = props => {
  const {
    name,
    setIsMonthly,
    monthlyPrice,
    launchDiscount,
    launchSaving,
    launchSavingPercentage,
    annualPrice,
    desc,
    featureSubName,
    featuresLists,
    isMonthly,
    className,
    isPurple,
    ctaText,
    planId,
    requestChangeSubscription,
    isPaidSellerSubscription,
  } = props;

  return (
    <div
      className={`${styles.pricingPlansCardWrapper}
			${className}`}
    >
      <div className={`${styles.pricingPlansCard}`}>
        <PricingPlansCardHead
          name={name}
          desc={desc}
          planId={planId}
          isPurple={isPurple}
          monthlyPrice={monthlyPrice}
          launchDiscount={launchDiscount}
          launchSaving={launchSaving}
          launchSavingPercentage={launchSavingPercentage}
          annualPrice={annualPrice}
          requestChangeSubscription={requestChangeSubscription}
          ctaText={ctaText}
          // plan details
          isPaidSellerSubscription={isPaidSellerSubscription}
          isMonthly={isMonthly}
          setIsMonthly={setIsMonthly}
        />

        <p className={styles.planType}>{featureSubName}</p>

        <div className={styles.pricingPlansCardBody}>
          {featuresLists.map((featureList: any) => {
            return <PricingPlansCardFeaturesList key={uuid()} {...featureList} />;
          })}
        </div>
      </div>
    </div>
  );
};

PricingPlansCard.defaultProps = {
  isPurple: false,
  className: '',
  ctaText: '',
};

export default PricingPlansCard;
