import React from 'react';

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

  const statsChange = String(showNAIfZeroOrNull(changePercent, changePercent));

  const isNegative = statsChange !== '-' && statsChange.startsWith('-') ? true : false;

  console.log(changePercent, statsChange, isNegative);

  return (
    <div className={styles.displayStatChange}>
      {/*  Show the actual stat */}
      <span className={styles.stat}>{showNAIfZeroOrNull(displayStat, displayStat)} /</span>

      {/* Show the change percent */}
      {statsChange === '-' ? (
        <span>{'-'}</span>
      ) : isNegative ? (
        <span className={styles.changeNegative}>
          {showNAIfZeroOrNull(changePercent, `${changePercent} %`)}
        </span>
      ) : (
        <span className={styles.changePositive}>
          {showNAIfZeroOrNull(changePercent, `+${changePercent} %`)}
        </span>
      )}
    </div>
  );
};

export default ChangeStatsCell;
