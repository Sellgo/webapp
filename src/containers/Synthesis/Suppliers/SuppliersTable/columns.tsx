import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Supplier } from '../../../../actions/Synthesis';
import { Column } from '../../../../components/Table';

const renderName = (row: Supplier) => (
  <Table.Cell as={Link} to={`/synthesis/${row.id}`}>
    {row.name}
  </Table.Cell>
);

const columns: Column[] = [
  {
    label: 'Supplier Name',
    dataKey: 'name',
    sortable: true,
    render: renderName,
  },
  {
    label: 'File Name',
    dataKey: 'fileName',
  },
  {
    label: 'Status',
    dataKey: 'status',
  },
  {
    label: 'Action',
    dataKey: 'action',
  },
  {
    label: 'Inventory',
    dataKey: 'inventory',
  },
  {
    label: 'Speed',
    dataKey: 'speed',
  },
  {
    label: 'Completed',
    dataKey: 'completed',
  },
  {
    label: 'Product to Listing Ratio',
    dataKey: 'p2l_ratio',
  },
  {
    label: 'Supplier Rate (%)',
    dataKey: 'rate',
    sortable: true,
    type: 'number',
  },
  {
    label: '',
    dataKey: 'actions',
  },
];

export default columns;
