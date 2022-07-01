import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  className?: string;
  isMonthly: boolean;
  handleChange: () => void;
}

const PricePlanToggleButton: React.FC<Props> = props => {
  const { className, isMonthly, handleChange } = props;

  const monthlyToggleTextClass = `${styles.priceToggleText} ${
    isMonthly ? styles.priceToggleText__Active : ''
  }`;

  const annualToggleTextClass = `${styles.priceToggleText} ${
    !isMonthly ? styles.priceToggleText__Active : ''
  }`;

  return (
    <div
      className={`${styles.pricePlanToggleWrapper} ${className}`}
      role="button"
      onClick={handleChange}
      tabIndex={0}
      onKeyPress={handleChange}
    >
      <div className={monthlyToggleTextClass}>
        <p />
        {/* <small>Commit Monthly</small> */}
      </div>

      <div className={annualToggleTextClass}>
        <p />
        {/* <small>Commit Anually</small> */}
      </div>
    </div>
  );
};

export default PricePlanToggleButton;
