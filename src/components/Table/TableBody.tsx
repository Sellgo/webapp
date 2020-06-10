import React from 'react';
import { Table } from 'semantic-ui-react';
import { Column, getColumnClass, getColumnLabel, renderCell } from './index';

interface TableBodyProps {
  rows: Column[];
  columnFilterData: any;
  type: string;
  expandedRows: any;
  extendedInfo: any;
  columns: Column[];
}

interface TableColumnCellProps {
  column: Column;
  row: any;
  type: string;
}

const TableCell = (props: TableColumnCellProps) => {
  const { type, column, row } = props;

  const className =
    type !== 'trackerTable'
      ? `table-cell ${column && column.dataKey} ${getColumnClass(column)}`
      : '';

  const cellProps: any = {
    className,
    key: column.dataKey || Date.now(),
  };

  return <Table.Cell {...cellProps}>{column ? renderCell(row, column) : null}</Table.Cell>;
};

export const TableBody = (props: TableBodyProps) => {
  const { expandedRows, extendedInfo, rows, columns, columnFilterData, type } = props;
  return (
    <Table.Body>
      {rows.length ? (
        rows.map((row: any, index) => (
          <React.Fragment key={`${index}-tb-fragment`}>
            <Table.Row key={`${Date.now() + index}--tb-row`}>
              {columns.map(
                (column, colIndex) =>
                  getColumnLabel(column.dataKey, columnFilterData) && (
                    <TableCell
                      type={type}
                      column={column}
                      row={row}
                      key={`${Date.now() + colIndex}--tb-cell`}
                    />
                  )
              )}
            </Table.Row>
            {expandedRows && expandedRows === row.id && extendedInfo && (
              <Table.Row key={index + '-extended'}>
                <Table.Cell colSpan={columns.length} className="default-column">
                  {''}
                  {expandedRows === row.id && extendedInfo(row)}
                </Table.Cell>
              </Table.Row>
            )}
          </React.Fragment>
        ))
      ) : (
        <tr />
      )}
    </Table.Body>
  );
};
