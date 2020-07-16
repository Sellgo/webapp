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
  rowExpander?: any;
}

interface TableColumnCellProps {
  column: Column;
  row: any;
  type: string;
  as?: string;
  className?: string;
}

const TableCell = (props: TableColumnCellProps) => {
  const { type, column, row, as, className: customClass } = props;
  const { className: columnClass = '' } = column;
  const className = `table-cell ${column && column.dataKey} ${getColumnClass(
    column
  )} ${customClass} ${columnClass}`;

  let cellProps: any = {
    className,
    key: column.dataKey || Date.now(),
  };
  if (as) {
    cellProps = { ...cellProps, as };
  }
  if (type === 'trackerTable') {
    cellProps = {
      ...cellProps,
      className: `${customClass} ${columnClass}`,
      style: { height: '6em' },
    };
  }

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
    rowExpander,
  } = props;
  const filteredColumns = columns.filter(c => getColumnLabel(c.dataKey, columnFilterData));

  if (middleScroll) {
    const lowerBound = columns.slice(0, 2);
    const middleBound = columns.slice(2, columns.length - 2);
    const upperBound = columns.slice(columns.length - 2, columns.length - 1);
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

    if (type === 'trackerTable') {
      const style = { height: '6em' };
      return (
        <Table.Body className="tracker-body">
          {rows.length ? (
            rows.map((row: any, index) => (
              <React.Fragment key={`${index}-tb-fragment`}>
                <tr>
                  <td colSpan={columns.length} className="hidden-arrow-row">
                    {rowExpander(row)}
                  </td>
                </tr>
                <Table.Row key={`${Date.now() + index}--tb-row`} style={style}>
                  {filteredColumns.length === 2 && (
                    <td
                      colSpan={columns.length - 2}
                      key={`${index}-blank-row`}
                      style={{ height: '60px' }}
                      className={
                        expandedRows && expandedRows === row.id ? 'remove-bottom-border' : ''
                      }
                    />
                  )}
                  {columns.map(
                    (column, colIndex) =>
                      getColumnLabel(column.dataKey, columnFilterData) && (
                        <TableCell
                          type={type}
                          column={column}
                          row={row}
                          key={`${Date.now() + colIndex}--tb-cell`}
                          className={
                            expandedRows && expandedRows === row.id ? 'remove-bottom-border' : ''
                          }
                        />
                      )
                  )}
                </Table.Row>

                {expandedRows && expandedRows === row.id && extendedInfo && (
                  <React.Fragment>
                    <Table.Row key={index + '-extended'}>
                      <Table.Cell
                        colSpan={columns.length - 1}
                        className={
                          expandedRows && expandedRows === row.id
                            ? 'remove-top-border'
                            : 'graph-view'
                        }
                      >
                        {''}

                        {expandedRows === row.id && extendedInfo(row)}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row key={index + '-extended' + row.id}>
                      <Table.Cell colSpan={columns.length - 1} className="graph-view-container " />
                    </Table.Row>
                    <tr style={{ height: '8px' }} />
                  </React.Fragment>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr />
          )}
        </Table.Body>
      );
    }
    return (
      <Table.Body>
        <Table.Row className="middle-body-column">
          {scrollRows.map((cell: any) => {
            let className = '';
            let tableDataProps: any = {};
            if (cell.side === 'right') {
              className = 'right-body-child-row';
            }
            if (cell.side === 'center') {
              className = 'middle-body-child-row';
              tableDataProps = { ...tableDataProps, className: 'middle-body' };
              if (filteredColumns.length === 4) {
                tableDataProps = {
                  ...tableDataProps,
                  colSpan: columns.length - 3,
                  style: { padding: 0.5 },
                };
              }
            }
            if (cell.side === 'left') {
              className = 'left-body-child-row';
              if (filteredColumns.length === 4) {
                tableDataProps = { ...tableDataProps, style: { width: '1em' }, colSpan: 2 };
              }
            }
            return (
              <td {...tableDataProps} key={`${cell.side}--td-cell`}>
                <table className="body-inner-table">
                  <tbody className="inner-tbody">
                    {rows.length ? (
                      rows.map((row: any, index: any) => (
                        <Table.Row
                          className={className}
                          key={`--tb-row--${cell.side}-inner-row--${index}`}
                          style={filteredColumns.length === 4 ? { height: '46px' } : {}}
                        >
                          {filteredColumns.length === 4 && cell.side === 'center' && (
                            <td colSpan={columns.length - 3}>&nbsp;</td>
                          )}
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
                      ))
                    ) : (
                      <tr />
                    )}
                  </tbody>
                </table>
              </td>
            );
          })}
        </Table.Row>
      </Table.Body>
    );
  }
  return (
    <Table.Body>
      {rows.length ? (
        rows.map((row: any, index) => (
          <React.Fragment key={`${index}-tb-fragment`}>
            <Table.Row
              key={`${Date.now() + index}--tb-row`}
              style={type === 'trackerTable' ? { height: '8em' } : {}}
            >
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
