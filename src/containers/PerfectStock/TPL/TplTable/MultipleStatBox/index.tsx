import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';
import { formatNumber } from '../../../../../utils/format';

interface Props extends RowCell {
  displayData: { title: string; dataKey: string }[];
}

const InboundFulfillableStat = (props: Props) => {
  const { displayData, ...otherProps } = props;
  const { rowData } = otherProps;

  return (
    <Table.Cell {...otherProps}>
      <div className={styles.inboundFulfillableStat}>
        {displayData.map((data, index) => {
          const displayStat = formatNumber(rowData[data.dataKey]) || 0;

          return (
            <div key={index} className={styles.statWrapper}>
              <p className={styles.statLabel}>{data.title}</p>
              <p className={styles.stat}>
                {displayStat && displayStat !== 'NaN' ? displayStat : '-'}
              </p>
            </div>
          );
        })}
      </div>
    </Table.Cell>
  );
};

export default InboundFulfillableStat;
