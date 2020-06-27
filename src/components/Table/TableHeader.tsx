import React from 'react';
import { Checkbox, Icon, Popup, Table } from 'semantic-ui-react';
import SortIcon from '../../assets/images/sort-solid.svg';
import ColumnFilterCard from '../../containers/ProductTracker/ProductTrackerTable/ColumnFilter';
import ProductCheckBoxHeader from '../../containers/Synthesis/Supplier/ProductsTable/productCheckBoxHeader';
import { CheckedRowDictionary } from '../../containers/Synthesis/Supplier/ProductsTable';
import './index.scss';
import { Column, getColumnLabel, getColumnClass } from './index';
interface Shared {
  setSort: (e: any, clickedColumn: string) => void;
  onClick?: (e: any) => void;
  onSetShowSearchFilter: (e: any, label: string) => void;
  renderFilterSectionComponent?: () => void;
  toggleColumnCheckbox?: () => void;
  searchFilteredProduct?: (searchValue: string) => void;
  onSearchChange: (e: any) => void;
  onClearSearch: (e: any) => void;
  rows: any;
  currentPage: number;
  columnFilterData?: any;
  sortDirection: 'descending' | 'ascending';
  type?: string;
  checkedRows?: CheckedRowDictionary;
  updateCheckedRows?: (checkedRows: CheckedRowDictionary) => void;
  columnFilterBox?: boolean;
  handleColumnChange?: any;
  sortedColumnKey: string;
  handleColumnDrop?: (e: any, data: any) => void;
  reorderColumns: (columns: Column[]) => void;
  columnDnD?: boolean;
  className?: string;
}

export interface TableHeaderProps extends Shared {
  columns: Column[];
  middleScroll?: boolean;
}

export interface TableHeaderCellProps extends Shared {
  column: Column;
  columns: Column[];
}

