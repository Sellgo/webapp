import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../utils/format';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Row cell, Appends $ sign infront of monetary cells */
const StatsCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const displayStat = formatNumber(rowData[dataKey]);
  return (
    <Table.Cell {...props}>
      <div className={styles.statsCell}>
        {showNAIfZeroOrNull(rowData[dataKey], `${displayStat}`)}
      </div>
    </Table.Cell>
  );
};

export default StatsCell;
