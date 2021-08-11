import React from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Containers */
import ReverseFilters from './ReverseFilters';
import ReverseTable from './ReverseTable';

/* Selectors */
import { getKeywordReverseRequestId } from '../../../selectors/KeywordResearch/KeywordReverse';

interface Props {
  keywordReverseRequestId: string;
}

const KeywordReverse = () => {
  return (
    <main className={styles.keywordReversePage}>
      <ReverseFilters />
      <ReverseTable />
    </main>
  );
};

const mapStateToProps = (state: any) => {
  return {
    keywordReverseRequestId: getKeywordReverseRequestId(state),
  };
};

export default connect(mapStateToProps)(KeywordReverse);
