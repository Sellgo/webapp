import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  ly_sales: number;
  sales_yoy: number;
  sales_l90d: number;
  price_90d: number;
  best_sales: number;
  sales_to_reviews: number;
  kpi_4: number;
  kpi_5: number;
  kpi_6: number;
}

const ProductStats = (props: Props) => {
  return (
    <div className={styles.analyticsGrid}>
      <div className={styles.row}>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>{props.ly_sales}</p>
          <p className={styles.analyticTitle}>LY Sales</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>{props.sales_yoy}%</p>
          <p className={styles.analyticTitle}>Sales YoY</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>{props.sales_l90d}%</p>
          <p className={styles.analyticTitle}>Sales L90D</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber__red}>{props.price_90d}</p>
          <p className={styles.analyticTitle}>Price 90D</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber__red}>{props.best_sales}%</p>
          <p className={styles.analyticTitle}>Best Sales</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber__red}>{props.sales_to_reviews}%</p>
          <p className={styles.analyticTitle}>
            Sales to <br />
            Reviews
          </p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>{props.kpi_4}</p>
          <p className={styles.analyticTitle}>KPI</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>{props.kpi_5}%</p>
          <p className={styles.analyticTitle}>KPI</p>
        </div>
        <div className={styles.singleAnalytic}>
          <p className={styles.analyticNumber}>{props.kpi_6}%</p>
          <p className={styles.analyticTitle}>KPI</p>
        </div>
      </div>
    </div>
  );
};

export default ProductStats;
