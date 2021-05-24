import React from 'react';

/* Styling */
import styles from './index.module.scss';

import { generateSubscriptionDetails, SummaryDetails } from './data';
import { Subscription } from '../../../interfaces/Seller';

interface Props {
  planType: string;
  paymentMode: string;
  showCoupon?: boolean;
  subscriptions?: Subscription[];
  isCouponApplied?: boolean;
  redeemCoupon?: (couponValue: any, sellerID: any) => void;
}

const Summary: React.FC<Props> = props => {
  const { planType, paymentMode, subscriptions } = props;

  const summaryDetails: SummaryDetails = generateSubscriptionDetails(planType.toLowerCase());

  const getSubscriptionDetails =
    subscriptions &&
    subscriptions.filter((subscription: Subscription) => {
      return Number(subscription.id) === Number(summaryDetails.id);
    })[0];

  return (
    <>
      <div className={styles.summaryContainer}>
        <h1>Subscription Summary </h1>
        <div className={styles.planDetails}>
          <p className={styles.planDetails__planName}>{summaryDetails.name}</p>

          {paymentMode === 'yearly' ? (
            <p className={styles.planDetails__pricing}>
              ${getSubscriptionDetails && getSubscriptionDetails.yearly_price} billed yearly
            </p>
          ) : (
            <p className={styles.planDetails__pricing}>
              ${getSubscriptionDetails && getSubscriptionDetails.monthly_price} /mo billed monthly
            </p>
          )}
        </div>
        <p className={styles.subDescription}>{summaryDetails.subDescription}</p>

        <ul className={styles.benefitsWrapper}>
          {summaryDetails.benefits.map((benefit: string, index: number) => {
            return <li key={index}>- {benefit}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Summary;
