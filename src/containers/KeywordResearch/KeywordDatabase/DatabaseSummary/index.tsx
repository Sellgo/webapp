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
  getShouldFetchkeywordDatabaseProgress,
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
import KeywordDistribution from './KeywordDistribution';
import DisplayToggle from '../../../../components/DisplayToggle';

interface Props {
  shouldFetchKeywordDatabaseProgressState: boolean;
  isLoadingKeywordDatabaseWordFreqSummary: boolean;
  keywordDatabaseWordFreqSummary: KeywordDatabaseWordFreqSummary[];
  isLoadingKeywordDatabaseAggSummary: boolean;
  keywordDatabaseAggSummary: KeywordDatabaseAggSummary;
  fetchKeywordDatabaseWordFreqSummary: (sortDir: 'asc' | 'desc') => void;
}

const DatabaseSummary = (props: Props) => {
  const {
    shouldFetchKeywordDatabaseProgressState,
    isLoadingKeywordDatabaseWordFreqSummary,
    isLoadingKeywordDatabaseAggSummary,
    keywordDatabaseWordFreqSummary,
    keywordDatabaseAggSummary,
    fetchKeywordDatabaseWordFreqSummary,
  } = props;

  const [wordFreqSort, setWordFreqSort] = useState<'asc' | 'desc'>('desc');
  const [expandSummaryMenu, setExpandSummaryMenu] = useState<boolean>(false);
  const [isSummaryNew, setIsSummaryNew] = useState<boolean>(true);

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

  /* Handle expansion */
  const handleExpandSummaryMenu = () => {
    setExpandSummaryMenu(prevState => !prevState);
    setIsSummaryNew(false);
  };

  // reset to desc on unmount
  useEffect(() => {
    return () => {
      fetchKeywordDatabaseWordFreqSummary('desc');
      fetchKeywordDatabaseAggSummary();
      setWordFreqSort('desc');
    };
  }, []);

  // Check when summary data is updated
  useEffect(() => {
    setIsSummaryNew(true);
  }, [keywordDatabaseAggSummary, keywordDatabaseWordFreqSummary]);

  return (
    <section className={styles.databaseSummarySection}>
      <DisplayToggle
        title="STATISTICS"
        collapsed={!expandSummaryMenu}
        handleClick={handleExpandSummaryMenu}
        collapsedColor="#F7F7F7"
        expandedColor="#3CF7AF"
        collapsedFontColor="#636D76"
        expandedFontColor="#1E1E1E"
        collapsedArrowColor="#636D76"
        expandedArrowColor="#1E1E1E"
        collapsedIcon={isSummaryNew ? <div className={styles.greenCircle} /> : <div />}
      />
      {expandSummaryMenu && (
        <div className={styles.summaryWrapper}>
          {/* Word Frequency */}
          <KeywordDatabaseSummaryCards
            title="Word Frequency"
            sort={wordFreqSort}
            handleSort={handleWordFreqSort}
            handleCopy={handleCopyKeywords}
            content={<WordFreqContent data={keywordDatabaseWordFreqSummary} />}
            isLoading={
              isLoadingKeywordDatabaseWordFreqSummary || shouldFetchKeywordDatabaseProgressState
            }
          />

          {/* Word Analysis */}
          <KeywordDatabaseSummaryCards
            title="Quick Summary"
            content={<KeywordDistribution data={keywordDatabaseAggSummary} />}
            isLoading={
              isLoadingKeywordDatabaseAggSummary || shouldFetchKeywordDatabaseProgressState
            }
          />
        </div>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    shouldFetchKeywordDatabaseProgressState: getShouldFetchkeywordDatabaseProgress(state),
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
