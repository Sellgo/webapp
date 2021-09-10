import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import KeywordDatabaseSummaryCards from '../../../../components/KeywordDatabaseSummaryCards';
import WordFreqContent from './WordFreqContent/WordFreqContent';
import KeywordDistribution from './KeywordDistribution';

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

interface Props {
  isLoadingKeywordDatabaseWordFreqSummary: boolean;
  keywordDatabaseWordFreqSummary: KeywordDatabaseWordFreqSummary[];
  isLoadingKeywordDatabaseAggSummary: boolean;
  keywordDatabaseAggSummary: KeywordDatabaseAggSummary;
}

const DatabaseSummary = (props: Props) => {
  const {
    isLoadingKeywordDatabaseWordFreqSummary,
    keywordDatabaseWordFreqSummary,
    isLoadingKeywordDatabaseAggSummary,
    keywordDatabaseAggSummary,
  } = props;

  return (
    <section className={styles.databaseSummarySection}>
      {/* Keyword Distribution */}
      <KeywordDatabaseSummaryCards
        title="Keyword Distribution"
        subTitle={
          <h3 className={styles.subTitle}>
            <Icon name="circle" className={styles.circleBlue} />
            Total Keywords
          </h3>
        }
        content={<KeywordDistribution data={keywordDatabaseAggSummary} />}
        isLoading={isLoadingKeywordDatabaseAggSummary}
      />

      {/* Word Analysis */}
      <KeywordDatabaseSummaryCards
        title="Word Analysis"
        subTitle={
          <h3 className={styles.subTitle}>
            <Icon name="circle" className={styles.circleGreen} />
            Word Frequency
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

export default connect(mapStateToProps)(DatabaseSummary);
