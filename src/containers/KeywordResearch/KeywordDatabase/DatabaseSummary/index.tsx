import React from 'react';
import { Icon } from 'semantic-ui-react';

/* Styling */
import styles from './index.module.scss';

/* Components */
import KeywordDatabaseSummaryCards from '../../../../components/KeywordDatabaseSummaryCards';

import WordFreqContent from './WordFreqContent/WordFreqContent';

const DatabaseSummary = () => {
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
        content={<WordFreqContent />}
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
        content={<WordFreqContent />}
      />
    </section>
  );
};
export default DatabaseSummary;
