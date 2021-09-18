import React from 'react';
import { Table } from 'rsuite';

/* Utils */
import { truncateString } from '../../../utils/format';

/* Interface */
import { RowCell } from '../../../interfaces/Table';

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

  return <Table.Cell {...props}>{truncateString(displayText, maxLength)}</Table.Cell>;
};

export default TruncatedTextCell;
