import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Components */

import GemGenerator from '../../GemGenerator';
import PricePlanToggleButton from '../../PricePlanToggleButton';

interface Props {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  salesEstimateCount: number;
  isMonthly: boolean;
  desc: string;
  withToggle?: boolean;
  className?: string;
  handleChange?: any;
}

const GenericPriceCardHead: React.FC<Props> = props => {
  const {
    name,
    isMonthly,
    monthlyPrice,
    annualPrice,
    desc,
    withToggle,
    className,
    handleChange,
  } = props;

  return (
    <div className={className}>
      <div className={styles.pricingCardHead}>
        <div className={styles.pricingCardHead__Left}>
          {!withToggle && (
            <div className={styles.planGems}>
              <GemGenerator name={name} />
            </div>
          )}
          <h2>{name}</h2>
          {!withToggle && <p>{desc}</p>}
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

      {withToggle && (
        <div className={styles.toggleWrapper}>
          <PricePlanToggleButton isMonthly={isMonthly} handleChange={handleChange} />
        </div>
      )}

      <button className={`${styles.button} ${styles.button__changePlan}`}>Buy Now</button>
    </div>
  );
};

export default GenericPriceCardHead;
