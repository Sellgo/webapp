import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber } from '../../../../utils/format';

/* Selectors */
import { getKeywordTrackerProductsTablePaginationInfo } from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Interfaces */
import { KeywordTrackerProductsTablePaginationInfo } from '../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  keywordTrackerProductsTablePaginationInfo: KeywordTrackerProductsTablePaginationInfo;
}

const TrackerExport = (props: Props) => {
  const { keywordTrackerProductsTablePaginationInfo } = props;

  return (
    <div className={styles.exportsContainer}>
      {keywordTrackerProductsTablePaginationInfo.total_pages > 0 && (
        <p className={styles.messageText}>
          Viewing{' '}
          <span className={styles.sellerCount}>
            {formatNumber(keywordTrackerProductsTablePaginationInfo.count)}
          </span>{' '}
          products.
        </p>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordTrackerProductsTablePaginationInfo: getKeywordTrackerProductsTablePaginationInfo(state),
  };
};

export default connect(mapStateToProps)(TrackerExport);
