import { Column } from '../../index';
import { Table } from 'semantic-ui-react';
import React from 'react';
import './index.scss';
interface Props {
  columns: Column[];
  rightFixedColumns: number;
  leftFixedColumns: number;
}

export const MiddleScrollHeader = (props: Props) => {
  const { columns, leftFixedColumns, rightFixedColumns } = props;
  const lowerBound = columns.slice(0, leftFixedColumns);
  const middleBound = columns.slice(leftFixedColumns, columns.length - rightFixedColumns);
  const upperBound = columns.slice(columns.length - rightFixedColumns, columns.length);
  return (
    <Table.Row className="middle-scroll-layout">
      {lowerBound.map((c: Column) => (
        <th key={c.dataKey} className="fixed-th-first">
          {c.label}
        </th>
      ))}
      {middleBound.map((c: Column) => (
        <th key={c.dataKey}>{c.label}</th>
      ))}

      {upperBound.map((c: Column) => (
        <th key={c.dataKey} className="fixed-th-last">
          {c.label}
        </th>
      ))}
    </Table.Row>
  );
};
