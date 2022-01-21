import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { OFFSET_TO_CHART_WIDTH } from '../../../../constants/PerfectStock/OrderPlanning';

const OrderSummary = () => {
  return (
    <div className={styles.orderSummaryWrapper}>
      <div
        className={styles.orderName}
        style={{
          width: OFFSET_TO_CHART_WIDTH,
        }}
      >
        <span>TOTAL</span>
        Order 46 (draft)
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Total Units</span>
        <span className={styles.stat}>5,000</span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Cartons</span>
        <span className={styles.stat}>5,000</span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Total CBM</span>
        <span className={`${styles.stat} ${styles.stat__small}`}>5,000m</span>
        <span className={`${styles.stat} ${styles.stat__small}`}>5,000ft</span>
      </div>
      <div className={styles.statWrapper}>
        <span className={styles.statHeader}>Total Gross Weight</span>
        <span className={`${styles.stat} ${styles.stat__small}`}>5,000kgs</span>
        <span className={`${styles.stat} ${styles.stat__small}`}>5,000lbs</span>
      </div>
    </div>
  );
};

export default OrderSummary;
