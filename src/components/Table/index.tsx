import React, { useState } from 'react';
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

  const showSelectItemsCounts = tableKey === tableKeys.PRODUCTS ? true : false;
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
  const [isSearching, setSearch] = useState('');
  const [filterName, setFilterName] = useState('');
  rows = rows.filter(row => {
    if (isSearching) {
      if (row.name.toLowerCase().startsWith(isSearching.toLowerCase())) {
        return row.name.toLowerCase().startsWith(isSearching.toLowerCase());
      } else {
        return row.name.toLowerCase().includes(isSearching.toLowerCase());
      }
    } else {
      return rows;
    }
  });
  const totalPages = Math.ceil(rows.length / singlePageItemsCount);
  rows = sortDirection === 'ascending' ? rows.slice().reverse() : rows;
  rows = rows.slice((currentPage - 1) * singlePageItemsCount, currentPage * singlePageItemsCount);
  const [isShowing, setShowing] = useState(false);
  const handleSearchFilter = (e: any, key: any) => {
    e.stopPropagation();
    setShowing(true);
    setFilterName(key);
  };
  const clearSearch = (e: any) => {
    e.stopPropagation();
    setShowing(false);
    setSearch('');
  };
  const handleChange = (e: any) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };
  return (
    <div className="generic-table scrollable">
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
        <Card className="filter-card">
          <Card.Header>
            <span className="card-header">{filterName}</span>
            <span className="card-header" />
            <Icon
              className="close icon close-icon"
              onClick={clearSearch}
              style={{ float: 'right' }}
            />
          </Card.Header>
          <Card.Content>
            <Input
              icon="search"
              value={isSearching}
              placeholder="Search..."
              onChange={handleChange}
            />
          </Card.Content>
        </Card>
      )}
      <Table sortable={true} basic="very" textAlign="left" unstackable={true}>
        <Table.Header>
          <Table.Row className="table-head">
            {showColumns.map((column, index) => {
              return (
                <Table.HeaderCell
                  key={column.dataKey || index}
                  sorted={sortedColumnKey === column.dataKey ? sortDirection : undefined}
                  onClick={
                    column.sortable ? (e: any) => setSort(e, column.dataKey || '') : undefined
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
                        onClick={(e: any) => handleSearchFilter(e, column.label)}
                      />
                    </span>
                  )}
                  {column.sortable && (!sortedColumnKey || sortedColumnKey !== column.dataKey) ? (
                    <img src={SortIcon} className="sort-arrow" alt="sort arrow" />
                  ) : null}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.length
            ? rows.map((row, index) => {
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
            : ''}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={showColumns.length}>
              {/* todo */}
              <Pagination
                totalPages={rows.length ? totalPages : ''}
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
