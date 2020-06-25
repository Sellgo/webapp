import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { Table, Pagination, Icon, Card, Input, Button } from 'semantic-ui-react';
import SelectItemsCount from './SelectItemsCount';

import './index.scss';
import { tableKeys } from '../../constants';

import ProductSearch from '../ProductSearch/productSearch';
import { CheckedRowDictionary } from '../../containers/Synthesis/Supplier/ProductsTable';
import { Link } from 'react-router-dom';
import { TableBody } from './TableBody';
import TableHeader from './TableHeader';

export interface Column {
  render?: (row: any) => string | JSX.Element;
  dataKey?: string;
  label?: string;
  sortable?: boolean;
  show?: boolean;
  check?: any;
  icon?: any;
  type?: 'number' | 'string' | 'date' | 'boolean';
  click?: (e: any) => void;
  popUp?: boolean;
}

export interface GenericTableProps {
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
  showProductFinderSearch?: boolean;
  searchFilteredProduct?: (searchValue: string) => void;
  updateProfitFinderProducts?: (data: any) => void;
  showFilter?: boolean;
  checkedRows?: CheckedRowDictionary;
  updateCheckedRows?: (checkedRows: CheckedRowDictionary) => void;
  productRanges?: any;
  columnFilterBox?: boolean;
  toggleColumnCheckbox?: () => void;
  setPage?: (pageNumber: number) => void;
  currentPage?: number;
  renderFilterSectionComponent?: () => void;
  showTableLock?: boolean;
  featuresLock?: boolean;
  pagination?: boolean;
  handleColumnDrop?: (e: any, data: any) => void;
  reorderColumns?: any;
  columnDnD?: boolean;
  middleScroll?: boolean;
}

export const getColumnLabel = (dataKey: any, columnFilterData: any) => {
  let flag = true;
  const foundElement = columnFilterData
    ? columnFilterData.find((element: any) => element.dataKey === dataKey)
    : false;
  if (foundElement) {
    flag = foundElement.value;
  }
  return flag;
};

export const getColumnClass = (column: any) => {
  if ((column.icon && column.popUp) || column.check) {
    return 'small-column';
  } else if (['Category', 'Size Tier'].includes(column.label)) {
    return 'large-column';
  } else if (['Search'].includes(column.label)) {
    return 'medium-column';
  } else if (['PRODUCT INFORMATION'].includes(column.label)) {
    return 'primary-column';
  }
  {
    return 'default-column';
  }
};

