import React from 'react';
/* Styling */
import styles from './index.module.scss';

/* COmponents */
import NewLink from '../Icons/NewLink';

interface Props {
  className?: string;
  head: string;
  desc: string;
  navigateLabel: string;
  navigateTo: string;
  background: string;
}

const PricingInfoAlert: React.FC<Props> = props => {
  const { className, head, desc, background, navigateLabel, navigateTo } = props;

  return (
    <div className={`${styles.pricingInfoAlert} ${className}`} style={{ background }}>
      <h3>{head}</h3>
      <div>
        <p>
          {desc}
          <a href={navigateTo} target="_blank" rel="noopener noreferrer">
            {navigateLabel} {''}
            <NewLink width={12} height={11} fill="#636d76" />
          </a>
        </p>
      </div>
    </div>
  );
};

export default PricingInfoAlert;
