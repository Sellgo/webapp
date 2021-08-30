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

  const statsChange = Number.parseFloat(String(changePercent));

  return (
    <div className={styles.displayStatChange}>
      {/*  Show the actual stat */}
      <span className={styles.stat}>{showNAIfZeroOrNull(displayStat, displayStat)} / </span>

      {/* Show the change percent */}

      <span className={styles.changePercent}>
        {showNAIfZeroOrNull(Number(statsChange), `${changePercent}`)}
      </span>
    </div>
  );
};

export default ChangeStatsCell;
