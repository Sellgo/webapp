import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Interfaces */
import { KeywordDatabaseAggSummary } from '../../../../../interfaces/KeywordResearch/KeywordDatabase';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

interface Props {
  data: KeywordDatabaseAggSummary;
}

const KeywordDistribution = (props: Props) => {
  const { data } = props;
  const showFormattedNumber = (stat: number) => {
    return showNAIfZeroOrNull(stat, formatNumber(stat));
  };
  return (
    <div className={styles.distributionStats}>
      <div className={styles.statsRow}>
        <p className={styles.statsName} />
        <p className={styles.min}> Min </p>
        <p className={styles.avg}> Average </p>
        <p className={styles.max}> Max </p>
      </div>
      <div className={styles.statsRow}>
        <p className={styles.statsName}> Search Volume </p>
        <p className={styles.statsNumber}> - </p>
        <p className={styles.statsNumber}> {showFormattedNumber(data.avg_search_volume)}</p>
        <p className={styles.statsNumber}> - </p>
      </div>
      <div className={styles.statsRow}>
        <p className={styles.statsName}> Competing products </p>
        <p className={styles.statsNumber}> - </p>
        <p className={styles.statsNumber}> {showFormattedNumber(data.avg_competing_products)}</p>
        <p className={styles.statsNumber}> - </p>
      </div>
    </div>
  );
};

export default memo(KeywordDistribution);
