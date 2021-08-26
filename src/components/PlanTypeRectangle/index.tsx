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
    { [styles.planTypeButton__basic]: plan === 'Basic Plan' },
    { [styles.planTypeButton__team]: plan === 'Team Plan' }
  );

  // Removing the word ' Plan' to display
  const displayPlanText = plan.substring(0, plan.length - 5);

  const sizeClassName = isSmall ? styles.planTypeButton__small : '';

  return (
    <div className={`${styles.planTypeButton} ${className} ${sizeClassName}`}>
      {displayPlanText}
    </div>
  );
};

export default PlanTypeRectangle;
