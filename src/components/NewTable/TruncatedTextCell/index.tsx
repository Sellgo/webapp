import React from 'react';
import { Table } from 'rsuite';

/* Utils */
import { truncateString } from '../../../utils/format';

/* Types */
import { RowCell } from '../../../interfaces/Table';

const TruncatedTextCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const rowContent = rowData[dataKey].join(',') || '-';

  return <Table.Cell {...props}>{truncateString(rowContent, 20)}</Table.Cell>;
};

export default TruncatedTextCell;
