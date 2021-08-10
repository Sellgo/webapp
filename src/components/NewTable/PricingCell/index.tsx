import React from 'react';
import { Table } from 'rsuite';

/* Utils */
import { formatNumber, showNAIfZeroOrNull } from '../../../utils/format';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Row cell, Appends $ sign infront of monetary cells */
const PricingCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const displayPrice = formatNumber(rowData[dataKey]);
  return (
    <Table.Cell {...props}>{showNAIfZeroOrNull(rowData[dataKey], `$${displayPrice}`)}</Table.Cell>
  );
};

export default PricingCell;
