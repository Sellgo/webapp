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
  const { columns, ...rest } = props;
  const filteredColumns = columns.filter(c => getColumnLabel(c.dataKey, rest.columnFilterData));
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
