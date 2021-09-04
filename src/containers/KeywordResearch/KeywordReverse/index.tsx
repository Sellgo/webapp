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
import {
  fetchKeywordReverseRequestId,
  fetchKeywordReverseTableInformation,
} from '../../../actions/KeywordResearch/KeywordReverse';

/* Utils */
import { error, success } from '../../../utils/notifications';
import { decodeBase64 } from '../../../utils/format';

import history from '../../../history';

/* Constants */
import { MAX_ASINS_ALLOWED } from '../../../constants/KeywordResearch/KeywordReverse';
import { KeywordReverseTablePayload } from '../../../interfaces/KeywordResearch/KeywordReverse';

interface Props {
  fetchKeywordReverseRequestId: (payload: string) => void;
  fetchKeywordReverseTableInformation: (payload: KeywordReverseTablePayload) => void;
}

const KeywordReverse = (props: Props) => {
  const { fetchKeywordReverseRequestId, fetchKeywordReverseTableInformation } = props;

  useEffect(() => {
    const searchString = history.location.search;

    if (searchString) {
      // query triggered from chrome extension
      if (searchString.includes('?query=')) {
        const encodedQuery = searchString.split('?query=')[1] || '';

        if (!encodedQuery) {
          return;
        }

        const decodedString = decodeBase64(encodedQuery);

        if (!decodedString) {
          return;
        }

        const { sellerId, asins } = decode(decodedString) as any;

        if (!sellerId || !asins) {
          return;
        }

        if (String(sellerId) !== sellerIDSelector()) {
          error('Unauthorized user');
          return;
        }

        if (asins.split(',').length > MAX_ASINS_ALLOWED) {
          error('Asin size has exceeded max size of 10');
          return;
        }
        success('Fetching keywords');
        fetchKeywordReverseRequestId(asins);
        history.replace('/keyword-research');
      }
    } else {
      const keywordId = sessionStorage.getItem('keywordReverseRequestId') || '';

      if (keywordId) {
        fetchKeywordReverseTableInformation({});
        return;
      }
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
    fetchKeywordReverseTableInformation: (payload: KeywordReverseTablePayload) =>
      dispatch(fetchKeywordReverseTableInformation(payload)),
  };
};

export default connect(null, mapDispatchToProps)(KeywordReverse);
