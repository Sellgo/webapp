import React from 'react';
import classNames from 'classnames';

/* Styling */
import styles from './index.module.scss';

import { SubscriptionPlanType } from '../../interfaces/Settings/billing';

interface Props {
  plan: SubscriptionPlanType;
  small?: boolean;
}

const PlanTypeButton = (props: Props) => {
  const { plan, small } = props;

  const className = classNames(
    { [styles.planTypeButton__professional]: plan === 'Professional Plan' },
    { [styles.planTypeButton__basic]: plan === 'Basic Plan' },
    { [styles.planTypeButton__team]: plan === 'Team Plan' }
  );

  // Removing the word ' Plan' to display
  const displayPlanText = plan.substring(0, plan.length - 5);

  const sizeClassName = small ? styles.planTypeButton__small : '';

  return (
    <div className={`${styles.planTypeButton} ${className} ${sizeClassName}`}>
      {displayPlanText}
    </div>
  );
};

export default PlanTypeButton;
