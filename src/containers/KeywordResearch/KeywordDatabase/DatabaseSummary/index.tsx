import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
import {
  fetchKeywordDatabaseWordFreqSummary,
  fetchKeywordDatabaseAggSummary,
} from '../../../../actions/KeywordResearch/KeywordDatabase';

/* Utils */
import { removeSpecialChars } from '../../../../utils/format';
import { copyToClipboard } from '../../../../utils/file';
import { success } from '../../../../utils/notifications';

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

  const handleWordFreqSort = () => {
    fetchKeywordDatabaseWordFreqSummary(wordFreqSort === 'desc' ? 'asc' : 'desc');

    setWordFreqSort(prevState => {
      return prevState === 'desc' ? 'asc' : 'desc';
    });
  };

  /* Copy Keywords */
  const handleCopyKeywords = (deliminator?: string) => {
    const keywords = keywordDatabaseWordFreqSummary.map(({ word }) => word);
    const prepareKeywordsStringCopy = removeSpecialChars(keywords, deliminator);
    copyToClipboard(prepareKeywordsStringCopy).then(() => {
      success('Keywords successfully copied');
    });
  };

  // reset to desc on unmount
  useEffect(() => {
    return () => {
      fetchKeywordDatabaseWordFreqSummary('desc');
      fetchKeywordDatabaseAggSummary();
      setWordFreqSort('desc');
    };
  }, []);

  return (
    <section className={styles.databaseSummarySection}>
      {/* Word Analysis */}
      <KeywordDatabaseSummaryCards
        title="Word Frequency"
        sort={wordFreqSort}
        handleSort={handleWordFreqSort}
        handleCopy={handleCopyKeywords}
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
    fetchKeywordDatabaseAggSummary: () => dispatch(fetchKeywordDatabaseAggSummary()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseSummary);
