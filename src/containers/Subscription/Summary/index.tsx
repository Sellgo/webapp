import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Data */
import { generateSubscriptionDetails, SummaryDetails } from '../data';

interface Props {
  planType: string;
  paymentMode: string;
}

const Summary = (props: Props) => {
  const { planType, paymentMode } = props;
  const displayAnnualPrice = () => {
    return <span> &nbsp;${summaryDetails.annualPrice} billed yearly </span>;
  };

  const displayMonthlyPrice = () => {
    return <span> &nbsp;${summaryDetails.monthlyPrice} /mo billed monthly </span>;
  };

  const displayDailyPrice = () => {
    return <span> &nbsp;${summaryDetails.dailyPrice} /day billed daily </span>;
  };

  const summaryDetails: SummaryDetails = generateSubscriptionDetails(planType.toLowerCase());

  return (
    <>
      <div className={styles.summaryContainer}>
        <h1>Subscription Summary </h1>
        <div className={styles.planDetails}>
          <p className={styles.planDetails__planName}>{summaryDetails.name}</p>

          {paymentMode === 'yearly'
            ? displayAnnualPrice()
            : paymentMode === 'monthly'
            ? displayMonthlyPrice()
            : displayDailyPrice()}
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
