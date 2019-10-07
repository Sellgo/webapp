import React, { useState } from 'react';
import get from 'lodash/get';
import { Table, Pagination } from 'semantic-ui-react';
import SelectItemsCount from './SelectItemsCount';

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
  showSelectItemsCounts?: boolean;
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

  const handleSort = (clickedColumn: string) => {
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
  const {
    data,
    columns,
    singlePageItemsCount = 10,
    setSinglePageItemsCount,
    showSelectItemsCounts = true,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
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

  rows = sortDirection === 'ascending' ? rows.reverse() : rows;
  rows = rows.slice((currentPage - 1) * singlePageItemsCount, currentPage * singlePageItemsCount);
  /* return rows.length === 0 ? (
    <Segment>
      <Loader
        hidden={rows.length === 0 ? false : true}
        active={true}
        inline="centered"
        size="massive"
      >
        Loading
      </Loader>
    </Segment>
  ) :  */
  return (
    <div>
      {setSinglePageItemsCount && showSelectItemsCounts ? (
        <SelectItemsCount
          totalCount={data.length}
          singlePageItemsCount={singlePageItemsCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setSinglePageItemsCount={setSinglePageItemsCount}
        />
      ) : (
        ''
      )}
      <Table sortable={true} basic="very" textAlign="left">
        <Table.Header>
          <Table.Row>
            {showColumns.map((column, index) => {
              return (
                <Table.HeaderCell
                  key={column.dataKey || index}
                  sorted={sortedColumnKey === column.dataKey ? sortDirection : undefined}
                  onClick={column.sortable ? () => setSort(column.dataKey || '') : undefined}
                >
                  {column.label}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!rows.length ? (
            <Table.Row key={134}>
              <Table.Cell>
                <h1>Data not found</h1>
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
