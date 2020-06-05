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
}

export interface TableHeaderProps extends Shared {
  columns: Column[];
  middleScroll?: boolean;
  headerRef?: any;
}

export interface TableHeaderCellProps extends Shared {
  column: Column;
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
  } = props;
  const { dataKey, sortable, label, click, check, popUp, icon } = column;
  const style = label === 'Supplier' ? { minWidth: '120px' } : {};
  let otherProps: any;
  otherProps = {
    onClick: sortable ? (e: any) => setSort(e, dataKey || '') : click ? click : undefined,
    style: { style },
    className: type === 'trackerTable' ? 'table-header' : `${dataKey} ${getColumnClass(column)}`,
  };

  if (sortedColumnKey === dataKey) {
    otherProps = { ...otherProps, sorted: sortDirection };
  }

  if (type === 'trackerTable') {
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
            hideOnScroll={true}
            trigger={<Icon className={`${icon}`} />}
            content={
              <ColumnFilterCard
                columnFilterData={columnFilterData}
                handleColumnChange={handleColumnChange}
              />
            }
          />
        ) : (
          <Icon className={icon} />
        )}
      </Table.HeaderCell>
    );
  }
  return (
    <Table.HeaderCell key={dataKey || Date.now()} {...otherProps}>
      {' '}
      <div
        className="table-cell-container"
        style={(icon && popUp) || check ? { justifyContent: 'center' } : {}}
      >
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
            hideOnScroll={true}
            trigger={<Icon className={`${icon}`} />}
            content={
              <ColumnFilterCard
                columnFilterData={columnFilterData}
                handleColumnChange={handleColumnChange}
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
  const { columns, middleScroll, headerRef, ...rest } = props;
  const filteredColumns = columns.filter(c => getColumnLabel(c.dataKey, rest.columnFilterData));
  if (middleScroll) {
    const lowerBound = filteredColumns.slice(0, 2);
    const middleBound = filteredColumns.slice(2, filteredColumns.length - 2);
    const upperBound = filteredColumns.slice(filteredColumns.length - 2, filteredColumns.length);
    const middleHeader = document.querySelector('.middle-header');
    const middleBody = document.querySelector('.middle-body');

    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell className={`middle-scroll-cell`}>
            <Table.Row>
              {lowerBound.map((column, index) => {
                const className = `middle-scroll-cell ${getColumnClass(column)}`;
                return <div key={column.dataKey || index} className={className} />;
              })}
            </Table.Row>
          </Table.HeaderCell>
          <Table.HeaderCell
            style={{ maxWidth: '670px', overflow: 'auto' }}
            className={' middle-scroll-cell'}
            ref={headerRef}
            onScroll={(evt: any) => {
              if (!!middleBody && middleHeader) {
                middleBody.scrollLeft = evt.target.scrollLeft;
                middleHeader.scrollLeft = evt.target.scrollLeft;
              }
            }}
          >
            <Table.Row>
              {middleBound.map((column, index) => {
                return (
                  <Table.HeaderCell
                    key={column.dataKey || index}
                    className={`middle-scroll-cell ${getColumnClass(column)}`}
                  />
                );
              })}
            </Table.Row>
          </Table.HeaderCell>
          <Table.HeaderCell className={`middle-scroll-cell`}>
            <Table.Row>
              {upperBound.map((column, index) => {
                return (
                  <div
                    key={column.dataKey || index}
                    className={`middle-scroll-cell ${getColumnClass(column)}`}
                  />
                );
              })}
            </Table.Row>
          </Table.HeaderCell>
        </Table.Row>
        <div style={{ height: 15 }} />
        <Table.Row>
          <Table.HeaderCell>
            <Table.Row>
              {lowerBound.map((column, index) => {
                return <TableHeaderCell column={column} key={column.dataKey || index} {...rest} />;
              })}
            </Table.Row>
          </Table.HeaderCell>
          <Table.HeaderCell
            style={{ maxWidth: '670px', overflow: 'hidden' }}
            className={'middle-header'}
            ref={headerRef}
            onScroll={(evt: any) => {
              if (middleBody) {
                middleBody.scrollLeft = evt.target.scrollLeft;
              }
            }}
          >
            <Table.Row>
              {middleBound.map((column, index) => {
                return <TableHeaderCell column={column} key={column.dataKey || index} {...rest} />;
              })}
            </Table.Row>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Table.Row>
              {upperBound.map((column, index) => {
                return <TableHeaderCell column={column} key={column.dataKey || index} {...rest} />;
              })}
            </Table.Row>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
  return (
    <Table.Header>
      <Table.Row>
        {filteredColumns.map((column, index) => {
          return <TableHeaderCell column={column} key={column.dataKey || index} {...rest} />;
        })}
      </Table.Row>
    </Table.Header>
  );
};

export default TableHeader;
