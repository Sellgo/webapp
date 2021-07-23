import React from 'react';
import { isSubscriptionNotPaid, isSubscriptionPaid } from '../../utils/subscriptions';
import PricePlanToggleButton from '../PricePlanToggleButton';

/* Styling */
import styles from './index.module.scss';

interface Props {
  subscriptionId: number;
  name: string;
  isMonthly: boolean;
  monthlyPrice: number;
  annualPrice: number;
  isDailyPlan: boolean;
  handleChange: () => void;

  // seller subscriptions
  subscribedSubscription: any;
  subscriptionType: any;
  sellerSubscription: any;

  // subscription actions
  promptCancelSubscription: any;
  changePlan: (subscriptionDetails: any) => void;
}

const PricingPlansSummary = (props: Props) => {
  const {
    subscriptionId,
    name,
    isMonthly,
    monthlyPrice,
    annualPrice,
    isDailyPlan,
    handleChange,
    // subscription actions
    changePlan,
    promptCancelSubscription,

    // subscription details
    subscribedSubscription,
    subscriptionType,
  } = props;

  const isSubscribed = subscribedSubscription && subscribedSubscription.id === subscriptionId;

  console.log(isSubscribed);

  return (
    <div
      className={`${styles.pricingCardsSummaryWrapper} ${
        isSubscribed ? styles.subscribedPlan : ''
      }`}
    >
      {/* Pricing Details */}
      <div className={styles.pricingCardsSummaryDetails}>
        <div className={styles.cardHead}>
          <h2>{name}</h2>
        </div>

        <div className={styles.startingAt}>
          {/* if not a daily plan  */}

          <p style={{ opacity: isDailyPlan ? 0 : 1 }}>
            Starts At
            {!isMonthly && <span className={styles.strikeText}>${monthlyPrice}</span>}
          </p>

          {isDailyPlan ? (
            <h3>$1/ Day</h3>
          ) : isMonthly ? (
            <h3>${monthlyPrice}/ Mo</h3>
          ) : (
            <h3>${Math.round(annualPrice / 12)}/ Mo</h3>
          )}

          {isDailyPlan ? (
            <p className={styles.billedAtPrice}>Billed at $1</p>
          ) : !isMonthly ? (
            <p className={styles.billedAtPrice}>
              Billed At <span className={styles.strikeText}>${monthlyPrice * 12}</span>
              <span style={{ fontWeight: 'bold', textDecoration: 'none' }}>${annualPrice}/yr</span>
              Save ${monthlyPrice * 12 - annualPrice}
            </p>
          ) : (
            <p>Billed Monthly</p>
          )}
        </div>
      </div>

      {/* Pricing cCtions */}
      <div className={styles.pricingCardsSummaryActions}>
        {!isDailyPlan && (
          <div className={styles.priceToogleWrapper}>
            <PricePlanToggleButton isMonthly={isMonthly} handleChange={handleChange} />
          </div>
        )}

        {isSubscribed && (
          <button
            className={`${styles.button} ${styles.button__cancelPlan}`}
            onClick={promptCancelSubscription}
          >
            Cancel
          </button>
        )}

        {!isSubscribed && isSubscriptionPaid(subscriptionType) && (
          <button
            className={`${styles.button} ${styles.button__changePlan}`}
            onClick={() => changePlan({ name, id: subscriptionId })}
          >
            Change Plan
          </button>
        )}

        {!isSubscribed && isSubscriptionNotPaid(subscriptionType) && (
          <button
            className={`${styles.button} ${styles.button__buyPlan}`}
            onClick={() => changePlan({ name, id: subscriptionId })}
          >
            Buy this now
          </button>
        )}
      </div>
    </div>
  );
};

export default PricingPlansSummary;
