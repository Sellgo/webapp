import React, { useEffect, Component } from 'react';
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
  loading?: boolean;
  scrollToView?: boolean;
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
  let className = `table-cell ${column && column.dataKey} ${getColumnClass(
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
    className = `${customClass} ${columnClass} ptr-cell`;
    cellProps = {
      ...cellProps,
      className: className.trim(),
      style: { height: '6.05em' },
    };
  }

  return <Table.Cell {...cellProps}>{column ? renderCell(row, column) : null}</Table.Cell>;
};

class TableRow extends Component<any, any> {
  shouldComponentUpdate(nextProps: any): boolean {
    const { row, type } = this.props;
    return (
      (type === 'supplier' && row.file_status === 'pending') ||
      type !== 'supplier' ||
      (type === 'supplier' && row.supplier_id !== nextProps.row.supplier_id)
    );
  }

  render() {
    const { index, type, columns, row, columnFilterData } = this.props;
    return (
      <Table.Row
        key={`${Date.now() + index}--tb-row`}
        style={type === 'trackerTable' ? { height: '8em' } : {}}
      >
        {columns.map(
          (column: any, colIndex: number) =>
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
    );
  }
}

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
    loading,
    scrollToView,
  } = props;
  const filteredColumns = columns.filter(c => getColumnLabel(c.dataKey, columnFilterData));

  useEffect(() => {
    const scrollingContext = document.getElementsByClassName('product-detail-charts')[0];
    if (
      scrollingContext &&
      scrollingContext.parentElement &&
      scrollingContext.parentElement.parentElement &&
      scrollingContext.parentElement.parentElement.previousElementSibling
    ) {
      const possibleScrollView =
        scrollingContext.parentElement.parentElement.previousElementSibling;
      let isFirstChild = true;

      if (
        possibleScrollView &&
        possibleScrollView.previousElementSibling &&
        possibleScrollView.previousElementSibling.previousElementSibling
      ) {
        possibleScrollView.previousElementSibling.previousElementSibling.scrollIntoView({
          behavior: 'smooth',
        });
        isFirstChild = false;
      }
      if (isFirstChild && possibleScrollView && possibleScrollView.previousElementSibling) {
        possibleScrollView.previousElementSibling.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scrollToView]);

  if (middleScroll) {
    const isTypeProducts = type === 'products';
    const lowerBound = filteredColumns.slice(0, isTypeProducts ? 2 : 5);
    const middleBound = filteredColumns.slice(
      isTypeProducts ? 2 : 5,
      isTypeProducts ? filteredColumns.length - 2 : filteredColumns.length - 6
    );
    const upperBound = filteredColumns.slice(
      isTypeProducts ? filteredColumns.length - 2 : filteredColumns.length - 6,
      filteredColumns.length
    );
    const onBodyScroll = (evt: any) => {
      const leadsHeader = document.querySelector('.leads-tracker-middle');

      const middleHeader = document.querySelector('.middle-header');
      const centerScroll = document.querySelector('.middle-scroll-cell');

      if (leadsHeader) {
        leadsHeader.scrollLeft = evt.target.scrollLeft;
      }
      if (!!middleHeader && !!centerScroll) {
        middleHeader.scrollLeft = evt.target.scrollLeft;
        centerScroll.scrollLeft = evt.target.scrollLeft;
      }
    };

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
        <Table.Body className={`tracker-body ${loading && 'disabled'}`}>
          {rows.length ? (
            rows.map((row: any, index) => (
              <React.Fragment key={`${index}-tb-fragment`}>
                <tr>
                  <td colSpan={columns.length} className="hidden-arrow-row">
                    {rowExpander(row)}
                  </td>
                </tr>
                <Table.Row
                  key={`${Date.now() + index}--tb-row`}
                  style={style}
                  className={filteredColumns.length > 2 ? 'ptr-row' : ''}
                >
                  {filteredColumns.length === 2 && (
                    <td
                      colSpan={columns.length - 2}
                      key={`${index}-blank-row`}
                      style={{ height: '6.05em' }}
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
              className = 'middle-body-child-row ';
              tableDataProps = {
                ...tableDataProps,
                className: `middle-body ${
                  type === 'leads-tracker' ? 'lt-border leads-tracker-middle' : ''
                }`,
                onScroll: onBodyScroll,
              };
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
                <table
                  className={`body-inner-table ${
                    type === 'leads-tracker' ? `lt-border-${cell.side}` : ''
                  }`}
                >
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
            <TableRow
              index={index}
              row={row}
              type={type}
              columns={columns}
              columnFilterData={columnFilterData}
            />
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
