import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { Checkbox, Icon, Popup, Table } from 'semantic-ui-react';
import SortIcon from '../../assets/images/sort-solid.svg';
import ColumnFilterCard from '../../containers/ProductTracker/ProductTrackerTable/ColumnFilter';
import ProductCheckBoxHeader from '../../containers/Synthesis/Supplier/ProductsTable/productCheckBoxHeader';
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
  setActiveColumn: (value?: string) => void;
  setSortColumn: (value?: string) => void;
  toggleColumnFilters?: (data: any) => void;
  activeColumnFilters?: any;
  applyColumnFilters?: (data: any) => void;
  cancelColumnFilters?: () => void;
  resetColumnFilters?: () => void;
}

export interface TableHeaderProps extends Shared {
  columns: Column[];
  middleScroll?: boolean;
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
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
    setSortColumn,
    setActiveColumn,
    columnDnD = false,
    activeColumnFilters,
    toggleColumnFilters,
    applyColumnFilters,
    cancelColumnFilters,
    resetColumnFilters,
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
  } = column;
  const style = label === 'Supplier' ? { minWidth: '120px' } : { padding: 0, height: 46 };
  let otherProps: any;
  const columnClass = type !== 'leads-tracker' ? getColumnClass(column) : '';

  otherProps = {
    onClick:
      sortable && type !== 'leads-tracker'
        ? (e: any) => {
            setSort(e, dataKey || '');
            setSortColumn(sortDirection);
            setActiveColumn(dataKey);
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
      type === 'leads-tracker'
        ? (e: any) => {
            setSort(e, dataKey || '');
            setSortColumn(sortDirection);
            setActiveColumn(dataKey);
          }
        : undefined,
  };
  if (dataKey === 'sellgo_score') {
    otherProps = { ...otherProps, className: `${otherProps.className} remove-left-border` };
  }
  if (sortedColumnKey === dataKey) {
    otherProps = { ...otherProps, sorted: sortDirection };
  }

  const ColumnFilter = (
    <Popup
      on="click"
      open={columnFilterBox && activeColumnFilters === dataKey}
      key={dataKey}
      onClose={toggleColumnCheckbox}
      onOpen={toggleColumnCheckbox}
      position="bottom right"
      className="range-filters"
      basic={true}
      trigger={
        <Icon
          className="filter column-filter-ic"
          onClick={() => (toggleColumnFilters ? toggleColumnFilters(dataKey) : undefined)}
        />
      }
      content={
        <RangeFilterBox
          label={label}
          dataKey={dataKey}
          range={{ min: 0, max: 100 }}
          filterRange={{ min: 1, max: 10 }}
          labelSign={'$'}
          filterType={filterType}
          resetFilters={resetColumnFilters}
          cancelFilters={cancelColumnFilters}
          applyFilters={applyColumnFilters}
          l
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
          <span className="th-label">{label}</span>
          {label === 'Supplier' && (
            <span>
              <Icon
                className="filter search-filter"
                onClick={(e: any) => onSetShowSearchFilter(e, label)}
              />
            </span>
          )}
          {sortable && (!sortedColumnKey || sortedColumnKey !== dataKey) ? (
            <img src={SortIcon} className="sort-arrow" alt="sort arrow" {...sorting} />
          ) : sortable && sortedColumnKey === dataKey ? (
            sortDirection === 'ascending' ? (
              <span>
                <Icon name="caret down" className="sort-icon" {...sorting} />
              </span>
            ) : (
              <span>
                {' '}
                <Icon name="caret up" className="sort-icon" {...sorting} />
              </span>
            )
          ) : null}
          {check && <Checkbox value={check} />}
          {icon && popUp ? (
            <Popup
              on="click"
              open={columnFilterBox}
              onClose={toggleColumnCheckbox}
              onOpen={toggleColumnCheckbox}
              position="bottom right"
              className="column-swap-popup"
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
        </div>
      </Table.HeaderCell>
    );
  }
  return (
    <Table.HeaderCell key={dataKey || Date.now()} {...otherProps}>
      {' '}
      <div className={`table-cell-container ${(icon && popUp) || check ? 'popup-cell' : ''}`}>
        {label === 'Search Name' && (
          <span className="search-ic">
            <Icon
              className="filter search-filter"
              onClick={(e: any) => onSetShowSearchFilter(e, label || '')}
            />
          </span>
        )}

        {filter && searchIconPosition === 'left' && ColumnFilter}

        <span className="th-label">{label}</span>
        {sortable && (!sortedColumnKey || sortedColumnKey !== dataKey) ? (
          <img src={SortIcon} className="sort-arrow" alt="sort arrow" {...sorting} />
        ) : sortable && sortedColumnKey === dataKey ? (
          sortDirection === 'ascending' ? (
            <span>
              <Icon name="caret down" className="sort-icon" {...sorting} />
            </span>
          ) : (
            <span>
              {' '}
              <Icon name="caret up" className="sort-icon" {...sorting} />
            </span>
          )
        ) : null}
        {label === 'Search Name' && (
          <span className="search-ic">
            <Icon
              className="filter search-filter"
              onClick={(e: any) => onSetShowSearchFilter(e, label || '')}
            />
          </span>
        )}

        {filter && searchIconPosition === 'right' && ColumnFilter}

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
            className="column-swap-popup"
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
  const { columns, stickyChartSelector, scrollTopSelector, middleScroll, ...rest } = props;
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
    const products = rest.type === 'products';
    const lowerBound = filteredColumns.slice(0, products ? 2 : 5);
    const middleBound = filteredColumns.slice(
      products ? 2 : 5,
      products ? filteredColumns.length - 2 : filteredColumns.length - 6
    );
    // eslint-disable-next-line max-len
    const upperBound = filteredColumns.slice(
      products ? filteredColumns.length - 2 : filteredColumns.length - 6,
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
    const isProfitFinder = rest.type !== 'trackerTable' ? 'pf-header' : '';

    // @ts-ignore
    return (
      <Table.Header
        className={`${isProfitFinder} ${isScrollTop} ${
          stickyChartSelector ? 'sticky-chart-active' : ''
        }`}
      >
        {rest.type === 'trackerTable' && (
          <React.Fragment>
            <Table.Row className="ptr-header-row">
              {filteredColumns.length === 2 && (
                <th
                  key={`header-blank-row`}
                  colSpan={columns.length - 2}
                  style={{ height: '56px' }}
                />
              )}
              {filteredColumns.map((column, index) => {
                let className =
                  index === 1 && filteredColumns.length > 2 ? 'ptr' : column.className;
                className =
                  index === filteredColumns.length - 2 && index >= 2
                    ? `${className} ptr-last-cell`
                    : className;
                return (
                  <TableHeaderCell
                    columns={columns}
                    column={{ ...column, className }}
                    key={column.dataKey || index}
                    {...rest}
                  />
                );
              })}
            </Table.Row>
            <Table.Row className="pt-header">
              <td colSpan={filteredColumns.length - 2} className="pt-header-cell">
                <div className="pt-scroll-container" onScroll={onScrollTable}>
                  {filteredColumns.map(c => (
                    <div
                      className={`${getColumnClass(c)} pt-scroll`}
                      key={`${c.dataKey}--scroll-col`}
                    >
                      <p> &nbsp;</p>
                    </div>
                  ))}
                </div>
              </td>
            </Table.Row>
            <tr className="ptr-scroll-container" />
          </React.Fragment>
        )}

        {rest.type !== 'trackerTable' && (
          <tr className="parent-header-column lead-tracker-header">
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
                headerCellProps.className = 'left-fixed-header-column lt-border-right';
                if (filteredColumns.length === 4) {
                  headerCellProps = { ...headerCellProps, style: { width: '1em' } };
                }
              }
              if (cell.side === 'center') {
                headerCellProps.className = ' leads-tracker-middle';
                headerCellProps = { ...headerCellProps };
              }
              if (cell.side === 'left') {
                headerCellProps.className = 'left-most lt-border-left';
                headerCellProps = { ...headerCellProps, style: { width: '1em' } };
              }

              return (
                <Table.HeaderCell {...headerCellProps} key={`${cell.side}---cell-${cellIndex}`}>
                  <table className="header-inner-table">
                    <thead className="inner-tbody">
                      <Table.Row style={!cell.rows.length ? { height: '47px' } : {}}>
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
        {!['trackerTable', 'leads-tracker'].includes(rest.type ? rest.type : '') && (
          <React.Fragment>
            <tr className="table-scroll-divider" />

            <Table.Row className={'pf-middle-scroll'}>
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
                      <thead className="center-scrolling">
                        <Table.Row className="pf-middle-scroll">
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
            <tr className="table-scroll-divider" />
          </React.Fragment>
        )}
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

const mapStateToProps = (state: {}) => ({
  stickyChartSelector: get(state, 'supplier.setStickyChart'),
  scrollTopSelector: get(state, 'supplier.setScrollTop'),
});

const mapDispatchToProps = {
  setActiveColumn,
  setSortColumn,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHeader);
