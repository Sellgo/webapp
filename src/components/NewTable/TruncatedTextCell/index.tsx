import React, { memo } from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';

/* Utils */
import { getCountryFullName, truncateString } from '../../../utils/format';

/* Interface */
import { RowCell } from '../../../interfaces/Table';
import { prettyPrintSeller } from '../../../constants/SellerResearch/SellerDatabase';

/* Interface */
interface Props extends RowCell {
  maxLength?: number;
  showCountryFullName?: boolean;
  newClassName?: string;
}

const TruncatedTextCell = (props: Props) => {
  const { rowData, dataKey, maxLength = 20, showCountryFullName, newClassName } = props;

  let displayText = '';

  const rawContent = rowData[dataKey] || '-';

  if (Array.isArray(rawContent)) {
    displayText = rawContent.join(',');
  } else if (typeof rawContent === 'string') {
    displayText = rawContent;
  }

  if (dataKey === 'country' && showCountryFullName) {
    displayText = getCountryFullName(rawContent);
  }

  if (dataKey === 'seller_type') {
    displayText = prettyPrintSeller(displayText);
  }

  return (
    <Table.Cell {...props}>
      <div className={`${styles.truncatedTextCell} ${newClassName}`}>
        {truncateString(displayText, maxLength)}
      </div>
    </Table.Cell>
  );
};

export default memo(TruncatedTextCell);
