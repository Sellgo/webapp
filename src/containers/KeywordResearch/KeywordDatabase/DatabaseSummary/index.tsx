import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import KeywordDatabaseSummaryCards from '../../../../components/KeywordDatabaseSummaryCards';
import WordFreqContent from './WordFreqContent/WordFreqContent';

/* Selectors */
import {
  getIsLoadingKeywordDatabaseAggSummary,
  getIsLoadingKeywordDatabaseWordFreqSummary,
  getKeywordDatabaseAggSummary,
  getKeywordDatabaseWordFreqSummary,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Interfaces */
import {
  KeywordDatabaseAggSummary,
  KeywordDatabaseWordFreqSummary,
} from '../../../../interfaces/KeywordResearch/KeywordDatabase';
import { fetchKeywordDatabaseWordFreqSummary } from '../../../../actions/KeywordResearch/KeywordDatabase';

interface Props {
  isLoadingKeywordDatabaseWordFreqSummary: boolean;
  keywordDatabaseWordFreqSummary: KeywordDatabaseWordFreqSummary[];
  isLoadingKeywordDatabaseAggSummary: boolean;
  keywordDatabaseAggSummary: KeywordDatabaseAggSummary;
  fetchKeywordDatabaseWordFreqSummary: (sortDir: 'asc' | 'desc') => void;
}

const DatabaseSummary = (props: Props) => {
  const {
    isLoadingKeywordDatabaseWordFreqSummary,
    keywordDatabaseWordFreqSummary,
    fetchKeywordDatabaseWordFreqSummary,
  } = props;

  const [wordFreqSort, setWordFreqSort] = useState<'asc' | 'desc'>('desc');

  const wordFreqAscSorted = wordFreqSort === 'asc';
  const wordFreqDescSorted = wordFreqSort === 'desc';

  const handleWordFreqSort = () => {
    fetchKeywordDatabaseWordFreqSummary(wordFreqSort === 'desc' ? 'asc' : 'desc');

    setWordFreqSort(prevState => {
      return prevState === 'desc' ? 'asc' : 'desc';
    });
  };

  // reset to desc on unmount
  useEffect(() => {
    return () => {
      fetchKeywordDatabaseWordFreqSummary('desc');
      setWordFreqSort('desc');
    };
  }, []);

  return (
    <section className={styles.databaseSummarySection}>
      {/* Word Analysis */}
      <KeywordDatabaseSummaryCards
        title="Word Analysis"
        subTitle={
          <h3 className={styles.subTitle} onClick={handleWordFreqSort}>
            Word Frequency
            <span className={styles.sortIconGroup}>
              <Icon
                size="large"
                name="triangle up"
                className={wordFreqAscSorted ? styles.activeSort : styles.inActiveSort}
              />
              <Icon
                size="large"
                name="triangle down"
                className={wordFreqDescSorted ? styles.activeSort : styles.inActiveSort}
              />
            </span>
          </h3>
        }
        content={<WordFreqContent data={keywordDatabaseWordFreqSummary} />}
        isLoading={isLoadingKeywordDatabaseWordFreqSummary}
      />
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordDatabaseWordFreqSummary: getIsLoadingKeywordDatabaseWordFreqSummary(state),
    keywordDatabaseWordFreqSummary: getKeywordDatabaseWordFreqSummary(state),
    isLoadingKeywordDatabaseAggSummary: getIsLoadingKeywordDatabaseAggSummary(state),
    keywordDatabaseAggSummary: getKeywordDatabaseAggSummary(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseWordFreqSummary: (sortDir: 'asc' | 'desc') =>
      dispatch(fetchKeywordDatabaseWordFreqSummary(sortDir)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseSummary);
