import React, { useState } from 'react';
import get from 'lodash/get';
import { Table, Pagination, Icon, Card, Input, Checkbox, Popup } from 'semantic-ui-react';
import SelectItemsCount from './SelectItemsCount';
import ColumnFilterCard from '../../containers/ProductTracker/ProductTrackerTable/ColumnFilter';
import './index.scss';
import { tableKeys } from '../../constants';
import SortIcon from '../../assets/images/sort-solid.svg';
import ProductSearch from '../../containers/Synthesis/Supplier/ProductsTable/productSearch';
import ProfitFinderFilterSection from '../../containers/Synthesis/ProfitFinderFilterSection';
import ProductTrackerFilterSection from '../../containers/ProductTracker/ProductTrackerFilterSection';

export interface Column {
  render?: (row: any) => string | JSX.Element;
  dataKey?: string;
  label?: string;
  sortable?: boolean;
  show?: boolean;
  check?: any;
  icon?: any;
  type?: 'number' | 'string' | 'date';
  click?: (e: any) => void;
  popUp?: boolean;
}

export interface PaginatedTableProps {
  tableKey?: string;
  searchFilterValue?: string;
  data: Array<{ [key: string]: any }>;
  columns: Column[];
  singlePageItemsCount?: number;
  setSinglePageItemsCount?: (itemsCount: number) => void;
  setPageNumber?: any;
  extendedInfo?: (data: any) => void;
  expandedRows?: any;
  name?: any;
  columnFilterData?: any;
  handleColumnChange?: any;
  count?: any;
  productTrackerPageNo?: any;
  showFilterSearch?: boolean;
  searchFilteredProduct?: (searchValue: string) => void;
  showFilter?: boolean;
  showProductFilter?: boolean;
  productRanges?: any;
}

export interface GenericTableProps {
  tableKey?: string;
  currentPage: number;
  totalPages: number;
  searchFilterValue?: string;
  showFilterSearch?: boolean;
  searchFilteredProduct?: (searchValue: string) => void;
  setCurrentPage: (page: number) => void;
  totalItemsCount: number;
  showSelectItemsCount: boolean;
  singlePageItemsCount?: number;
  setPageNumber: (pageNo: any) => void;
  setSinglePageItemsCount?: (itemsCount: number) => void;
  showSearchFilter: boolean;
  onSetShowSearchFilter: (e: any, key: any) => void;
  filterName: string;
  searchValue: string;
  onSearchChange: (e: any) => void;
  onClearSearch: (e: any) => void;
  columns: Column[];
  sortedColumnKey: string;
  sortDirection: 'ascending' | 'descending';
  setSort: (e: any, clickedColumn: string) => void;
  rows: Array<{ [key: string]: any }>;
  extendedInfo?: (data: any) => void;
  expandedRows?: any;
  name?: any;
  columnFilterData?: any;
  handleColumnChange?: any;
  count?: number;
  productTrackerPageNo?: any;
  showFilter?: boolean;
  showProductFilter?: boolean;
  productRanges?: any;
}

const getColumnLabel = (dataKey: any, columnFilterData: any) => {
  let flag = true;
  const foundElement = columnFilterData.find((element: any) => element.dataKey === dataKey);
  if (foundElement) {
    flag = foundElement.value;
  }
  return flag;
};

