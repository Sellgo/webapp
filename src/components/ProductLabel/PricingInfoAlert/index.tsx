import React from 'react';
/* Styling */
import styles from './index.module.scss';

/* COmponents */
import NewLink from '../../Icons/NewLink';

interface Props {
  className?: string;
  head: string;
  navigateLabel: string;
  navigateTo: string;
  background: string;
}

const PricingInfoAlert: React.FC<Props> = props => {
  const { className, head, background, navigateLabel, navigateTo } = props;

  return (
    <div className={`${styles.pricingInfoAlert} ${className}`} style={{ background }}>
      <h3>{head}</h3>
      <a href={navigateTo} target="_blank" rel="noopener noreferrer">
        {navigateLabel}
        <NewLink width={12} height={11} fill="#636d76" />
      </a>
    </div>
  );
};

export default PricingInfoAlert;
