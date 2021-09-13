import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber } from '../../../../utils/format';

/* Selectors */
import { getKeywordTrackerProductsTablePaginationInfo } from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { fetchKeywordTrackerProductsTable } from '../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  KeywordTrackerProductsTablePaginationInfo,
  TrackerTableProductsPayload,
} from '../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  keywordTrackerProductsTablePaginationInfo: KeywordTrackerProductsTablePaginationInfo;
  fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) => void;
}

const TrackerExport = (props: Props) => {
  const { keywordTrackerProductsTablePaginationInfo, fetchKeywordTrackerProductsTable } = props;

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetchKeywordTrackerProductsTable({
      search: searchTerm,
    });
  };

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

      <form onSubmit={handleSubmit}>
        <Input
          icon={<Icon name="search" className={styles.searchIcon} />}
          iconPosition="left"
          placeholder="Search"
          className={styles.searchInput}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordTrackerProductsTablePaginationInfo: getKeywordTrackerProductsTablePaginationInfo(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) =>
      dispatch(fetchKeywordTrackerProductsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerExport);
