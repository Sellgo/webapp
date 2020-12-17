import React, { useState } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Checkbox, Icon, Popup, Table } from 'semantic-ui-react';
import SortIcon from '../../assets/images/sort-solid.svg';
import ColumnFilterCard from '../../containers/ProductTracker/ProductTrackerTable/ColumnFilter';
import ProductCheckBoxHeader from '../../containers/Synthesis/Supplier/ProductsTable/productCheckBoxHeader';
import LeadsCheckBoxHeader from '../../containers/LeadsTracker/LeadsTrackerTable/productCheckBoxHeader';

import { CheckedRowDictionary } from '../../containers/Synthesis/Supplier/ProductsTable';
import './index.scss';
import { Column, getColumnLabel, getColumnClass } from './index';
import { setActiveColumn, setSortColumn } from '../../actions/Suppliers';
import RangeFilterBox from '../RangeFilterBox';
interface Shared {
  setSort: (e: any, clickedColumn: string) => void;
  onClick?: (e: any) => void;
  onSetShowSearchFilter: (e: any, label: string) => void;
  renderFilterSectionComponent?: () => void;
  toggleColumnCheckbox?: () => void;
  searchFilteredProduct?: (searchValue: string) => void;
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
  setActiveColumn: (value?: string) => void;
  setSortColumn: (value?: string) => void;
  toggleColumnFilters?: (data: any, type?: any) => void;
  activeColumnFilters?: any;
  applyColumnFilters?: (data: any) => void;
  cancelColumnFilters?: () => void;
  resetColumnFilters?: (dataKey: string, type?: any) => void;
  loadingFilters?: boolean;
  filterValues?: any;
  resetPage: (sortDirection: string, dataKey: string) => void;
  leftFixedColumns?: number;
  rightFixedColumns?: number;
  totalItemsCount: number;
}

export interface TableHeaderProps extends Shared {
  columns: Column[];
  middleScroll?: boolean;
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
  totalItemsCount: number;
}

