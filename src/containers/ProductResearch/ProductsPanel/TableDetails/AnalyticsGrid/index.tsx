import React from 'react';

/* Styling */
import styles from './index.module.scss';

const AnalyticsGrid = () => {
  return (
    <div className={styles.analyticsGrid}>
      <div className={styles.row}>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>100</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>100</p>
          <p className={styles.analyticTitle}>YoY</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>100</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber__red}>100</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber__red}>100</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber__red}>100</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>100</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>100</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>100</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGrid;
