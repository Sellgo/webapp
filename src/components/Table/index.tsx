import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { Table, Icon, Card, Input, Button } from 'semantic-ui-react';
import './index.scss';
import ProductSearch from '../ProductSearch/productSearch';
import { CheckedRowDictionary } from '../../containers/Synthesis/Supplier/ProductsTable';
import { Link } from 'react-router-dom';
import { TableBody } from './TableBody';
import TableHeader from './TableHeader';
import Pagination from '../Pagination';

export interface Column {
  render?: (row: any) => string | JSX.Element;
  dataKey?: string;
  label?: string;
  sortable?: boolean;
  filter?: boolean;
  filterType?: string;
  filterSign?: string;
  searchIconPosition?: string;
  show?: boolean;
  check?: any;
  icon?: any;
  type?: 'number' | 'string' | 'date' | 'boolean';
  click?: (e: any) => void;
  popUp?: boolean;
  className?: string;
}

export interface GenericTableProps {
  currentActiveColumn: string;
  stickyChartSelector: boolean;
  scrollTopSelector: boolean;
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
  onSort?: (sort: any, dataKey?: string) => void;
  defaultSort?: any;
  reorderColumns?: any;
  columnDnD?: boolean;
  middleScroll?: boolean;
  rowExpander?: any;
  pageCount?: any;
  toggleColumnFilters?: (data: any) => void;
  activeColumnFilters?: any;
  applyColumnFilters?: (data: any) => void;
  cancelColumnFilters?: () => void;
  resetColumnFilters?: (dataKey: string) => void;
  loadingFilters?: boolean;
  filterValues?: any;
  loading?: boolean;
  initialSearch?: string;
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
    rowExpander,
    scrollTopSelector,
    stickyChartSelector,
    currentActiveColumn,
    onSort,
    defaultSort,
    pageCount,
    toggleColumnFilters,
    activeColumnFilters,
    applyColumnFilters,
    cancelColumnFilters,
    resetColumnFilters,
    loadingFilters,
    filterValues,
    count,
    loading,
    initialSearch,
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
      return () => setPage(name === 'leads-tracker' ? localCurrentPage : 1); // reset on unmount
    }
  }, [localCurrentPage]);

  const showColumns = columns.filter(e => e.show);

  const {
    sortedColumnKey,
    sortDirection: sortOrder,
    setSort,
    sortClicked,
    setSortClicked,
  } = useSort(currentActiveColumn);

  let sortDirection = sortOrder;

  useEffect(() => {
    if (onSort && sortClicked && name !== 'leads-tracker') {
      onSort(sortDirection);
    }
  }, [sortDirection]);

  if (!!defaultSort && !sortClicked) {
    sortDirection = defaultSort;
  }

  const checkSortedColumnExist = showColumns.filter(column => column.dataKey === sortedColumnKey);
  const filteredColumns = columnFilterData
    ? columnFilterData.map((cf: any) => ({ ...cf, label: cf.key }))
    : columns.map((c: any) => ({ ...c, value: c.show, key: c.label }));
  let rows =
    checkSortedColumnExist.length && name !== 'leads-tracker'
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
            if (aColumn.toLowerCase().trim() < bColumn.toLowerCase().trim()) {
              return -1;
            }
            if (aColumn.toLowerCase().trim() > bColumn.toLowerCase().trim()) {
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
          if (aColumn === bColumn && sortDirection === 'descending') {
            return -1;
          }
          return 0;
        })
      : data;

  const [filterName, setFilterName] = useState('');
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [showSearchFilter, setShowSearchFilter] = useState(false);

  useEffect(() => {
    if (setPage) {
      setPage(1);
    } else {
      setLocalCurrentPage(1);
    }
    setSearchValue(initialSearch);
  }, [initialSearch]);

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

  if (name !== 'leads-tracker') {
    if (checkSortedColumnExist[0]) {
      const key: any = checkSortedColumnExist[0].dataKey;
      rows = rows.sort((a, b) => {
        return a[key] - b[key];
      });
    }
  }

  if (name === 'trackerTable' && sortClicked) {
    rows = sortDirection === 'ascending' ? rows.slice().reverse() : rows;
  } else if (!['trackerTable', 'leads-tracker'].includes(name)) {
    rows = sortDirection === 'ascending' ? rows.slice().reverse() : rows;
  }

  // keep the unbusted data buster columns in PF at end of sort
  if (
    name === 'products' &&
    (sortedColumnKey === 'rating' || sortedColumnKey === 'customer_reviews')
  ) {
    rows = [
      ...rows.filter(r => r.data_buster_status === 'completed'),
      ...rows.filter(r => r.data_buster_status !== 'completed').reverse(),
    ];
  }

  const sortedProducts = rows;
  if (name !== 'leads-tracker') {
    rows = rows.slice(
      (localCurrentPage - 1) * singlePageItemsCount,
      localCurrentPage * singlePageItemsCount
    );
  }

  rows = showTableLock ? rows.slice(0, 5) : rows;

  useEffect(() => {
    if (name === 'products' && sortClicked) {
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

  const onSearchChange = () => {
    if (setPage) {
      setPage(1);
    } else {
      setLocalCurrentPage(1);
    }
    setSearchValue(searchValue);
  };

  const totalItemsCount = name === 'leads-tracker' ? count : data.length;
  const isScrollTop = scrollTopSelector ? 'scroll-top' : '';
  const isStickyChartActive = stickyChartSelector ? 'sticky-chart-active' : '';

  const handleScroll = (evt: any) => {
    const scroll = document.querySelector('.pt-scroll-container');
    if (scroll) {
      scroll.scrollLeft = evt.target.scrollLeft;
    }
  };

  const resetPage = (sortDirection: string, dataKey: string) => {
    if (['products', 'trackerTable'].includes(name) && currentPage !== 1) {
      setLocalCurrentPage(1);
    }

    if (onSort && name === 'leads-tracker') {
      onSort(sortDirection, dataKey);
    }
  };

  return (
    <div
      className={`generic-table ${name !== 'leads-tracker' ? 'scrollable' : 'lt-table'}  ${
        name === 'products' ? 'pf-table' : ''
      }`}
      onScroll={handleScroll}
    >
      {showProductFinderSearch ? (
        <div
          className={`table-menu-header ${isStickyChartActive} ${isScrollTop} ${featuresLock &&
            'disabled'}`}
        >
          {showProductFinderSearch ? (
            <ProductSearch
              searchFilteredProduct={searchProfitFinderProduct}
              searchFilterValue={searchFilterValue}
              setCurrentPage={setLocalCurrentPage}
            />
          ) : (
            <div />
          )}
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
      <Table
        sortable={true}
        basic="very"
        textAlign="left"
        unstackable={true}
        className={`${
          name === 'trackerTable'
            ? 'alter-table'
            : name === 'products' || name === 'leads-tracker'
            ? 'pf-table'
            : ''
        }`}
      >
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
          toggleColumnFilters={toggleColumnFilters}
          activeColumnFilters={activeColumnFilters}
          applyColumnFilters={applyColumnFilters}
          cancelColumnFilters={cancelColumnFilters}
          resetColumnFilters={resetColumnFilters}
          loadingFilters={loadingFilters}
          filterValues={filterValues}
          resetPage={(sortDirection: string, dataKey: string) => resetPage(sortDirection, dataKey)}
        />
        <TableBody
          extendedInfo={extendedInfo}
          columns={columns}
          columnFilterData={filteredColumns}
          type={name}
          rows={rows}
          expandedRows={expandedRows}
          middleScroll={middleScroll}
          rowExpander={rowExpander}
          loading={loading}
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
                <Table.HeaderCell colSpan={columns.length} className="pagination-cell">
                  <div className="pagination-container">
                    <Pagination
                      onPageSizeSelect={size => {
                        if (setSinglePageItemsCount) {
                          setSinglePageItemsCount(size);
                        }
                        if (name !== 'leads-tracker' && setPage) {
                          setPage(1);
                        }
                      }}
                      onNextPage={setLocalCurrentPage}
                      onPrevPage={setLocalCurrentPage}
                      onPageNumberUpdate={setLocalCurrentPage}
                      currentPage={localCurrentPage || 1}
                      totalPages={name === 'leads-tracker' ? pageCount : totalPages}
                      totalRecords={totalItemsCount}
                      pageSize={singlePageItemsCount}
                      showPageSize={name !== 'supplier'}
                      loading={!!loading}
                    />
                  </div>
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
