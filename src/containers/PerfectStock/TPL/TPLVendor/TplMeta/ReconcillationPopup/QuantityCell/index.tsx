import React from 'react';
import { Table } from 'rsuite';

/* Interfaces */
import { RowCell } from '../../../../../../../interfaces/Table';

/* Utils */
import { formatNumber, showNAIfNull } from '../../../../../../../utils/format';

interface Props extends RowCell {
  isSum?: boolean;
}
const QuantityCell = (props: Props) => {
  const { isSum, ...otherProps } = props;
  const { rowData, dataKey } = otherProps;
  const qty = showNAIfNull(rowData[dataKey], formatNumber(rowData[dataKey]));
  let summedQuantity = '';
  if (rowData.reconcile) {
    summedQuantity = formatNumber((Number(rowData[dataKey]) || 0) + Number(rowData.reconcile));
  }

  return <Table.Cell {...props}>{isSum ? summedQuantity : qty}</Table.Cell>;
};

export default QuantityCell;
