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
  middleScroll?: boolean;
  ref?: any;
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
  const {
    expandedRows,
    extendedInfo,
    rows,
    columns,
    columnFilterData,
    type,
    middleScroll,
    ref,
  } = props;
  if (middleScroll) {
    const lowerBound = columns.slice(0, 2);
    const middleBound = columns.slice(2, columns.length - 2);
    const upperBound = columns.slice(columns.length - 2, columns.length);
    return (
      <Table.Body>
        <tr className="middle-body-column">
          <td>
            {rows.length &&
              rows.map((row: any, index) => (
                <Table.Row key={`${Date.now() + index}--tb-row`} className="right-body-child-row">
                  {lowerBound.map(
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
              ))}
          </td>
          <td style={{ maxWidth: '670px', overflow: 'hidden' }} ref={ref} className="middle-body">
            {rows.length &&
              rows.map((row: any, index) => (
                <Table.Row key={`${Date.now() + index}--tb-row`} className="middle-body-child-row">
                  {middleBound.map(
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
              ))}
          </td>
          <td>
            {rows.length &&
              rows.map((row: any, index) => (
                <Table.Row key={`${Date.now() + index}--tb-row`} className="left-body-child-row">
                  {upperBound.map(
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
              ))}
          </td>
        </tr>
        {/*{rows.length ? (*/}
        {/*  rows.map((row: any, index) => (*/}
        {/*    <React.Fragment key={`${index}-tb-fragment`}>*/}
        {/*      <Table.Row key={`${Date.now() + index}--tb-row`}>*/}
        {/*        {lowerBound.map(*/}
        {/*          (column, colIndex) =>*/}
        {/*            getColumnLabel(column.dataKey, columnFilterData) && (*/}
        {/*              <TableCell*/}
        {/*                type={type}*/}
        {/*                column={column}*/}
        {/*                row={row}*/}
        {/*                key={`${Date.now() + colIndex}--tb-cell`}*/}
        {/*              />*/}
        {/*            )*/}
        {/*        )}*/}
        {/*      <Table.Cell style={{maxWidth:'670px',overflow:'auto'}}>*/}
        {/*        {middleBound.map(*/}
        {/*          (column, colIndex) =>*/}
        {/*            getColumnLabel(column.dataKey, columnFilterData) && (*/}
        {/*              <TableCell*/}
        {/*                type={type}*/}
        {/*                column={column}*/}
        {/*                row={row}*/}
        {/*                key={`${Date.now() + colIndex}--tb-cell`}*/}
        {/*              />*/}
        {/*            )*/}
        {/*        )}*/}
        {/*      </Table.Cell>*/}
        {/*        {upperBound.map(*/}
        {/*          (column, colIndex) =>*/}
        {/*            getColumnLabel(column.dataKey, columnFilterData) && (*/}
        {/*              <TableCell*/}
        {/*                type={type}*/}
        {/*                column={column}*/}
        {/*                row={row}*/}
        {/*                key={`${Date.now() + colIndex}--tb-cell`}*/}
        {/*              />*/}
        {/*            )*/}
        {/*        )}*/}
        {/*      </Table.Row>*/}
        {/*    </React.Fragment>*/}
        {/*  ))*/}
        {/*) : (*/}
        {/*  <tr />*/}
        {/*)}*/}
      </Table.Body>
    );
  }
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
