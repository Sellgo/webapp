import React from 'react';
import { Table } from 'rsuite';

/* Types */
import { RowCell } from '../../../interfaces/Table';

const GenericRowCell = (props: RowCell) => {
  const { dataKey } = props;
  return <Table.Cell {...props} dataKey={dataKey} />;
};

export default GenericRowCell;
