import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { truncateString } from '../../../utils/format';

/* Interface */
import { RowCell } from '../../../interfaces/Table';
import { prettyPrintSeller } from '../../../constants/SellerResearch/SellerDatabase';

/* Interface */
interface Props extends RowCell {
  maxLength?: number;
}

const TruncatedTextCell = (props: Props) => {
  const { rowData, dataKey, maxLength = 20 } = props;

  let displayText = '';

  const rawContent = rowData[dataKey] || '-';

  if (Array.isArray(rawContent)) {
    displayText = rawContent.join(',');
  } else if (typeof rawContent === 'string') {
    displayText = rawContent;
  }

  if (dataKey === 'seller_type') {
    displayText = prettyPrintSeller(displayText);
  }

  return (
    <Table.Cell {...props}>
      <div className={styles.truncatedTextCell}>{truncateString(displayText, maxLength)}</div>
    </Table.Cell>
  );
};

export default memo(TruncatedTextCell);
