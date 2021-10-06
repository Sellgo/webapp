import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Assets */
import placeholderImage from '../../assets/images/placeholderImage.svg';
import { ReactComponent as RemoveCrossIcon } from '../../assets/images/removeCross.svg';

/* Interface */
import {
  KeywordTrackerTableCompetitors,
  RemoveCompetitorPayload,
} from '../../interfaces/KeywordResearch/KeywordTracker';

/* Utils */
import { truncateString } from '../../utils/format';

/* Components */
import CopyAndLocateClipboard from '../../components/CopyAndLocateClipboard';

interface Props {
  data: KeywordTrackerTableCompetitors;
  removeCompetitor: (payload: RemoveCompetitorPayload) => void;
}

const TrackerCompetitorDetails = (props: Props) => {
  const { data, removeCompetitor } = props;

  const { asin, image_url, title, keyword_track_competitor_id } = data;

  return (
    <div className={styles.competitorAsin}>
      <div className={styles.productImage}>
        <img src={image_url ? image_url.replace('SL75', 'SL30') : placeholderImage} alt={title} />
      </div>
      <div className={styles.productDetails}>
        <p className={styles.productTitle}>{title ? truncateString(title, 15) : '-'}</p>
        <p className={styles.productMeta}>
          <img src={require('../../assets/flags/US.png')} alt="US Marketplace flag" />
          <CopyAndLocateClipboard
            data={asin}
            wrapperClassName={styles.asinWrapper}
            className={styles.asin}
            link={`https://www.amazon.com/dp/${asin}`}
          />
          {/* <span>{asin}</span> */}
        </p>
      </div>

      <RemoveCrossIcon
        className={styles.removeIcon}
        style={{ cursor: 'pointer' }}
        onClick={() =>
          removeCompetitor({
            keywordTrackCompetitorId: keyword_track_competitor_id,
            status: 'inactive',
          })
        }
      />
    </div>
  );
};

export default memo(TrackerCompetitorDetails);
