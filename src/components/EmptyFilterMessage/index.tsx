import React from 'react';

/* Styling */
import styles from './index.module.scss';

interface Props {
  active: boolean;
  message: string;
  className?: string;
}

const EmptyFilterMessage = (props: Props) => {
  const { active, message, className } = props;

  if (!active) {
    return null;
  }

  return (
    <section className={`${styles.filterAlertBox} ${className}`}>
      <p>{message}</p>
    </section>
  );
};

export default EmptyFilterMessage;
