import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import placeholderImage from '../../assets/images/placeholderImage.svg';
import { ReactComponent as RemoveCrossIcon } from '../../assets/images/removeCross.svg';

interface Props {
  asin: string;
}

const TrackerCompetitorDetails = (props: Props) => {
  const { asin } = props;
  return (
    <div className={styles.competitorAsin}>
      <div className={styles.productImage}>
        <img src={placeholderImage} alt="Placeholder Image" />
      </div>
      <div className={styles.productDetails}>
        <p className={styles.productTitle}>title Title Title....</p>
        <p className={styles.productMeta}>
          <img src={require('../../assets/flags/US.png')} alt="US Marketplace flag" />
          <span>{asin}</span>
        </p>
      </div>

      <RemoveCrossIcon className={styles.removeIcon} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default TrackerCompetitorDetails;
