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
  leftFixedColumns: number;
  rightFixedColumns: number;
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
    const { row, type, columnFilterData } = this.props;
    const show = columnFilterData.filter((c: any) => c.show);
    const hide = nextProps.columnFilterData.filter((c: any) => c.show);
    if (type === 'supplier') {
      return JSON.stringify(row) !== JSON.stringify(nextProps.row) || show.length !== hide.length;
    }
    return true;
  }

  render() {
    const { index, type, columns, row, columnFilterData } = this.props;
    return (
      <React.Fragment>
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
      </React.Fragment>
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
    leftFixedColumns,
    rightFixedColumns,
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
    const leftBound = leftFixedColumns ? leftFixedColumns : 0;
    const rightBound = rightFixedColumns ? rightFixedColumns : 0;
    const bound = isTypeProducts ? filteredColumns.length - 1 : filteredColumns.length;
    const lowerBound = filteredColumns.slice(0, leftBound);
    const middleBound = filteredColumns.slice(leftBound, filteredColumns.length - rightBound);
    const upperBound = filteredColumns.slice(filteredColumns.length - rightBound, bound);

    let timer: NodeJS.Timeout | undefined = undefined;
    const onBodyScroll = (evt: any) => {
      const leadsHeader = document.querySelector('.leads-tracker-middle');

      const middleHeader = document.querySelector('.middle-header');
      const centerScroll = document.querySelector('.middle-scroll-cell');
      const bottomScroll = document.querySelector('.bottom-scrollbar');
      if (leadsHeader) {
        leadsHeader.scrollLeft = evt.target.scrollLeft;
      }
      if (!!middleHeader && !!centerScroll && bottomScroll) {
        middleHeader.scrollLeft = evt.target.scrollLeft;
        centerScroll.scrollLeft = evt.target.scrollLeft;
        bottomScroll.scrollLeft = evt.target.scrollLeft;
        bottomScroll.classList.add('bottom-scrollbar-visible');
        // @ts-ignore
        clearTimeout(timer);
        timer = setTimeout(() => {
          bottomScroll.classList.remove('bottom-scrollbar-visible');
        }, 500);
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
    const style = type === 'trackerTable' ? { width: '100%' } : {};
    return (
      <Table.Body
        className={type === 'trackerTable' ? `tracker-body ${loading && 'disabled'}` : ''}
      >
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
                style: style,
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
            console.log(filteredColumns.length);
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
                        <React.Fragment key={`--tb-row--${cell.side}-inner-row--${index}`}>
                          {type === 'trackerTable' && (
                            <tr>
                              <td colSpan={3} className="hidden-arrow-row">
                                {cell.side === 'center' && rowExpander(row)}
                              </td>
                            </tr>
                          )}
                          <Table.Row
                            className={className}
                            style={
                              filteredColumns.length === 4
                                ? { height: '46px' }
                                : filteredColumns.length === 2
                                ? { height: '56px' }
                                : {}
                            }
                          >
                            {filteredColumns.length === 4 && cell.side === 'center' && (
                              <td colSpan={columns.length - 3}>&nbsp;</td>
                            )}
                            {filteredColumns.length === 2 && cell.side === 'center' && (
                              <td
                                colSpan={columns.length - 2}
                                className={'ptr-cell ptr-blank-cell'}
                              >
                                &nbsp;
                              </td>
                            )}
                            {cell.rows.map(
                              (column: any, colIndex: any) =>
                                getColumnLabel(column.dataKey, columnFilterData) && (
                                  <React.Fragment>
                                    <TableCell
                                      type={type}
                                      column={column}
                                      row={row}
                                      key={`${colIndex}--tb-cell--${cell.side}`}
                                      className={
                                        expandedRows && expandedRows === row.id
                                          ? 'remove-bottom-border'
                                          : ''
                                      }
                                    />
                                  </React.Fragment>
                                )
                            )}
                          </Table.Row>
                          {expandedRows &&
                            expandedRows === row.id &&
                            extendedInfo &&
                            type === 'trackerTable' && (
                              <React.Fragment>
                                <Table.Row key={index + '-extended'}>
                                  <Table.Cell
                                    colSpan={3}
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
                                  <Table.Cell colSpan={3} className="graph-view-container " />
                                </Table.Row>
                                <tr style={{ height: '8px' }} />
                              </React.Fragment>
                            )}
                        </React.Fragment>
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
