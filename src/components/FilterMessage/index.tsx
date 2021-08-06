import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  active: boolean;
  message: string;
  className?: string;
  type: 'info' | 'error';
}

const FilterMessage = (props: Props) => {
  const { active, message, className, type } = props;

  if (!active) {
    return null;
  }

  return (
    <section
      className={`${type === 'error' ? styles.filterAlertBox : styles.filterInfoBox} ${className}`}
    >
      <p>{message}</p>
    </section>
  );
};

export default FilterMessage;
