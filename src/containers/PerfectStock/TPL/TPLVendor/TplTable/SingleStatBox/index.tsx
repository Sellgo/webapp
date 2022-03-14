import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Interface */
import { RowCell } from '../../../../../../interfaces/Table';
import { formatNumber, showNAIfNull, formatDecimal } from '../../../../../../utils/format';

const SingleStatBox = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const displayStat = showNAIfNull(rowData[`${dataKey}`], formatNumber(rowData[`${dataKey}`]));
  const displayChange = showNAIfNull(
    rowData[`${dataKey}_change`],
    formatDecimal(rowData[`${dataKey}_change`])
  );

  if (displayStat === '0') {
    return (
      <Table.Cell {...props}>
        <div className={styles.displayStatWrapper}>
          <div className={styles.zeroStat}>0</div>
        </div>
      </Table.Cell>
    );
  }

  return (
    <Table.Cell {...props}>
      <div className={styles.displayStatWrapper}>
        <span className={styles.displayStat}>{displayStat}</span>
        <span
          className={`
          ${styles.change}
          ${parseFloat(displayChange) < 0 ? styles.change__negative : styles.change__positive}
        `}
        >
          {displayChange !== '0.00' && displayChange !== '-' ? `${displayChange}%` : ''}
        </span>
      </div>
    </Table.Cell>
  );
};

export default SingleStatBox;
