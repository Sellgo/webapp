import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { Table, Pagination, Icon, Card, Input } from 'semantic-ui-react';
import SelectItemsCount from './SelectItemsCount';
import './index.scss';
import { tableKeys } from '../../constants';
import SortIcon from '../../assets/images/sort-solid.svg';

export interface Column {
  render?: (row: any) => string | JSX.Element;
  dataKey?: string;
  label?: string;
  sortable?: boolean;
  show?: boolean;
  type?: 'number' | 'string' | 'date';
}

export interface TableProps {
  singlePageItemsCount?: number;
  data: Array<{ [key: string]: any }>;
  columns: Column[];
  setSinglePageItemsCount?: (itemsCount: number) => void;
  tableKey?: string;
}

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

const GenericTable = (props: TableProps) => {
  const { tableKey, data, columns, singlePageItemsCount = 10, setSinglePageItemsCount } = props;

  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 if data or numbers of items to show per page changes
  // otherwise user can end up on a page that doesn't exist.
  useEffect(() => {
    if (tableKey === tableKeys.PRODUCTS) setCurrentPage(1);
  }, [tableKey, data, singlePageItemsCount]);

  const showSelectItemsCounts = tableKey === tableKeys.PRODUCTS ? true : false;
  const totalPages = Math.ceil(data.length / singlePageItemsCount);
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

        if (aColumn < bColumn) {
          return -1;
        }
        if (aColumn > bColumn) {
          return 1;
        }
        return 0;
      })
    : data;
  const [isSearching, setSearch] = useState('');
  rows = rows.filter(row => {
    const ROWS = isSearching ? row.name.toLowerCase().startsWith(isSearching.toLowerCase()) : rows;
    return ROWS;
  });

  rows = sortDirection === 'ascending' ? rows.slice().reverse() : rows;
  rows = rows.slice((currentPage - 1) * singlePageItemsCount, currentPage * singlePageItemsCount);
  const [isShowing, setShowing] = useState(false);
  const handleSearchFilter = (e: any) => {
    e.stopPropagation();
    setShowing(true);
  };
  const clearSearch = (e: any) => {
    e.stopPropagation();
    setShowing(false);
  };
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <div className="genericTable scrollable">
      {setSinglePageItemsCount && showSelectItemsCounts ? (
        <div style={{ marginTop: '2rem' }}>
          <SelectItemsCount
            totalCount={data.length}
            singlePageItemsCount={singlePageItemsCount}
            currentPage={currentPage}
            setSinglePageItemsCount={setSinglePageItemsCount}
          />
        </div>
      ) : (
        ''
      )}
      {isShowing && (
        <Card>
          <Card.Content>
            <Icon className="close icon" onClick={clearSearch} style={{ float: 'right' }} />
            <Input
              icon="search"
              value={isSearching}
              placeholder="Search..."
              onChange={handleChange}
            />
          </Card.Content>
        </Card>
      )}
      <Table sortable={true} basic="very" textAlign="left">
        <Table.Header>
          <Table.Row>
            {showColumns.map((column, index) => {
              return (
                <Table.HeaderCell
                  key={column.dataKey || index}
                  sorted={sortedColumnKey === column.dataKey ? sortDirection : undefined}
                  onClick={
                    column.sortable ? (e: any) => setSort(e, column.dataKey || '') : undefined
                  }
                >
                  {' '}
                  {column.label}
                  {column.label === 'Supplier' && (
                    <span>
                      <Icon className="filter search_filter" onClick={handleSearchFilter} />
                    </span>
                  )}
                  {column.sortable && (!sortedColumnKey || sortedColumnKey !== column.dataKey) ? (
                    <img src={SortIcon} className="sort_arrow" />
                  ) : null}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!rows.length ? (
            <Table.Row key={134}>
              <Table.Cell>
                <h1>{'Data not found'}</h1>
              </Table.Cell>
            </Table.Row>
          ) : (
            rows.map((row, index) => {
              return (
                <Table.Row key={index}>
                  {showColumns.map((column, index) => (
                    <Table.Cell key={column.dataKey || index} style={{ maxWidth: 400 }}>
                      {renderCell(row, column)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              );
            })
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={showColumns.length}>
              {/* todo */}
              <Pagination
                totalPages={totalPages}
                activePage={currentPage}
                onPageChange={(event, data) => setCurrentPage(Number(data.activePage))}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default GenericTable;
