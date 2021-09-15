import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import placeholderImage from '../../assets/images/placeholderImage.svg';
import { ReactComponent as RemoveCrossIcon } from '../../assets/images/removeCross.svg';

/* Interface */
import { KeywordTrackerTableCompetitors } from '../../interfaces/KeywordResearch/KeywordTracker';
import { truncateString } from '../../utils/format';

interface Props {
  data: KeywordTrackerTableCompetitors;
}

const TrackerCompetitorDetails = (props: Props) => {
  const { data } = props;

  const { asin, image_url, title } = data;

  return (
    <div className={styles.competitorAsin}>
      <div className={styles.productImage}>
        <img src={image_url ? image_url : placeholderImage} alt="Placeholder Image" />
      </div>
      <div className={styles.productDetails}>
        <p className={styles.productTitle}>{title ? truncateString(title, 15) : '-'}</p>
        <p className={styles.productMeta}>
          <img src={require('../../assets/flags/US.png')} alt="US Marketplace flag" />
          <span>{asin}</span>
        </p>
      </div>

      <RemoveCrossIcon className={styles.removeIcon} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default memo(TrackerCompetitorDetails);
