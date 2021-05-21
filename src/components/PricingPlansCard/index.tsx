import React from 'react';
import { v4 as uuid } from 'uuid';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PricingPlansCardFeaturesList from './PricingPlansCardFeaturesList';
import GenericPriceCardHead from './GenericPlanCardHead';

interface Props {
  name: string;
  salesEstimateCount: number;
  annualPrice: number;
  featuresLists: any;
  featureSubName: string;
  isMonthly: boolean;
  monthlyPrice: number;
  desc: string;
  subscriptionId: number;
  sellerSubscription: any;
  subscribedSubscription: any;
  subscriptionType: string;
  promptCancelSubscription: () => void;
  changePlan: (details: any) => void;
}

const PricingPlansCard: React.FC<Props> = props => {
  const {
    name,
    subscriptionId,
    annualPrice,
    featuresLists,
    featureSubName,
    salesEstimateCount,
    isMonthly,
    monthlyPrice,
    desc,
    subscribedSubscription,
    sellerSubscription,
    subscriptionType,
    promptCancelSubscription,
    changePlan,
  } = props;

  const activeSubscriptionId = subscribedSubscription && subscribedSubscription.id;

  const isMainCard =
    activeSubscriptionId === subscriptionId &&
    (isMonthly
      ? sellerSubscription.payment_mode === 'monthly'
      : sellerSubscription.payment_mode === 'yearly');

  return (
    <div
      className={`${styles.pricingPlansCardWrapper} ${
        isMainCard ? styles.pricingPlansCardWrapper__main : ''
      }`}
    >
      <div className={styles.pricingPlansCard}>
        <GenericPriceCardHead
          name={name}
          monthlyPrice={monthlyPrice}
          annualPrice={annualPrice}
          salesEstimateCount={salesEstimateCount}
          isMonthly={isMonthly}
          desc={desc}
          subscribedSubscription={subscribedSubscription}
          subscriptionId={subscriptionId}
          subscriptionType={subscriptionType}
          promptCancelSubscription={promptCancelSubscription}
          changePlan={changePlan}
          sellerSubscription={sellerSubscription}
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

export default PricingPlansCard;
