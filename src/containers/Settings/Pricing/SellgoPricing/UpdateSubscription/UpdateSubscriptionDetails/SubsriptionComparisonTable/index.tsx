import React from 'react';

/* Styles */
import styles from './index.module.scss';

/* Types */
import { SummaryDetails } from '../../../../../../../interfaces/Subscription';
import { formatNumber } from '../../../../../../../utils/format';

interface MyProps {
  currentSubscriptionDetails: SummaryDetails;
  newSubscriptionDetails: SummaryDetails;
  isCurrentSubscriptionMonthly: boolean;
  isNewSubscriptionMonthly: boolean;
}

const SubscriptionDetailsComparisonTable = (props: MyProps) => {
  const {
    currentSubscriptionDetails,
    newSubscriptionDetails,
    isCurrentSubscriptionMonthly,
    isNewSubscriptionMonthly,
  } = props;

  return (
    <>
      <section className={styles.comparisonSection}>
        <div className={styles.row}>
          <p>{``}</p>
          <p className={styles.heading}>Current plan</p>
          <p className={styles.heading}>New plan</p>
        </div>
        <div className={styles.tableDataWrapper}>
          <div className={styles.row}>
            <p className={styles.heading}>Name</p>
            <p>{`${currentSubscriptionDetails.displayName ?? currentSubscriptionDetails.name} ${
              isCurrentSubscriptionMonthly ? 'monthly' : 'yearly'
            }`}</p>

            <p>{`${newSubscriptionDetails.displayName ?? newSubscriptionDetails.name} ${
              isNewSubscriptionMonthly ? 'monthly' : 'yearly'
            }`}</p>
          </div>
          <div className={styles.row}>
            <p className={styles.heading}>Lookups</p>
            <p>
              {isCurrentSubscriptionMonthly
                ? `${formatNumber(currentSubscriptionDetails.monthlyLookups)} per month `
                : `${formatNumber(currentSubscriptionDetails.annualLookups)} per year`}
            </p>
            <p>
              {isNewSubscriptionMonthly
                ? `${formatNumber(newSubscriptionDetails.monthlyLookups)} per month `
                : `${formatNumber(newSubscriptionDetails.annualLookups)} per year`}
            </p>
          </div>
          <div className={styles.row}>
            <p className={styles.heading}>Price</p>
            <p>
              {isCurrentSubscriptionMonthly
                ? `$${formatNumber(currentSubscriptionDetails.monthlyPrice)} per month `
                : `$${formatNumber(currentSubscriptionDetails.annualPrice)} per year`}
            </p>
            <p>
              {isNewSubscriptionMonthly
                ? `$${formatNumber(newSubscriptionDetails.monthlyPrice)} per month `
                : `$${formatNumber(newSubscriptionDetails.annualPrice)} per year`}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubscriptionDetailsComparisonTable;
