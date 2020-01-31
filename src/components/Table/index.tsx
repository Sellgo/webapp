import React, { useState } from 'react';
import get from 'lodash/get';
import { Table, Pagination, Icon, Card, Input, Checkbox, Popup } from 'semantic-ui-react';
import SelectItemsCount from './SelectItemsCount';
import ColumnFilterCard from '../../containers/ProductTracker/ProductTrackerTable/ColumnFilter';
import './index.scss';
import { tableKeys } from '../../constants';
import SortIcon from '../../assets/images/sort-solid.svg';

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
}

export interface GenericTableProps {
  tableKey?: string;
  currentPage: number;
  totalPages: number;
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
}

const getColumnLabel = (dataKey: any, columnFilterData: any) => {
  let flag = true;
  columnFilterData.map((value: any, index: any) => {
    if (value.dataKey === dataKey) {
      flag = value.value;
    }
  });
  return flag;
};

export const GenericTable = (props: GenericTableProps) => {
  const {
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
    setPageNumber,
    name,
    columnFilterData,
    handleColumnChange,
    count,
    productTrackerPageNo,
  } = props;
  return (
    <div className="generic-table scrollable">
      {setSinglePageItemsCount && showSelectItemsCount ? (
        <div style={{ margin: '2rem 0 4rem 0' }}>
          <SelectItemsCount
            totalCount={
              count && totalItemsCount && count > totalItemsCount ? count : totalItemsCount
            }
            singlePageItemsCount={singlePageItemsCount}
            currentPage={currentPage}
            setSinglePageItemsCount={setSinglePageItemsCount}
          />
        </div>
      ) : (
        ''
      )}
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
                      ></Popup>
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
                    ></Popup>
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
                        <Table.Cell key={column.dataKey || index} style={{ maxWidth: 400 }}>
                          {renderCell(row, column)}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                  {expandedRows && expandedRows === row.product_id && extendedInfo && (
                    <Table.Row key={index + '-extended'}>
                      <Table.Cell colSpan={columns.length}>
                        {/* <a className="row-expand-btn" onClick={() => toggleExpandRow(row.id)}>
                            <span className="caret-icon">
                              <Icon className="caret down" />
                            </span>
                          </a> */}
                        {expandedRows === row.product_id && extendedInfo(row)}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <tr></tr>
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={columns.length}>
              <Pagination
                totalPages={rows.length ? totalPages : ''}
                activePage={name === 'trackerTable' ? productTrackerPageNo : currentPage}
                onPageChange={(event, data) => {
                  name === 'trackerTable'
                    ? setPageNumber(Number(data.activePage))
                    : setCurrentPage(Number(data.activePage));
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
    singlePageItemsCount = 5,
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
  } = props;
  const [currentPage, setCurrentPage] = useState(1);

  const showSelectItemsCount = tableKey === tableKeys.PRODUCTS ? true : false;
  // TODO: Move singlePageItemsCount and setSinglePageItemsCount
  // to local state if it doesn't need to be global (in redux).
  //const [itemsCount, setItemsCount] = useState(10);

  const showColumns = columns.filter(e => e.show);
  const { sortedColumnKey, sortDirection, setSort } = useSort('');
  const checkSortedColumnExist = showColumns.filter(column => column.dataKey === sortedColumnKey);

  let rows = checkSortedColumnExist.length
    ? [...data].sort((a, b) => {
        const sortedColumn = checkSortedColumnExist[0];
        let aColumn, bColumn;
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

  // const totalPages = Math.ceil(rows.length / singlePageItemsCount);
  const totalPages =
    name === 'trackerTable'
      ? Math.ceil(count.count / singlePageItemsCount)
      : Math.ceil(rows.length / singlePageItemsCount);
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
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      totalItemsCount={data.length}
      showSelectItemsCount={showSelectItemsCount}
      singlePageItemsCount={singlePageItemsCount}
      setSinglePageItemsCount={setSinglePageItemsCount}
      showSearchFilter={showSearchFilter}
      onSetShowSearchFilter={handleShowSearchFilter}
      filterName={filterName}
      searchValue={searchValue}
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
