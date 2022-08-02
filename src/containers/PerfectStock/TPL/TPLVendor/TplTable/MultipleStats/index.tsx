import React from 'react';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatDecimal, formatNumber } from '../../../../../../utils/format';

interface Props {
  displayData: { title: string; dataKey: string }[];
  rowData?: any;
  dataKey: string;
  isFloat?: boolean;
  columnHeight?: number;
}

const MultipleStats = (props: Props) => {
  const { displayData, isFloat, ...otherProps } = props;
  const { rowData, columnHeight } = otherProps;

  const updatedDisplayData = displayData.map(data => {
    /* Replace all LND with inside title */
    const title = data.title.replace('LND', `L${rowData.interval?.toString()}D`);
    return { ...data, title };
  });
  console.log('current columnHeight', columnHeight);
  return (
    <div className={styles.inboundFulfillableStat}>
      {updatedDisplayData.map((data, index) => {
        const displayStat = isFloat
          ? formatDecimal(rowData[data.dataKey]) || 0
          : formatNumber(rowData[data.dataKey]) || 0;

        return (
          <div key={index} className={styles.statWrapper}>
            <p className={styles.statLabel}>{data.title}</p>
            <p className={styles.stat}>{displayStat && displayStat !== 'NaN' ? displayStat : ''}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleStats;
