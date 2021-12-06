import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import KeywordDatabaseSummaryCards from '../../../../components/KeywordDatabaseSummaryCards';
import WordFreqContent from './WordFreqContent/WordFreqContent';

/* Selectors */
import {
  getIsLoadingKeywordReverseAggSummary,
  getIsLoadingKeywordReverseWordFreqSummary,
  getKeywordReverseAggSummary,
  getKeywordReverseWordFreqSummary,
  getShouldFetchKeywordReverseProgress,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Interfaces */
import {
  KeywordReverseAggSummary,
  KeywordReverseWordFreqSummary,
} from '../../../../interfaces/KeywordResearch/KeywordReverse';
import {
  fetchKeywordReverseWordFreqSummary,
  fetchKeywordReverseAggSummary,
} from '../../../../actions/KeywordResearch/KeywordReverse';

/* Utils */
import { removeSpecialChars } from '../../../../utils/format';
import { copyToClipboard } from '../../../../utils/file';
import { success } from '../../../../utils/notifications';
import KeywordDistribution from './KeywordDistribution';

interface Props {
  isLoadingKeywordReverseWordFreqSummary: boolean;
  isLoadingKeywordReverseAggSummary: boolean;
  shouldFetchKeywordReverseProgress: boolean;
  keywordReverseWordFreqSummary: KeywordReverseWordFreqSummary[];
  keywordReverseAggSummary: KeywordReverseAggSummary;
  fetchKeywordReverseWordFreqSummary: (sortDir: 'asc' | 'desc') => void;
  fetchKeywordReverseAggSummary: () => void;
}

const ReverseSummary = (props: Props) => {
  const {
    isLoadingKeywordReverseWordFreqSummary,
    isLoadingKeywordReverseAggSummary,
    shouldFetchKeywordReverseProgress,
    keywordReverseWordFreqSummary,
    keywordReverseAggSummary,
    fetchKeywordReverseWordFreqSummary,
  } = props;

  const [wordFreqSort, setWordFreqSort] = useState<'asc' | 'desc'>('desc');

  const handleWordFreqSort = () => {
    fetchKeywordReverseWordFreqSummary(wordFreqSort === 'desc' ? 'asc' : 'desc');

    setWordFreqSort(prevState => {
      return prevState === 'desc' ? 'asc' : 'desc';
    });
  };

  // reset to desc on unmount
  useEffect(() => {
    return () => {
      fetchKeywordReverseWordFreqSummary('desc');
      setWordFreqSort('desc');
    };
  }, []);

  /* Copy Keywords */
  const handleCopyKeywords = (deliminator?: string) => {
    const keywords = keywordReverseWordFreqSummary.map(({ word }) => word);
    const prepareKeywordsStringCopy = removeSpecialChars(keywords, deliminator);
    copyToClipboard(prepareKeywordsStringCopy).then(() => {
      success('Keywords successfully copied');
    });
  };

  return (
    <section className={styles.databaseSummarySection}>
      {/* Word Analysis */}
      <KeywordDatabaseSummaryCards
        title="Word Frequency"
        sort={wordFreqSort}
        handleSort={handleWordFreqSort}
        handleCopy={handleCopyKeywords}
        content={<WordFreqContent data={keywordReverseWordFreqSummary} />}
        isLoading={isLoadingKeywordReverseWordFreqSummary || shouldFetchKeywordReverseProgress}
      />

      <KeywordDatabaseSummaryCards
        title="Quick Summary"
        content={<KeywordDistribution data={keywordReverseAggSummary} />}
        isLoading={isLoadingKeywordReverseAggSummary || shouldFetchKeywordReverseProgress}
      />
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordReverseWordFreqSummary: getIsLoadingKeywordReverseWordFreqSummary(state),
    isLoadingKeywordReverseAggSummary: getIsLoadingKeywordReverseAggSummary(state),
    shouldFetchKeywordReverseProgress: getShouldFetchKeywordReverseProgress(state),
    keywordReverseAggSummary: getKeywordReverseAggSummary(state),
    keywordReverseWordFreqSummary: getKeywordReverseWordFreqSummary(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseWordFreqSummary: (sortDir: 'asc' | 'desc') =>
      dispatch(fetchKeywordReverseWordFreqSummary(sortDir)),
    fetchKeywordReverseAggSummary: () => dispatch(fetchKeywordReverseAggSummary()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseSummary);
