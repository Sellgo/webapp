import React from 'react';
import classNames from 'classnames';

/* Styling */
import styles from './index.module.scss';

interface Props {
  plan: 'Professional' | 'Basic' | 'Team';
}

const PlanTypeButton = (props: Props) => {
  const { plan } = props;

  const className = classNames(
    { [styles.planTypeButton__professional]: plan === 'Professional' },
    { [styles.planTypeButton__basic]: plan === 'Basic' },
    { [styles.planTypeButton__team]: plan === 'Team' }
  );

  return <div className={`${styles.planTypeButton} ${className}`}>{plan}</div>;
};

export default PlanTypeButton;
