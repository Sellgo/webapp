import React from 'react';
import classNames from 'classnames';

/* Styling */
import styles from './index.module.scss';

interface Props {
  plan: 'Professional' | 'Basic' | 'Team';
  small?: boolean;
}

const PlanTypeButton = (props: Props) => {
  const { plan, small } = props;

  const className = classNames(
    { [styles.planTypeButton__professional]: plan === 'Professional' },
    { [styles.planTypeButton__basic]: plan === 'Basic' },
    { [styles.planTypeButton__team]: plan === 'Team' }
  );

  const sizeClassName = small ? styles.planTypeButton__small : '';

  return <div className={`${styles.planTypeButton} ${className} ${sizeClassName}`}>{plan}</div>;
};

export default PlanTypeButton;
