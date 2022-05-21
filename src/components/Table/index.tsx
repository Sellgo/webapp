import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { Table, Icon, Button } from 'semantic-ui-react';
import './index.scss';
import ProductSearch from '../ProductSearch/productSearch';
import { CheckedRowDictionary } from '../../containers/Synthesis/Supplier/ProductsTable';
import { Link } from 'react-router-dom';
import { TableBody } from './TableBody';
import TableHeader from './TableHeader';
import Pagination from '../Pagination';

import ConstructionImage from '../../components/ConstructionImage/';

import { formatDimensionForSorting } from '../../utils/format';
import BottomScroll from '../BottomScrollbar';
import ActiveFilters from '../ActiveFilters';

export interface Column {
  render?: (row: any) => string | JSX.Element;
  dataKey?: string;
  label?: string;
  sortable?: boolean;
  filter?: boolean;
  filterType?: string;
  filterSign?: string;
  filterDataKey?: string;
  filterLabel?: string;
  searchIconPosition?: string;
  show?: boolean;
  check?: any;
  icon?: any;
  type?: 'number' | 'string' | 'date' | 'boolean';
  click?: (e: any) => void;
  popUp?: boolean;
  className?: string;
  fixed?: string;
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
  toggleColumnFilters?: (data: any, filterType?: any) => void;
  activeColumnFilters?: any;
  applyColumnFilters?: (data: any) => void;
  cancelColumnFilters?: () => void;
  resetColumnFilters?: (dataKey: string, filterType?: any, filterKey?: any) => void;
  loadingFilters?: boolean;
  filterValues?: any;
  loading?: boolean;
  searchValue?: string;
  scrollToView?: boolean;
  leftFixedColumns?: number;
  rightFixedColumns?: number;
  activeFilters?: any[];
  onActiveFilterReset?: (dataKey: string, type?: any) => Promise<any>;
  onCheckedActiveFilters?: () => void;
  onUncheckedActiveFilters?: () => void;
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
    searchFilterValue,
    showFilter,
    checkedRows,
    updateCheckedRows,
    columnFilterBox,
    toggleColumnCheckbox,
    setPage,
    renderFilterSectionComponent,
    pagination = true,
    showTableLock = false,
    featuresLock = false,
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
    searchValue,
    scrollToView,
    leftFixedColumns,
    rightFixedColumns,
    activeFilters,
    onActiveFilterReset,
    onCheckedActiveFilters,
    onUncheckedActiveFilters,
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
      if (!['leads-tracker', 'products', 'seller-finder', 'seller-database'].includes(name)) {
        return () => setPage(1); // reset on unmount
      }
    }
  }, [localCurrentPage]);

  const showColumns = columns.filter(e => e.show);

  const { sortedColumnKey, sortDirection: sortOrder, setSort, sortClicked } = useSort(
    currentActiveColumn
  );

  let sortDirection = sortOrder;

  useEffect(() => {
    if (
      onSort &&
      sortClicked &&
      !['leads-tracker', 'products', 'seller-finder', 'seller-database'].includes(name)
    ) {
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
    checkSortedColumnExist.length &&
    !['leads-tracker', 'products', 'seller-finder', 'seller-database'].includes(name)
      ? [...data].sort((a, b) => {
          const sortedColumn = checkSortedColumnExist[0];
          let aColumn;
          let bColumn;
          if (sortedColumn.type === 'number') {
            aColumn = Number(a[sortedColumn.dataKey || '']);
            bColumn = Number(b[sortedColumn.dataKey || '']);

            if (sortedColumn.dataKey === 'amazon_oos_90') {
              aColumn = a[sortedColumn.dataKey];
              bColumn = b[sortedColumn.dataKey];
              if (aColumn === null || aColumn === undefined) {
                aColumn = -Infinity;
              }
              if (bColumn === null || bColumn === undefined) {
                bColumn = -Infinity;
              }
            }
          } else if (sortedColumn.type === 'date') {
            aColumn = new Date(a[sortedColumn.dataKey || ''] || null);
            bColumn = new Date(b[sortedColumn.dataKey || ''] || null);
          } else {
            aColumn = a[sortedColumn.dataKey || ''] || '';
            bColumn = b[sortedColumn.dataKey || ''] || '';
          }
          // make string-based sorting case-insensitive
          if (sortedColumn.dataKey && sortedColumn.type === 'string') {
            if (sortedColumn.dataKey === 'dimension') {
              const firstDimension = formatDimensionForSorting(aColumn);
              const secondDimension = formatDimensionForSorting(bColumn);
              if (firstDimension < secondDimension) {
                return -1;
              }
              return 1;
            } else {
              if (aColumn.toLowerCase().trim() < bColumn.toLowerCase().trim()) {
                return -1;
              }
              if (aColumn.toLowerCase().trim() > bColumn.toLowerCase().trim()) {
                return 1;
              }
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

  useEffect(() => {
    if (setPage) {
      setPage(1);
    } else {
      setLocalCurrentPage(1);
    }
  }, [searchValue]);
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

  if (!['leads-tracker', 'products', 'seller-finder', 'seller-database'].includes(name)) {
    if (checkSortedColumnExist[0]) {
      const key: any = checkSortedColumnExist[0].dataKey;
      rows = rows.sort((a, b) => {
        return a[key] - b[key];
      });
    }
  }

  if (name === 'trackerTable' && sortClicked) {
    rows = sortDirection === 'ascending' ? rows.slice().reverse() : rows;
  } else if (
    !['trackerTable', 'leads-tracker', 'products', 'seller-finder', 'seller-database'].includes(
      name
    )
  ) {
    rows = sortDirection === 'ascending' ? rows.slice().reverse() : rows;
  }

  if (!['leads-tracker', 'products', 'seller-finder', 'seller-database'].includes(name)) {
    rows = rows.slice(
      (localCurrentPage - 1) * singlePageItemsCount,
      localCurrentPage * singlePageItemsCount
    );
  }

  rows = showTableLock ? rows.slice(0, 5) : rows;

  const onSetShowSearchFilter = (e: any) => {
    e.stopPropagation();
  };

  const onClearSearch = (e: any) => {
    e.stopPropagation();
  };

  const totalItemsCount = [
    'leads-tracker',
    'products',
    'seller-finder',
    'seller-database',
  ].includes(name)
    ? count
    : data.length;
  const isScrollTop = scrollTopSelector ? 'scroll-top' : '';
  const isStickyChartActive = stickyChartSelector ? 'sticky-chart-active' : '';
  let timer: NodeJS.Timeout | undefined = undefined;

  const handleScroll = (evt: any) => {
    const bottomScroll = document.querySelector('.bottom-scrollbar');

    if (bottomScroll) {
      bottomScroll.classList.add('bottom-scrollbar-visible');
      bottomScroll.scrollLeft = evt.target.scrollLeft;
      // @ts-ignore
      clearTimeout(timer);
      timer = setTimeout(() => {
        bottomScroll.classList.remove('bottom-scrollbar-visible');
      }, 500);
    }
  };

  const resetPage = (sortDirection: string, dataKey: string) => {
    if (['trackerTable'].includes(name) && currentPage !== 1) {
      setLocalCurrentPage(1);
    }

    if (
      onSort &&
      ['leads-tracker', 'products', 'seller-finder', 'seller-database'].includes(name)
    ) {
      onSort(sortDirection, dataKey);
    }
  };

  return (
    <div
      className={`generic-table ${name !== 'leads-tracker' ? 'scrollable' : 'lt-table'}  ${
        ['products', 'trackerTable'].includes(name) ? 'pf-table' : ''
      }`}
      onScroll={handleScroll}
      style={{ paddingBottom: rows.length < 8 ? 150 : 70 }}
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
      <Table
        sortable={true}
        basic="very"
        textAlign="left"
        unstackable={true}
        className={`${
          name === 'trackerTable'
            ? 'alter-table pf-table'
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
          leftFixedColumns={leftFixedColumns ? leftFixedColumns : 0}
          rightFixedColumns={rightFixedColumns ? rightFixedColumns : 0}
          sortIconPosition={['seller-finder', 'seller-database'].includes(name) ? 'right' : 'left'}
        />
        {name === 'leads-tracker' && count < 1 && !loading ? (
          <ConstructionImage />
        ) : (
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
            scrollToView={scrollToView}
            leftFixedColumns={leftFixedColumns ? leftFixedColumns : 0}
            rightFixedColumns={rightFixedColumns ? rightFixedColumns : 0}
          />
        )}

        {pagination && (
          <Table.Footer className={showTableLock ? 'lock-footer' : ''}>
            <Table.Row>
              {showTableLock ? (
                <div className="table-lock">
                  <div className="table-lock__content">
                    <p>Want to see more?</p>
                    <Icon name="lock" size="big" />
                    <Link to="/subscription">
                      <Button primary={true}>Subscribe to Unlock</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <Table.HeaderCell colSpan={columns.length} className="pagination-cell">
                  <BottomScroll columns={columns} name={name} />
                  <div className="pagination-container">
                    {name === 'products' ? (
                      <ActiveFilters
                        filers={activeFilters ? activeFilters : []}
                        onChecked={onCheckedActiveFilters}
                        onUnchecked={onUncheckedActiveFilters}
                        resetActiveFilter={onActiveFilterReset}
                      />
                    ) : (
                      <div />
                    )}
                    <Pagination
                      onPageSizeSelect={size => {
                        if (setSinglePageItemsCount) {
                          setSinglePageItemsCount(size);
                        }
                        if (
                          ![
                            'leads-tracker',
                            'products',
                            'seller-finder',
                            'seller-database',
                          ].includes(name) &&
                          setPage
                        ) {
                          setPage(1);
                        }
                        if (
                          [
                            'leads-tracker',
                            'products',
                            'seller-finder',
                            'seller-database',
                          ].includes(name)
                        ) {
                          setLocalCurrentPage(1);
                        }
                      }}
                      onNextPage={setLocalCurrentPage}
                      onPrevPage={setLocalCurrentPage}
                      onPageNumberUpdate={setLocalCurrentPage}
                      currentPage={localCurrentPage || 1}
                      totalPages={
                        ['leads-tracker', 'products', 'seller-finder', 'seller-database'].includes(
                          name
                        )
                          ? pageCount
                          : totalPages
                      }
                      totalRecords={totalItemsCount}
                      pageSize={singlePageItemsCount}
                      showPageSize={name !== 'seller-database'}
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
