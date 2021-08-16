import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { decode } from 'qss';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ReverseFilters from './ReverseFilters';
import ReverseTable from './ReverseTable';
import ReverseProgress from './ReverseProgress';
import ReverseExport from './ReverseExport';
import ReverseAsinsList from './ReverseAsinsList';

/* Selectors */
import { sellerIDSelector } from '../../../selectors/Seller';

/* Actions */
import { fetchKeywordReverseRequestId } from '../../../actions/KeywordResearch/KeywordReverse';

/* Utils */
import { error, success } from '../../../utils/notifications';
import { decodeBase64 } from '../../../utils/format';

import history from '../../../history';

interface Props {
  fetchKeywordReverseRequestId: (payload: string) => void;
}

const KeywordReverse = (props: Props) => {
  const { fetchKeywordReverseRequestId } = props;

  useEffect(() => {
    const searchString = history.location.search;

    if (searchString && searchString.includes('?query=')) {
      const encodedQuery = searchString.split('?query=')[1] || '';

      if (!encodedQuery) {
        return;
      }

      const decodedString = decodeBase64(encodedQuery);

      const { sellerId, asins } = decode(decodedString) as any;

      if (String(sellerId) !== sellerIDSelector()) {
        error('Unauthorized user');
        return;
      }

      if (asins.split(',').length >= 10) {
        error('Asin size has exceeded max size of 10');
        return;
      }
      success('Fetching keywwords for the products');
      fetchKeywordReverseRequestId(asins);
      history.replace('/keyword-research');
    }
  }, []);

  return (
    <main className={styles.keywordReversePage}>
      <ReverseFilters />
      <ReverseProgress />
      <ReverseAsinsList />
      <ReverseExport />
      <ReverseTable />
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseRequestId: (payload: string) =>
      dispatch(fetchKeywordReverseRequestId(payload)),
  };
};

export default connect(null, mapDispatchToProps)(KeywordReverse);
