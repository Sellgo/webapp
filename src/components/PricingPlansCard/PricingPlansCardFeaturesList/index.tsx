import React from 'react';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';

/* Components */
import Check from '../../Icons/Check';

interface Props {
  title: string;
  featuresIncluded: any;
}

const PricingPlansCardFeaturesList: React.FC<Props> = props => {
  const { title, featuresIncluded } = props;

  return (
    <div className={styles.featuresList}>
      <p>{title}</p>
      <ul>
        {featuresIncluded.map((featureName: string) => {
          return (
            <li key={uuid()}>
              <Check width={10} height={7} fill="#2e3b4a" />
              <span>{featureName}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PricingPlansCardFeaturesList;
