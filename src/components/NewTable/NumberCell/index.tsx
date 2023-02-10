import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { formatNumber } from '../../../utils/format';

/* Interface */
import { RowCell } from '../../../interfaces/Table';

/* Interface */
interface Props extends RowCell {
  data?: number;
}

const NumberCell = (props: Props) => {
  const { rowData, dataKey, data } = props;

  let rowContent = rowData[dataKey];
  if (Array.isArray(rowContent)) {
    rowContent = rowContent.length;
  } else if (data && data > 0) {
    rowContent = data;
  }

  return (
    <Table.Cell {...props}>
      <div className={styles.numberCell}>{formatNumber(rowContent) || '-'}</div>
    </Table.Cell>
  );
};

export default memo(NumberCell);
