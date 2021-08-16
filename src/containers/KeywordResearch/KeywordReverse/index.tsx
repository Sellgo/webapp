import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { decode } from 'qss';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ReverseFilters from './ReverseFilters';
import ReverseTable from './ReverseTable';

/* Selectors */
import { sellerIDSelector } from '../../../selectors/Seller';

/* Actions */
import { fetchKeywordReverseRequestId } from '../../../actions/KeywordResearch/KeywordReverse';

/* Utils */
import { error, success } from '../../../utils/notifications';
import { decodeBase64 } from '../../../utils/format';

import history from '../../../history';
import ReverseProgress from './ReverseProgress';

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
        console.log('Unauthorized user');
        error('Unauthorized user');
        return;
      }

      if (asins.split(',').length >= 10) {
        error('Asin size has exceeded');
        return;
      }
      success('Trigerring the reverse keyword request process');
      fetchKeywordReverseRequestId(asins);
    }
  }, []);

  return (
    <main className={styles.keywordReversePage}>
      <ReverseFilters />
      <ReverseProgress />
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
