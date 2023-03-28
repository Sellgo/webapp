import React from 'react';
import classNames from 'classnames';

/* Styling */
import styles from './index.module.scss';

import { SubscriptionPlanType } from '../../interfaces/Settings/billing';

interface Props {
  plan: SubscriptionPlanType;
  isSmall?: boolean;
}

const PlanTypeRectangle = (props: Props) => {
  const { plan, isSmall } = props;
  const className = classNames(
    { [styles.planTypeButton__professional]: plan === 'Professional Plan' },
    { [styles.planTypeButton__basic]: plan === 'Starter Plan' },
    { [styles.planTypeButton__team]: plan === 'Team Plan' },
    { [styles.planTypeButton__basic]: plan === 'Personal Plan' },
    { [styles.planTypeButton__team]: plan === 'Business Plan' },
    { [styles.planTypeButton__wholesale]: plan === 'Wholesale Arbitrage $1 Plan' },
    { [styles.planTypeButton__wholesale]: plan === 'Wholesale Arbitrage $1.99 Plan' },
    { [styles.planTypeButton__seller]: plan === 'Seller Scout Pro Plan' }
  );

  // Removing the word ' Plan' to display
  let displayPlanText;
  if (plan === 'Wholesale Arbitrage $1 Plan') {
    displayPlanText = '$1 Plan';
  } else if (plan === 'Wholesale Arbitrage $1.99 Plan') {
    displayPlanText = '$1.99 Plan';
  } else {
    displayPlanText = plan && plan.substring(0, plan.length - 5);
  }

  const sizeClassName = isSmall ? styles.planTypeButton__small : '';

  return (
    <div className={`${styles.planTypeButton} ${className} ${sizeClassName}`}>
      {displayPlanText}
    </div>
  );
};

export default PlanTypeRectangle;
