import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { isSubscriptionNotPaid, isSubscriptionPaid } from '../../../utils/subscriptions';

const GenericPriceCardHead = (props: any) => {
  const {
    subscriptionId,
    name,
    monthlyPrice,
    annualPrice,
    isMonthly,
    subscribedSubscription,
    subscriptionType,
    sellerSubscription,
    // action on subscriptions
    promptCancelSubscription,
    changePlan,
  } = props;

  const isSubscribed =
    subscribedSubscription &&
    subscribedSubscription.id === subscriptionId &&
    (isMonthly
      ? sellerSubscription.payment_mode === 'monthly'
      : sellerSubscription.payment_mode === 'yearly');

  return (
    <div>
      <div className={styles.pricingCardHead}>
        <div className={styles.pricingCardHead__Left}>
          <h2>{name}</h2>
        </div>
      </div>

      <div className={styles.startingAt}>
        <p>Starts At {!isMonthly && <span className="strike-text">${monthlyPrice}</span>}</p>

        {isMonthly ? <h3>${monthlyPrice}/ Mo</h3> : <h3>${Math.round(annualPrice / 12)}/ Mo</h3>}

        {!isMonthly ? (
          <p className={styles.billedAtPrice}>
            Billed At <span className="strike-text">${monthlyPrice * 12}</span>
            <span style={{ fontWeight: 'bold', textDecoration: 'none' }}>${annualPrice}/yr</span>
            Save ${monthlyPrice * 12 - annualPrice}
          </p>
        ) : (
          <p>Billed Monthly</p>
        )}
      </div>

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
          onClick={() => changePlan({ name, id: subscriptionId }, isMonthly ? 'monthly' : 'yearly')}
        >
          Change Plan
        </button>
      )}

      {!isSubscribed && isSubscriptionNotPaid(subscriptionType) && (
        <button
          className={`${styles.button} ${styles.button__buyPlan}`}
          onClick={() => changePlan({ name, id: subscriptionId }, isMonthly ? 'monthly' : 'yearly')}
        >
          Buy this now
        </button>
      )}
    </div>
  );
};

export default GenericPriceCardHead;