export interface TableHeaderCellProps extends Shared {
  column: Column;
  columns: Column[];
  scrollTopSelector: boolean;
  totalItemsCount: number;
  setHeaderHovered: (boo: boolean) => void;
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
    setSortColumn,
    setActiveColumn,
    columnDnD = false,
    activeColumnFilters,
    toggleColumnFilters,
    applyColumnFilters,
    cancelColumnFilters,
    resetColumnFilters,
    loadingFilters,
    filterValues,
    resetPage,
    scrollTopSelector,
    totalItemsCount,
    setHeaderHovered,
  } = props;
  const {
    dataKey,
    sortable,
    label,
    click,
    check,
    popUp,
    icon,
    className = '',
    filterType = 'range',
    filter = false,
    searchIconPosition = 'right',
    filterSign,
    filterLabel,
    filterNegativeCheckbox,
    filterCheckboxWithSelectAll,
    filterBoxSize,
    filterDataKey,
  } = column;
  const style = label === 'Supplier' ? { minWidth: '120px' } : { padding: 0, height: 46 };
  let otherProps: any;
  const columnClass = type !== 'leads-tracker' ? getColumnClass(column) : '';
  otherProps = {
    onClick:
      sortable && !['leads-tracker', 'products', 'trackerTable'].includes(type ? type : '')
        ? (e: any) => {
            setSort(e, dataKey || '');
            setSortColumn(sortDirection);
            setActiveColumn(dataKey);
            resetPage(sortDirection, dataKey ? dataKey : '');
          }
        : click
        ? click
        : undefined,
    style: { style },
    className:
      type === 'trackerTable'
        ? `table-header ${dataKey} ${className}`
        : `pf-header-cell ${dataKey}  ${columnClass} col-size ${className}`,
  };

  const sorting = {
    onClick:
      ['leads-tracker', 'products', 'trackerTable'].includes(type ? type : '') && sortable
        ? (e: any) => {
            setSort(e, dataKey || '');
            setSortColumn(sortDirection);
            setActiveColumn(dataKey);
            resetPage(sortDirection, dataKey ? dataKey : '');
          }
        : undefined,
  };
  if (dataKey === 'sellgo_score') {
    otherProps = { ...otherProps, className: `${otherProps.className} remove-left-border` };
  }
  const columnDataKey = filterDataKey ? filterDataKey : dataKey;
  if (sortedColumnKey === dataKey) {
    otherProps = { ...otherProps, sorted: sortDirection };
  }

  const isFilterActive = () => {
    const localFilterData = localStorage.getItem(`${type}:${columnDataKey}`);
    let parsed: any;
    if (localFilterData) {
      parsed = JSON.parse(localFilterData);
      if (filterType === 'checkbox') {
        parsed = parsed.value.length ? parsed : undefined;
      } else {
        parsed = Object.keys(parsed.value).length ? parsed : undefined;
      }
    }
    return parsed ? parsed : undefined;
  };

  const ColumnFilter = (
    <Popup
      on="click"
      open={columnFilterBox && activeColumnFilters === columnDataKey}
      key={dataKey}
      onClose={toggleColumnCheckbox}
      onOpen={toggleColumnCheckbox}
      position={
        totalItemsCount < 10 && filterBoxSize === 'lg'
          ? 'top left'
          : scrollTopSelector
          ? 'bottom right'
          : 'bottom left'
      }
      className="range-filters"
      basic={true}
      trigger={
        <Icon
          className={`filter ${isFilterActive() ? 'column-filter-ic-active' : 'column-filter-ic'} `}
          onClick={() =>
            toggleColumnFilters ? toggleColumnFilters(columnDataKey, filterType) : undefined
          }
        />
      }
      content={
        <RangeFilterBox
          label={filterLabel ? filterLabel : label}
          dataKey={columnDataKey}
          filterLabel={filterLabel}
          labelSign={filterSign}
          filterType={filterType}
          resetFilters={resetColumnFilters}
          cancelFilters={cancelColumnFilters}
          applyFilters={applyColumnFilters}
          loading={loadingFilters}
          values={filterValues}
          name={type}
          filterNegativeCheckbox={filterNegativeCheckbox}
          filterCheckboxWithSelectAll={filterCheckboxWithSelectAll}
          filterBoxSize={filterBoxSize}
          setHeaderHovered={setHeaderHovered}
        />
      }
    />
  );

  if (type === 'trackerTable') {
    otherProps = { ...otherProps, style: { height: '56px' } };
    return (
      <Table.HeaderCell key={dataKey || Date.now()} {...otherProps}>
        {' '}
        <div className={`table-cell-container ${(icon && popUp) || check ? 'popup-cell' : ''}`}>
          {sortable && (!sortedColumnKey || sortedColumnKey !== dataKey) ? (
            <img src={SortIcon} className="sort-arrow" alt="sort arrow" {...sorting} />
          ) : sortable && sortedColumnKey === dataKey ? (
            sortDirection === 'ascending' ? (
              <span>
                <Icon name="caret down" className="sort-icon" {...sorting} />
              </span>
            ) : (
              <span>
                <Icon name="caret up" className="sort-icon" {...sorting} />
              </span>
            )
          ) : null}
          {filter && searchIconPosition === 'right' && ColumnFilter}

          <span className="th-label">{label}</span>
          {label === 'Supplier' && (
            <span>
              <Icon
                className="filter search-filter"
                onClick={(e: any) => onSetShowSearchFilter(e, label)}
              />
            </span>
          )}

          {check && <Checkbox value={check} />}
          {icon && popUp ? (
            <Popup
              on="click"
              open={columnFilterBox && activeColumnFilters === 'ellipsis horizontal'}
              onClose={toggleColumnCheckbox}
              onOpen={toggleColumnCheckbox}
              position="bottom right"
              className="column-swap-popup"
              basic={true}
              trigger={
                <Icon
                  className={`${icon}`}
                  onClick={() =>
                    toggleColumnFilters ? toggleColumnFilters(dataKey, filterType) : undefined
                  }
                />
              }
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
        </div>
      </Table.HeaderCell>
    );
  }
  return (
    <Table.HeaderCell key={dataKey || Date.now()} {...otherProps}>
      <div className={`table-cell-container ${(icon && popUp) || check ? 'popup-cell' : ''}`}>
        {filter && searchIconPosition === 'left' && ColumnFilter}

        {sortable && (!sortedColumnKey || sortedColumnKey !== dataKey) ? (
          <img
            src={SortIcon}
            className={`sort-arrow ${filter && 'less'}`}
            alt="sort arrow"
            {...sorting}
          />
        ) : sortable && sortedColumnKey === dataKey ? (
          sortDirection === 'ascending' ? (
            <span>
              <Icon name="caret down" className="sort-icon" {...sorting} />
            </span>
          ) : (
            <span>
              <Icon name="caret up" className="sort-icon" {...sorting} />
            </span>
          )
        ) : null}
        <span className={`th-label ${type === 'leads-tracker' ? 'lt-th-label' : ''}`} {...sorting}>
          {label}
        </span>
        {filter && searchIconPosition === 'right' && ColumnFilter}

        {check && checkedRows && updateCheckedRows && type !== 'leads-tracker' && (
          <ProductCheckBoxHeader
            currentPage={currentPage}
            currentPageRows={rows}
            checkedRows={checkedRows}
            updateCheckedRows={updateCheckedRows}
          />
        )}
        {check && checkedRows && updateCheckedRows && type === 'leads-tracker' && (
          <LeadsCheckBoxHeader
            currentPage={currentPage}
            currentPageRows={rows}
            checkedRows={checkedRows}
            updateCheckedRows={updateCheckedRows}
          />
        )}
        {icon && popUp ? (
          <Popup
            on="click"
            open={columnFilterBox && activeColumnFilters === 'ellipsis horizontal'}
            onClose={toggleColumnCheckbox}
            onOpen={toggleColumnCheckbox}
            position="bottom right"
            className="column-swap-popup"
            basic={true}
            trigger={
              <Icon
                className={`${icon} popup-ic`}
                onClick={() => (toggleColumnFilters ? toggleColumnFilters(dataKey) : undefined)}
              />
            }
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
  const {
    columns,
    stickyChartSelector,
    scrollTopSelector,
    middleScroll,
    leftFixedColumns,
    rightFixedColumns,
    totalItemsCount,
    ...rest
  } = props;
  const filteredColumns = columns.filter(c => getColumnLabel(c.dataKey, rest.columnFilterData));
  const [isHeaderHovered, setHeaderHovered] = useState(false);
  const onScroll = (evt: any) => {
    evt.stopPropagation();
    console.log('onScroll1 ', isHeaderHovered);
    const middleHeader = document.querySelector('.middle-header');
    const middleBody = document.querySelector('.middle-body');
    if (!!middleBody && middleHeader && isHeaderHovered) {
      middleBody.scrollLeft = evt.target.scrollLeft;
      middleHeader.scrollLeft = evt.target.scrollLeft;
    }
  };

  if (middleScroll) {
    const leftBound = leftFixedColumns ? leftFixedColumns : 0;
    const rightBound = rightFixedColumns ? rightFixedColumns : 0;
    const lowerBound = filteredColumns.slice(0, leftBound);
    const middleBound = filteredColumns.slice(leftBound, filteredColumns.length - rightBound);
    const upperBound = filteredColumns.slice(
      filteredColumns.length - rightBound,
      filteredColumns.length
    );

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

    const isScrollTop = scrollTopSelector ? 'scroll-top' : '';
    const isProfitFinder = 'pf-header';

    // @ts-ignore
    return (
      <Table.Header
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(true)}
        className={`${isProfitFinder} ${isScrollTop} ${
          stickyChartSelector ? 'sticky-chart-active' : ''
        }`}
      >
        <tr
          className={`parent-header-column ${
            rest.type === 'leads-tracker' ? 'lead-tracker-header' : ''
          } ${rest.type}`}
        >
          {scrollRows.map((cell: any, cellIndex: any) => {
            let headerCellProps: any = {};
            if (cell.side === 'center') {
              headerCellProps.className = 'middle-header table-header-scroll';
              headerCellProps.onScroll = onScroll;
              if (!cell.rows.length) {
                headerCellProps = {
                  ...headerCellProps,
                  colSpan: columns.length - 3,
                  style: { background: '#fff' },
                };
              }
            }
            if (cell.side === 'right') {
              headerCellProps.className = `${
                rest.type === 'trackerTable'
                  ? 'left-fixed-header-column-ptr'
                  : 'left-fixed-header-column'
              } ${rest.type === 'leads-tracker' ? 'lt-border-right' : ''}`;
              if (filteredColumns.length === 4) {
                headerCellProps = { ...headerCellProps, style: { width: '1em' } };
              }
            }
            if (cell.side === 'center' && rest.type === 'leads-tracker') {
              headerCellProps.className = ' leads-tracker-middle';
              headerCellProps = { ...headerCellProps };
            }
            if (cell.side === 'left') {
              headerCellProps.className = `left-most ${
                rest.type === 'leads-tracker' ? 'lt-border-left' : ''
              }`;
              headerCellProps = { ...headerCellProps, style: { width: '1em' } };
            }

            return (
              <Table.HeaderCell
                {...headerCellProps}
                key={`${cell.side}---cell-${cellIndex}`}
                onMouseEnter={() => setHeaderHovered(true)}
                onMouseLeave={() => setHeaderHovered(true)}
              >
                <table className="header-inner-table">
                  <thead className="inner-tbody">
                    <Table.Row
                      style={
                        !cell.rows.length
                          ? { height: rest.type === 'trackerTable' ? '56px' : '47px' }
                          : {}
                      }
                    >
                      {cell.rows.map((column: any, index: any) => {
                        return (
                          <TableHeaderCell
                            column={column}
                            columns={columns}
                            key={column.dataKey || index}
                            scrollTopSelector={scrollTopSelector}
                            totalItemsCount={totalItemsCount}
                            setHeaderHovered={setHeaderHovered}
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
              scrollTopSelector={scrollTopSelector}
              totalItemsCount={totalItemsCount}
              setHeaderHovered={setHeaderHovered}
              {...rest}
            />
          );
        })}
      </Table.Row>
    </Table.Header>
  );
};

const mapStateToProps = (state: {}) => ({
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
});

const mapDispatchToProps = {
  setActiveColumn,
  setSortColumn,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
