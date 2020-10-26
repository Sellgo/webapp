import { Column } from '../../index';
import { Table } from 'semantic-ui-react';
import React from 'react';
import './index.scss';
interface Props {
  columns: Column[];
  rightFixedColumns: number;
  leftFixedColumns: number;
  render: (column: Column) => any;
}

export const MiddleScrollHeader = (props: Props) => {
  const { columns, leftFixedColumns, rightFixedColumns, render } = props;
  const lowerBound = columns.slice(0, leftFixedColumns);
  const middleBound = columns.slice(leftFixedColumns, columns.length - rightFixedColumns);
  const upperBound = columns.slice(columns.length - rightFixedColumns, columns.length);
  return (
    <Table.Row className="middle-scroll-layout">
      <th colSpan={leftFixedColumns} className="fixed-th-first">
        <tr>{lowerBound.map((c: Column) => render(c))}</tr>
      </th>
      {middleBound.map((c: Column) => render(c))}
      <th colSpan={rightFixedColumns} className="fixed-th-last">
        <tr>{upperBound.map((c: Column) => render(c))}</tr>
      </th>
    </Table.Row>
  );
};
