import React from 'react';
import { Table } from 'rsuite';

/* Types */
import { RowCell } from '../../../interfaces/Table';

/* Row cell, Appends $ sign infront of monetary cells */
const GenericRowCell = (props: RowCell) => {
  const { dataKey } = props;
  return <Table.Cell {...props} dataKey={dataKey} />;
};

export default GenericRowCell;