export const GenericTable = (props: GenericTableProps) => {
  const {
    showFilterSearch,
    searchFilteredProduct,
    currentPage,
    totalPages,
    setCurrentPage,
    totalItemsCount,
    showSelectItemsCount,
    singlePageItemsCount = 10,
    setSinglePageItemsCount,
    showSearchFilter,
    onSetShowSearchFilter,
    filterName,
    searchValue,
    onSearchChange,
    onClearSearch,
    columns,
    sortedColumnKey,
    sortDirection,
    setSort,
    rows,
    extendedInfo,
    expandedRows,
    name,
    columnFilterData,
    handleColumnChange,
    searchFilterValue,
    showFilter,
    productRanges,
    showProductFilter,
  } = props;

  return (
    <div className="generic-table scrollable">
      {setSinglePageItemsCount && showSelectItemsCount ? (
        <div className="table-menu-header">
          {showFilterSearch ? (
            <ProductSearch
              searchFilteredProduct={searchFilteredProduct}
              searchFilterValue={searchFilterValue}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            <div />
          )}
          <SelectItemsCount
            totalCount={totalItemsCount && totalItemsCount}
            singlePageItemsCount={singlePageItemsCount}
            currentPage={currentPage}
            setSinglePageItemsCount={setSinglePageItemsCount}
          />
        </div>
      ) : (
        ''
      )}
      {showFilter && <ProfitFinderFilterSection productRanges={productRanges} />}
      {showProductFilter && <ProductTrackerFilterSection />}
      {showSearchFilter && (
        <Card className="filter-card">
          <Card.Header>
            <span className="card-header">{filterName}</span>
            <span className="card-header" />
            <Icon
              className="close icon close-icon"
              onClick={onClearSearch}
              style={{ float: 'right' }}
            />
          </Card.Header>
          <Card.Content>
            <Input
              icon="search"
              value={searchValue}
              placeholder="Search..."
              onChange={onSearchChange}
            />
          </Card.Content>
        </Card>
      )}
      <Table sortable={true} basic="very" textAlign="left" unstackable={true}>
        <Table.Header>
          <Table.Row>
            {columns.map((column, index) => {
              return name === 'trackerTable' ? (
                getColumnLabel(column.dataKey, columnFilterData) && (
                  <Table.HeaderCell
                    key={column.dataKey || index}
                    sorted={sortedColumnKey === column.dataKey ? sortDirection : undefined}
                    onClick={
                      column.sortable
                        ? (e: any) => setSort(e, column.dataKey || '')
                        : column.click
                        ? column.click
                        : undefined
                    }
                    style={
                      column.label === 'Supplier'
                        ? {
                            minWidth: '120px',
                          }
                        : {}
                    }
                    className="table-header"
                  >
                    {' '}
                    {column.label}
                    {column.label === 'Supplier' && (
                      <span>
                        <Icon
                          className="filter search-filter"
                          onClick={(e: any) => onSetShowSearchFilter(e, column.label)}
                        />
                      </span>
                    )}
                    {column.sortable && (!sortedColumnKey || sortedColumnKey !== column.dataKey) ? (
                      <img src={SortIcon} className="sort-arrow" alt="sort arrow" />
                    ) : null}
                    {column.check && <Checkbox value={column.check} />}
                    {column.icon && column.popUp ? (
                      <Popup
                        on="click"
                        trigger={<Icon className={`${column.icon}`} />}
                        position="bottom right"
                        basic={true}
                        hideOnScroll={true}
                        content={
                          <ColumnFilterCard
                            columnFilterData={columnFilterData}
                            handleColumnChange={handleColumnChange}
                          />
                        }
                      />
                    ) : (
                      <Icon className={column.icon} />
                    )}
                  </Table.HeaderCell>
                )
              ) : (
                <Table.HeaderCell
                  key={column.dataKey || index}
                  sorted={sortedColumnKey === column.dataKey ? sortDirection : undefined}
                  onClick={
                    column.sortable
                      ? (e: any) => setSort(e, column.dataKey || '')
                      : column.click
                      ? column.click
                      : undefined
                  }
                  style={
                    column.label === 'Supplier'
                      ? {
                          minWidth: '120px',
                        }
                      : {}
                  }
                  className={`table-header ${column.dataKey}`}
                >
                  {' '}
                  {column.label}
                  {column.label === 'Supplier' && (
                    <span>
                      <Icon
                        className="filter search-filter"
                        onClick={(e: any) => onSetShowSearchFilter(e, column.label)}
                      />
                    </span>
                  )}
                  {column.sortable && (!sortedColumnKey || sortedColumnKey !== column.dataKey) ? (
                    <img src={SortIcon} className="sort-arrow" alt="sort arrow" />
                  ) : null}
                  {column.check && <Checkbox value={column.check} />}
                  {column.icon && column.popUp ? (
                    <Popup
                      on="click"
                      trigger={<Icon className={`${column.icon}`} />}
                      position="bottom right"
                      basic={true}
                      hideOnScroll={true}
                      content={
                        <ColumnFilterCard
                          columnFilterData={columnFilterData}
                          handleColumnChange={handleColumnChange}
                        />
                      }
                    />
                  ) : (
                    <Icon className={column.icon} />
                  )}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.length ? (
            rows.map((row, index) => {
              return (
                <React.Fragment key={index}>
                  <Table.Row key={index}>
                    {columns.map((column, index) => {
                      return name === 'trackerTable' ? (
                        getColumnLabel(column.dataKey, columnFilterData) && (
                          <Table.Cell key={column.dataKey || index} style={{ maxWidth: 400 }}>
                            {renderCell(row, column)}
                          </Table.Cell>
                        )
                      ) : (
                        <Table.Cell
                          key={column.dataKey || index}
                          style={{ maxWidth: 400 }}
                          className={`table-cell ${column.dataKey}`}
                        >
                          {renderCell(row, column)}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                  {expandedRows && expandedRows === row.product_id && extendedInfo && (
                    <Table.Row key={index + '-extended'}>
                      <Table.Cell colSpan={columns.length}>
                        {''}
                        {expandedRows === row.product_id && extendedInfo(row)}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <tr />
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={columns.length}>
              <Pagination
                totalPages={rows.length ? totalPages : ''}
                activePage={currentPage}
                onPageChange={(event, data) => {
                  setCurrentPage(Number(data.activePage));
                }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

// Handles pagination, filtering, and sorting client-side
export const PaginatedTable = (props: PaginatedTableProps) => {
  const {
    tableKey,
    data,
    singlePageItemsCount = 10,
    setSinglePageItemsCount,
    columns,
    extendedInfo,
    expandedRows,
    setPageNumber,
    name,
    columnFilterData,
    handleColumnChange,
    productTrackerPageNo,
    count,
    showFilterSearch,
    searchFilteredProduct,
    searchFilterValue,
    showFilter,
    productRanges,
    showProductFilter,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const showSelectItemsCount = tableKey === tableKeys.PRODUCTS ? true : false;
  // TODO: Move singlePageItemsCount and setSinglePageItemsCount
  // to local state if it doesn't need to be global (in redux).
  // const [itemsCount, setItemsCount] = useState(10);

  const showColumns = columns.filter(e => e.show);
  const { sortedColumnKey, sortDirection, setSort } = useSort('');
  const checkSortedColumnExist = showColumns.filter(column => column.dataKey === sortedColumnKey);

  let rows = checkSortedColumnExist.length
    ? [...data].sort((a, b) => {
        const sortedColumn = checkSortedColumnExist[0];
        let aColumn;
        let bColumn;
        if (sortedColumn.type === 'number') {
          aColumn = Number(a[sortedColumn.dataKey || '']);
          bColumn = Number(b[sortedColumn.dataKey || '']);
        } else if (sortedColumn.type === 'date') {
          aColumn = new Date(a[sortedColumn.dataKey || ''] || null);
          bColumn = new Date(b[sortedColumn.dataKey || ''] || null);
        } else {
          aColumn = a[sortedColumn.dataKey || ''] || '';
          bColumn = b[sortedColumn.dataKey || ''] || '';
        }
        if (
          sortedColumn.dataKey === 'name' ||
          (sortedColumn.dataKey && sortedColumn.dataKey === 'file_name') ||
          (sortedColumn.dataKey && sortedColumn.dataKey === 'active_status')
        ) {
          if (aColumn.toLowerCase() < bColumn.toLowerCase()) {
            return -1;
          }
          if (aColumn.toLowerCase() > bColumn.toLowerCase()) {
            return 1;
          }
        } else {
          if (aColumn < bColumn) {
            return -1;
          }
          if (aColumn > bColumn) {
            return 1;
          }
        }
        return 0;
      })
    : data;

  const [filterName, setFilterName] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [showSearchFilter, setShowSearchFilter] = useState(false);

  rows = searchValue
    ? rows.filter(row => {
        if (row.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
          return row.name.toLowerCase().startsWith(searchValue.toLowerCase());
        } else {
          return row.name.toLowerCase().includes(searchValue.toLowerCase());
        }
      })
    : rows;

  const totalPages = Math.ceil(rows.length / singlePageItemsCount);
  if (checkSortedColumnExist[0]) {
    const key: any = checkSortedColumnExist[0].dataKey;
    rows = rows.sort((a, b) => {
      return a[key] - b[key];
    });
  }

  rows = sortDirection === 'ascending' ? rows.slice().reverse() : rows;
  rows = rows.slice((currentPage - 1) * singlePageItemsCount, currentPage * singlePageItemsCount);

  const handleShowSearchFilter = (e: any, key: any) => {
    e.stopPropagation();
    setShowSearchFilter(true);
    setFilterName(key);
  };

  const handleClearSearch = (e: any) => {
    e.stopPropagation();
    setShowSearchFilter(false);
    setSearchValue('');
  };

  const handleSearchChange = (e: any) => {
    setCurrentPage(1);
    setSearchValue(e.target.value);
  };

  return (
    <GenericTable
      productRanges={productRanges}
      showFilterSearch={showFilterSearch}
      searchFilteredProduct={searchFilteredProduct}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      totalItemsCount={data.length}
      showSelectItemsCount={showSelectItemsCount}
      singlePageItemsCount={singlePageItemsCount}
      searchValue={searchValue}
      setSinglePageItemsCount={setSinglePageItemsCount}
      showSearchFilter={showSearchFilter}
      onSetShowSearchFilter={handleShowSearchFilter}
      filterName={filterName}
      searchFilterValue={searchFilterValue}
      onSearchChange={handleSearchChange}
      onClearSearch={handleClearSearch}
      columns={showColumns}
      sortedColumnKey={sortedColumnKey}
      sortDirection={sortDirection}
      setSort={setSort}
      rows={rows}
      extendedInfo={extendedInfo}
      expandedRows={expandedRows}
      setPageNumber={setPageNumber}
      name={name}
      columnFilterData={columnFilterData}
      handleColumnChange={handleColumnChange}
      count={count && count.count}
      productTrackerPageNo={productTrackerPageNo}
      showFilter={showFilter}
      showProductFilter={showProductFilter}
    />
  );
};

const renderCell = (row: { [key: string]: any }, column: Column) => {
  if (column.render) {
    return column.render(row);
  }

  if (column.dataKey) {
    return get(row, column.dataKey);
  }
};

const useSort = (initialValue: string) => {
  const [sortedColumnKey, setSortedColumnKey] = useState(initialValue);
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

  const handleSort = (e: any, clickedColumn: string) => {
    e.preventDefault();
    if (sortedColumnKey !== clickedColumn) {
      setSortedColumnKey(clickedColumn);
      setSortDirection('ascending');
    } else {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    }
  };

  return {
    sortedColumnKey,
    sortDirection,
    setSort: handleSort,
  };
};
