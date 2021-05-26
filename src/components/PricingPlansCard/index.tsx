import React from 'react';
import { v4 as uuid } from 'uuid';

/* Styles */
import styles from './index.module.scss';

/* Components */
import PricingPlansCardFeaturesList from './PricingPlansCardFeaturesList';
import GenericPriceCardHead from './GenericPlanCardHead';

interface Props {
  subscriptionId: number;
  name: string;
  productsDatabase: number;
  salesEstimateCount: number;
  monthlyPrice: number;
  annualPrice: number;
  desc: string;
  featureSubName: string;
  featuresLists: any;

  // plan type details
  isMonthly: boolean;
  sellerSubscription: any;
  subscribedSubscription: any;
  subscriptionType: string;

  // actions for subscription
  promptCancelSubscription: () => void;
  changePlan: (details: any, mode: string) => void;
}

const PricingPlansCard: React.FC<Props> = props => {
  const {
    subscriptionId,
    name,
    monthlyPrice,
    annualPrice,
    desc,
    featureSubName,
    featuresLists,
    isMonthly,
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
          subscriptionId={subscriptionId}
          name={name}
          monthlyPrice={monthlyPrice}
          annualPrice={annualPrice}
          desc={desc}
          // plan type details
          isMonthly={isMonthly}
          subscribedSubscription={subscribedSubscription}
          subscriptionType={subscriptionType}
          sellerSubscription={sellerSubscription}
          // subscription actions
          promptCancelSubscription={promptCancelSubscription}
          changePlan={changePlan}
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
