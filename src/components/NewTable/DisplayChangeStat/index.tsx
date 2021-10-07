import React, { memo } from 'react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../utils/format';

interface Props {
  statsCount: number;
  changePercent: number;
}

const ChangeStatsCell = (props: Props) => {
  const { statsCount, changePercent } = props;

  const displayStat = formatNumber(statsCount);

  const statsChange = changePercent ? String(changePercent) : '-';

  const isNegative = statsChange !== '-' && statsChange.startsWith('-') ? true : false;
  const isZero = statsChange === '0.00';

  return (
    <div className={styles.displayStatChange}>
      {/*  Show the actual stat */}
      <span className={styles.stat}>{showNAIfZeroOrNull(displayStat, displayStat)}</span>

      {/* Show the change percent */}
      {statsChange === '-' ? (
        <span>{'-'}</span>
      ) : isZero ? (
        <span className={styles.changeNeutral}>{`${changePercent}%`}</span>
      ) : isNegative ? (
        <span className={styles.changeNegative}>{changePercent ? `${changePercent}%` : '-'}</span>
      ) : (
        <span className={styles.changePositive}>{changePercent ? `+${changePercent}%` : '-'}</span>
      )}
    </div>
  );
};

export default memo(ChangeStatsCell);
