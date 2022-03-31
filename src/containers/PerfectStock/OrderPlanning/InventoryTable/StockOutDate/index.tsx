import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { formatNumber, showNAIfNull } from '../../../../../utils/format';

const StockOutDate = (props: RowCell) => {
  const { rowData } = props;
  const daysToStockOut = showNAIfNull(rowData.days_until_so, formatNumber(rowData.days_until_so));

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
