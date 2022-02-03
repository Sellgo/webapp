import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../../../utils/format';

const StockOutDate = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const daysToStockOut = showNAIfZeroOrNull(rowData[dataKey], formatNumber(rowData[dataKey]));

  const stockOutDate = new Date();
  stockOutDate.setTime(stockOutDate.getTime() + daysToStockOut * 24 * 60 * 60 * 1000);

  return (
    <Table.Cell {...props}>
      <div
        className={`
          ${styles.stockOutCell}`}
      >
        <div className={styles.stockOutDate}>
          {stockOutDate.toLocaleDateString() !== 'Invalid Date'
            ? stockOutDate.toLocaleDateString()
            : ''}
        </div>

        <div className={styles.daysToStockOut}>{daysToStockOut}</div>
      </div>
    </Table.Cell>
  );
};

export default StockOutDate;
