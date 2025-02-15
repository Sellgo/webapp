import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../interfaces/Table';

/* Utils */
import { formatNumber, showNAIfNull } from '../../../../../utils/format';

interface Props extends RowCell {
  handleExpansion: (rowData: any) => void;
}

const StockOutDate = (props: Props) => {
  const { handleExpansion, ...otherProps } = props;
  const { rowData } = otherProps;
  const daysToStockOut = showNAIfNull(rowData.days_until_so, formatNumber(rowData.days_until_so));

  const stockOutDate = new Date();
  stockOutDate.setTime(stockOutDate.getTime() + daysToStockOut * 24 * 60 * 60 * 1000);

  return (
    <Table.Cell {...otherProps}>
      <div
        className={`
          ${styles.stockOutCell}`}
        onClick={() => handleExpansion(rowData)}
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
