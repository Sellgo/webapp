import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';

/* Components */
import KeywordDatabaseSummaryCards from '../../../../components/KeywordDatabaseSummaryCards';
import WordFreqContent from './WordFreqContent/WordFreqContent';

/* Selectors */
import {
  getIsLoadingKeywordDatabaseWordFreqSummary,
  getKeywordDatabaseWordFreqSummary,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Interfaces */
import { KeywordDatabaseWordFreqSummary } from '../../../../interfaces/KeywordResearch/KeywordDatabase';

interface Props {
  isLoadingKeywordDatabaseWordFreqSummary: boolean;
  keywordDatabaseWordFreqSummary: KeywordDatabaseWordFreqSummary[];
}

const DatabaseSummary = (props: Props) => {
  const { isLoadingKeywordDatabaseWordFreqSummary, keywordDatabaseWordFreqSummary } = props;

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
        content={<WordFreqContent data={[]} />}
        isLoading={false}
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
  };
};

export default connect(mapStateToProps)(DatabaseSummary);