const TableHeaderCell = (props: TableHeaderCellProps) => {
  const {
    column,
    sortedColumnKey,
    sortDirection,
    setSort,
    onSetShowSearchFilter,
    toggleColumnCheckbox,
    columnFilterData,
    handleColumnChange,
    type,
    checkedRows,
    updateCheckedRows,
    currentPage,
    rows,
    columnFilterBox,
    handleColumnDrop,
    reorderColumns,
    columns,
    columnDnD = false,
  } = props;
  const { dataKey, sortable, label, click, check, popUp, icon, className = '' } = column;
  const style = label === 'Supplier' ? { minWidth: '120px' } : { padding: 0, height: 46 };
  let otherProps: any;
  otherProps = {
    onClick: sortable ? (e: any) => setSort(e, dataKey || '') : click ? click : undefined,
    style: { style },
    className:
      type === 'trackerTable'
        ? `table-header ${dataKey} ${className}`
        : `${dataKey}  ${getColumnClass(column)} col-size ${className}`,
  };
  if (dataKey === 'sellgo_score') {
    otherProps = { ...otherProps, className: `${otherProps} remove-left-border` };
  }
  if (sortedColumnKey === dataKey) {
    otherProps = { ...otherProps, sorted: sortDirection };
  }

  if (type === 'trackerTable') {
    otherProps = { ...otherProps, style: { height: '56px' } };
    return (
      <Table.HeaderCell key={dataKey || Date.now()} {...otherProps}>
        {' '}
        {label}
        {label === 'Supplier' && (
          <span>
            <Icon
              className="filter search-filter"
              onClick={(e: any) => onSetShowSearchFilter(e, label)}
            />
          </span>
        )}
        {sortable && (!sortedColumnKey || sortedColumnKey !== dataKey) ? (
          <img src={SortIcon} className="sort-arrow" alt="sort arrow" />
        ) : null}
        {check && <Checkbox value={check} />}
        {icon && popUp ? (
          <Popup
            on="click"
            open={columnFilterBox}
            onClose={toggleColumnCheckbox}
            onOpen={toggleColumnCheckbox}
            position="bottom right"
            basic={true}
            trigger={<Icon className={`${icon}`} />}
            content={
              <ColumnFilterCard
                columnFilterData={columnFilterData}
                handleColumnChange={handleColumnChange}
                handleColumnDrop={handleColumnDrop}
                reorderColumns={reorderColumns}
                columns={columns}
                columnDnD={columnDnD}
              />
            }
          />
        ) : (
          <Icon
            className={icon}
            style={type === 'trackerTable' ? { justifyContent: 'flex-end', right: '20px' } : {}}
          />
        )}
      </Table.HeaderCell>
    );
  }
  return (
    <Table.HeaderCell key={dataKey || Date.now()} {...otherProps}>
      {' '}
      <div className={`table-cell-container ${(icon && popUp) || check ? 'popup-cell' : ''}`}>
        <span className="th-label">{label}</span>
        {sortable && (!sortedColumnKey || sortedColumnKey !== dataKey) ? (
          <img src={SortIcon} className="sort-arrow" alt="sort arrow" />
        ) : sortable && sortedColumnKey === dataKey ? (
          sortDirection === 'ascending' ? (
            <span>
              <Icon name="caret down" className="sort-icon" />
            </span>
          ) : (
            <span>
              {' '}
              <Icon name="caret up" className="sort-icon" />
            </span>
          )
        ) : null}
        {label === 'Search' && (
          <span className="search-ic">
            <Icon
              className="filter search-filter"
              onClick={(e: any) => onSetShowSearchFilter(e, label)}
            />
          </span>
        )}
        {check && checkedRows && updateCheckedRows && (
          <ProductCheckBoxHeader
            currentPage={currentPage}
            currentPageRows={rows}
            checkedRows={checkedRows}
            updateCheckedRows={updateCheckedRows}
          />
        )}
        {icon && popUp ? (
          <Popup
            on="click"
            open={columnFilterBox}
            onClose={toggleColumnCheckbox}
            onOpen={toggleColumnCheckbox}
            position="bottom right"
            basic={true}
            trigger={<Icon className={`${icon} popup-ic`} />}
            content={
              <ColumnFilterCard
                columnFilterData={columnFilterData}
                handleColumnChange={handleColumnChange}
                handleColumnDrop={handleColumnDrop}
                reorderColumns={reorderColumns}
                columns={columns}
                columnDnD={columnDnD}
              />
            }
          />
        ) : (
          <Icon
            className={icon}
            style={{ display: label === 'Search' || !icon ? 'none' : 'inline-block' }}
          />
        )}
      </div>
    </Table.HeaderCell>
  );
};
const TableHeader = (props: TableHeaderProps) => {
  const { columns, middleScroll, ...rest } = props;
  const filteredColumns = columns.filter(c => getColumnLabel(c.dataKey, rest.columnFilterData));
  const onScroll = (evt: any) => {
    const middleHeader = document.querySelector('.middle-header');
    const middleBody = document.querySelector('.middle-body');
    if (!!middleBody && middleHeader) {
      middleBody.scrollLeft = evt.target.scrollLeft;
      middleHeader.scrollLeft = evt.target.scrollLeft;
    }
  };

  const onScrollTable = (evt: any) => {
    const table = document.querySelector('.generic-table');
    if (table) {
      table.scrollLeft = evt.target.scrollLeft;
    }
  };

  if (middleScroll) {
    const lowerBound = filteredColumns.slice(0, 2);
    const middleBound = filteredColumns.slice(2, filteredColumns.length - 2);
    const upperBound = filteredColumns.slice(filteredColumns.length - 2, filteredColumns.length);

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
      <Table.Header>
        {rest.type === 'trackerTable' && (
          <React.Fragment>
            <Table.Row>
              {filteredColumns.map((column, index) => {
                return (
                  <TableHeaderCell
                    columns={columns}
                    column={column}
                    key={column.dataKey || index}
                    {...rest}
                  />
                );
              })}
            </Table.Row>
            <Table.Row className="pt-header">
              <td colSpan={filteredColumns.length} className="pt-header-cell">
                <div className="pt-scroll-container" onScroll={onScrollTable}>
                  <div className="pt-scroll">
                    <p> &nbsp;</p>
                  </div>
                </div>
              </td>
            </Table.Row>
          </React.Fragment>
        )}

        {rest.type !== 'trackerTable' && (
          <tr className="parent-header-column">
            {scrollRows.map((cell: any, cellIndex: any) => {
              const headerCellProps: any = {};
              if (cell.side === 'center') {
                headerCellProps.className = 'middle-header table-header-scroll';
                headerCellProps.onScroll = onScroll;
              }
              if (cell.side === 'right') {
                headerCellProps.className = 'left-fixed-header-column';
              }
              return (
                <Table.HeaderCell {...headerCellProps} key={`${cell.side}---cell-${cellIndex}`}>
                  <table className="header-inner-table">
                    <thead className="inner-tbody">
                      <Table.Row>
                        {cell.rows.map((column: any, index: any) => {
                          return (
                            <TableHeaderCell
                              column={column}
                              columns={columns}
                              key={column.dataKey || index}
                              {...rest}
                            />
                          );
                        })}
                      </Table.Row>
                    </thead>
                  </table>
                </Table.HeaderCell>
              );
            })}
          </tr>
        )}
        <tr className="table-scroll-divider" />
        {rest.type !== 'trackerTable' && (
          <Table.Row>
            {scrollRows.map((cell: any, cellIndex: any) => {
              const headerCellProps: any = {};
              if (cell.side === 'center') {
                headerCellProps.className = 'middle-scroll-cell header-scroll';
                headerCellProps.onScroll = onScroll;
              } else {
                headerCellProps.className = `middle-scroll-cell-disabled`;
              }
              return (
                <Table.HeaderCell {...headerCellProps} key={`${cell.side}---scroll-${cellIndex}`}>
                  <table>
                    <thead>
                      <Table.Row>
                        {cell.rows.map((column: any, index: any) => {
                          const className = `middle-scroll-cell ${getColumnClass(column)}`;
                          const className2 = `middle-scroll-cell-disabled ${getColumnClass(
                            column
                          )}`;

                          return ['left', 'right'].includes(cell.side) ? (
                            <td key={column.dataKey || index} className={className2} />
                          ) : (
                            <td className={className} key={column.dataKey + cell.side || index} />
                          );
                        })}
                      </Table.Row>
                    </thead>
                  </table>
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        )}
        <tr className="table-scroll-divider" />
      </Table.Header>
    );
  }

  return (
    <Table.Header>
      <Table.Row>
        {filteredColumns.map((column, index) => {
          return (
            <TableHeaderCell
              columns={columns}
              column={column}
              key={column.dataKey || index}
              {...rest}
            />
          );
        })}
      </Table.Row>
    </Table.Header>
  );
};

export default TableHeader;
