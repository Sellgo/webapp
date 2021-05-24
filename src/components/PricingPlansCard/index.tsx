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
  desc: string;
  featureSubName: string;
  featuresLists: any;
  isMonthly: boolean;
  subscriptions?: any;
  sellerSubscription: any;
  subscribedSubscription: any;
  subscriptionType: string;
  promptCancelSubscription: () => void;
  changePlan: (details: any, mode: string) => void;
}

const PricingPlansCard: React.FC<Props> = props => {
  const {
    name,
    subscriptionId,
    featuresLists,
    featureSubName,
    isMonthly,
    desc,
    subscriptions,
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
          desc={desc}
          isMonthly={isMonthly}
          subscriptions={subscriptions}
          subscribedSubscription={subscribedSubscription}
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
