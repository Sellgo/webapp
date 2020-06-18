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
  const { expandedRows, extendedInfo, rows, columns, columnFilterData, type, middleScroll } = props;
  if (middleScroll) {
    const lowerBound = columns.slice(0, 2);
    const middleBound = columns.slice(2, columns.length - 2);
    const upperBound = columns.slice(columns.length - 2, columns.length);
    const scrollRows: any = [
      {
        side: 'right',
        rows: lowerBound,
      },
      {
        side: 'center',
        rows: middleBound,
      },
      {
        side: 'left',
        rows: upperBound,
      },
    ];
    return (
      <Table.Body>
        <tr className="middle-body-column">
          {scrollRows.map((cell: any) => {
            let className = '';
            let tdClassName = '';
            if (cell.side === 'right') {
              className = 'right-body-child-row';
            }
            if (cell.side === 'center') {
              className = 'middle-body-child-row';
              tdClassName = 'middle-body';
            }
            if (cell.side === 'left') {
              className = 'left-body-child-row';
            }
            return (
              <td className={tdClassName} key={`${cell.side}--td-cell`}>
                {rows.length &&
                  rows.map((row: any, index: any) => (
                    <Table.Row key={`${index}--tb-row--${cell.side}`} className={className}>
                      {cell.rows.map(
                        (column: any, colIndex: any) =>
                          getColumnLabel(column.dataKey, columnFilterData) && (
                            <TableCell
                              type={type}
                              column={column}
                              row={row}
                              key={`${colIndex}--tb-cell--${cell.side}`}
                            />
                          )
                      )}
                    </Table.Row>
                  ))}
              </td>
            );
          })}
        </tr>
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
