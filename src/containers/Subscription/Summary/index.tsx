import React from 'react';

/* Styling */
import styles from './index.module.scss';

import { generateSubscriptionDetails, SummaryDetails } from '../data';

interface Props {
  planType: string;
  paymentMode: string;
  showCoupon?: boolean;
  isCouponApplied?: boolean;
  redeemCoupon?: (couponValue: any, sellerID: any) => void;
}

const Summary: React.FC<Props> = props => {
  const { planType, paymentMode } = props;

  const summaryDetails: SummaryDetails = generateSubscriptionDetails(planType.toLowerCase());

  return (
    <>
      <div className={styles.summaryContainer}>
        <h1>Subscription Summary </h1>
        <div className={styles.planDetails}>
          <p className={styles.planDetails__planName}>{summaryDetails.name}</p>

          {paymentMode === 'yearly' ? (
            <p className={styles.planDetails__pricing}>
              ${summaryDetails.annualPrice} billed yearly
            </p>
          ) : paymentMode === 'monthly' ? (
            <p className={styles.planDetails__pricing}>
              ${summaryDetails.monthlyPrice} /mo billed monthly
            </p>
          ) : (
            <p className={styles.planDetails__pricing}>
              ${summaryDetails.dailyPrice} /day billed daily
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
