import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Constants */
import { FINDER_PROCESS_TYPE_MAPPER } from '../../constants/SellerResearch/SellerInventory';

/* Utils */
import { truncateString } from '../../utils/format';

/* Interfaces */
import { CentralScrapingProgress } from '../../interfaces/SellerResearch/SellerInventory';
import { Icon } from 'semantic-ui-react';

interface Props {
  processDetails: CentralScrapingProgress;
}

const FinderProgressDetails = (props: Props) => {
  const { processDetails } = props;

  const { name, parameter } = processDetails;

  const isCompleted = processDetails.status === 'completed';
  const progress = processDetails.progress;

  const progressType =
    processDetails.channel_name === 'cluster_asin' && processDetails.is_top_level
      ? FINDER_PROCESS_TYPE_MAPPER.cluster_merchant
      : FINDER_PROCESS_TYPE_MAPPER[processDetails.channel_name];

  return (
    <div className={styles.progressDetails}>
      {/* Type of progress */}
      <span className={styles.progressType}>{progressType}</span>

      {/* Additional Product Details */}
      <span className={styles.productDetails}>
        {truncateString(name ? name : 'Processing......', 45)}
      </span>

      {/* Seller/Product ASIN/ID */}
      <span className={styles.infoId}>{parameter ? parameter : '-'}</span>

      {/* Progress Icon */}
      <span className={styles.progressIcon}>
        {isCompleted ? '✅' : <Icon name="spinner" loading />}
      </span>

      {/* Progress Status */}
      <span className={styles.progressStatus}>{isCompleted ? 'Completed' : `${progress}%`}</span>
    </div>
  );
};

export default memo(FinderProgressDetails);
