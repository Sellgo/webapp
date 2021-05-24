import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import GemGenerator from '../../GemGenerator';

/* Utils */
import { isSubscriptionNotPaid, isSubscriptionPaid } from '../../../utils/subscriptions';

const GenericPriceCardHead = (props: any) => {
  const {
    name,
    isMonthly,
    desc,
    subscriptions,
    subscribedSubscription,
    subscriptionType,
    subscriptionId,
    promptCancelSubscription,
    changePlan,
    sellerSubscription,
  } = props;

  const isSubscribed =
    subscribedSubscription &&
    subscribedSubscription.id === subscriptionId &&
    (isMonthly
      ? sellerSubscription.payment_mode === 'monthly'
      : sellerSubscription.payment_mode === 'yearly');

  const getSubscriptionDetails = subscriptions.filter((subscription: any) => {
    return Number(subscription.id) === Number(subscriptionId);
  })[0];

  const monthlyPrice = Math.round(getSubscriptionDetails && getSubscriptionDetails.monthly_price);
  const annualPrice = Math.round(getSubscriptionDetails && getSubscriptionDetails.yearly_price);

  return (
    <div>
      <div className={styles.pricingCardHead}>
        <div className={styles.pricingCardHead__Left}>
          <div className={styles.planGems}>
            <GemGenerator name={name} />
          </div>
          <h2>{name}</h2>
          <p>{desc}</p>
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