// Handles pagination, filtering, and sorting client-side
export const GenericTable = (props: GenericTableProps) => {
  const {
    tableKey,
    currentPage,
    data,
    singlePageItemsCount = 10,
    setSinglePageItemsCount,
    columns,
    extendedInfo,
    expandedRows,
    name,
    columnFilterData,
    handleColumnChange,
    showProductFinderSearch,
    searchFilteredProduct: searchProfitFinderProduct,
    updateProfitFinderProducts,
    searchFilterValue,
    showFilter,
    checkedRows,
    updateCheckedRows,
    columnFilterBox,
    toggleColumnCheckbox,
    setPage,
    renderFilterSectionComponent,
    pagination = true,
    showTableLock,
    featuresLock,
    middleScroll = false,
    handleColumnDrop,
    reorderColumns,
    columnDnD = false,
  } = props;
  const initialPage = currentPage ? currentPage : 1;
  const [localCurrentPage, setLocalCurrentPage] = useState(initialPage);

  useEffect(() => {
    setLocalCurrentPage(initialPage);
  }, [currentPage]);

  // reconcile redux page with local page
  useEffect(() => {
    if (setPage) {
      setPage(localCurrentPage);
      return () => setPage(1); // reset on unmount
    }
  }, [localCurrentPage]);

  const showSelectItemsCount = tableKey === tableKeys.PRODUCTS ? true : false;
  // TODO: Move singlePageItemsCount and setSinglePageItemsCount
  // to local state if it doesn't need to be global (in redux).
  // const [itemsCount, setItemsCount] = useState(10);

  const showColumns = columns.filter(e => e.show);
  const { sortedColumnKey, sortDirection, setSort, sortClicked, setSortClicked } = useSort('');
  const checkSortedColumnExist = showColumns.filter(column => column.dataKey === sortedColumnKey);
  const filteredColumns = columnFilterData
    ? columnFilterData.map((cf: any) => ({ ...cf, label: cf.key }))
    : columns.map((c: any) => ({ ...c, value: c.show, key: c.label }));
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
        // make string-based sorting case-insensitive
        if (sortedColumn.dataKey && sortedColumn.type === 'string') {
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
        if ((row.search || '').toLowerCase().startsWith(searchValue.toLowerCase())) {
          return (row.search || '').toLowerCase().startsWith(searchValue.toLowerCase());
        } else {
          return (row.search || '').toLowerCase().includes(searchValue.toLowerCase());
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

  rows = sortDirection === 'descending' ? rows.slice().reverse() : rows;
  const sortedProducts = rows;
  rows = rows.slice(
    (localCurrentPage - 1) * singlePageItemsCount,
    localCurrentPage * singlePageItemsCount
  );
  rows = showTableLock ? rows.slice(0, 3) : rows;

  useEffect(() => {
    if (sortClicked) {
      if (updateProfitFinderProducts) {
        updateProfitFinderProducts(sortedProducts);
      }
      setSortClicked(false);
    }
  });

  const onSetShowSearchFilter = (e: any, key: any) => {
    e.stopPropagation();
    setShowSearchFilter(true);
    setFilterName(key);
  };

  const onClearSearch = (e: any) => {
    e.stopPropagation();
    setShowSearchFilter(false);
    setSearchValue('');
  };

  const onSearchChange = (e: any) => {
    if (setPage) {
      setPage(1);
    } else {
      setLocalCurrentPage(1);
    }
    setSearchValue(e.target.value);
  };
  const totalItemsCount = data.length;
  return (
    <div className="generic-table scrollable">
      {setSinglePageItemsCount && showSelectItemsCount ? (
        <div className={`table-menu-header ${featuresLock && 'disabled'}`}>
          {showProductFinderSearch ? (
            <ProductSearch
              searchFilteredProduct={searchProfitFinderProduct}
              searchFilterValue={searchFilterValue}
              setCurrentPage={setLocalCurrentPage}
            />
          ) : (
            <div />
          )}

          <SelectItemsCount
            setCurrentPage={setLocalCurrentPage}
            totalCount={totalItemsCount && totalItemsCount}
            singlePageItemsCount={singlePageItemsCount}
            currentPage={localCurrentPage}
            setSinglePageItemsCount={setSinglePageItemsCount}
          />
        </div>
      ) : (
        ''
      )}
      {showFilter && renderFilterSectionComponent && renderFilterSectionComponent()}
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
        <TableHeader
          columns={columns}
          sortedColumnKey={sortedColumnKey}
          setSort={setSort}
          onSetShowSearchFilter={onSetShowSearchFilter}
          onSearchChange={onSearchChange}
          onClearSearch={onClearSearch}
          rows={rows}
          currentPage={localCurrentPage}
          sortDirection={sortDirection}
          type={name}
          columnFilterData={filteredColumns}
          toggleColumnCheckbox={toggleColumnCheckbox}
          searchFilteredProduct={searchProfitFinderProduct}
          renderFilterSectionComponent={renderFilterSectionComponent}
          columnFilterBox={columnFilterBox}
          checkedRows={checkedRows}
          updateCheckedRows={updateCheckedRows}
          handleColumnChange={handleColumnChange}
          middleScroll={middleScroll}
          handleColumnDrop={handleColumnDrop}
          reorderColumns={reorderColumns ? reorderColumns : null}
          columnDnD={columnDnD}
        />
        <TableBody
          extendedInfo={extendedInfo}
          columns={columns}
          columnFilterData={filteredColumns}
          type={name}
          rows={rows}
          expandedRows={expandedRows}
          middleScroll={middleScroll}
        />

        {pagination && (
          <Table.Footer className={showTableLock ? 'lock-footer' : ''}>
            <Table.Row>
              {showTableLock ? (
                <div className="table-lock">
                  <div className="table-lock__content">
                    <p>Want to see more?</p>
                    <Icon name="lock" size="big" />
                    <Link to="/settings/pricing">
                      <Button primary={true}>Subscribe to Unlock</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <Table.HeaderCell colSpan={columns.length}>
                  <Pagination
                    totalPages={rows.length ? totalPages : ''}
                    activePage={localCurrentPage}
                    onPageChange={(event, data) => {
                      setLocalCurrentPage(Number(data.activePage));
                    }}
                  />
                </Table.HeaderCell>
              )}
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </div>
  );
};

export const renderCell = (row: { [key: string]: any }, column: Column) => {
  if (column.render) {
    return column.render(row);
  }

  if (column.dataKey) {
    return get(row, column.dataKey);
  }
};

const useSort = (initialValue: string) => {
  const [sortedColumnKey, setSortedColumnKey] = useState(initialValue);
  const [sortDirection, setSortDirection] = useState<'descending' | 'ascending'>('ascending');
  const [sortClicked, setSortClicked] = useState<true | false>(false);

  const handleSort = (e: any, clickedColumn: string) => {
    e.preventDefault();
    if (sortedColumnKey !== clickedColumn) {
      setSortedColumnKey(clickedColumn);
      setSortDirection('descending');
    } else {
      setSortDirection(sortDirection === 'descending' ? 'ascending' : 'descending');
    }
    setSortClicked(true);
  };

  return {
    sortedColumnKey,
    sortDirection,
    setSort: handleSort,
    sortClicked,
    setSortClicked,
  };
};
