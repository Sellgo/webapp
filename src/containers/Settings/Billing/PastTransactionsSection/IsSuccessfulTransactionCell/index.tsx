import React from 'react';
import { Table } from 'rsuite';
import { Icon } from 'semantic-ui-react';
/* Types */
import { RowCell } from '../../../../../interfaces/Table';

const IsSuccessfulTransactionCell = (props: RowCell) => {
  const { rowData, dataKey } = props;
  const icon = rowData[dataKey] ? (
    <Icon name="check" color="green" />
  ) : (
    <Icon name="close" color="red" />
  );

  return <Table.Cell {...props}>{icon}</Table.Cell>;
};

export default IsSuccessfulTransactionCell;
