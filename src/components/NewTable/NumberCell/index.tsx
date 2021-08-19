import React from 'react';
import { Table } from 'rsuite';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../utils/format';

/* Types */
import { RowCell } from '../../../interfaces/Table';

const NumberCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const displayNumber = formatNumber(rowData[dataKey]);
  return (
    <Table.Cell {...props}>{showNAIfZeroOrNull(rowData[dataKey], `${displayNumber}`)}</Table.Cell>
  );
};

export default NumberCell;
