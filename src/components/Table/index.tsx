import React, { useEffect, useState } from 'react';
import get from 'lodash/get';
import { Segment, Loader, Table, Pagination, Confirm } from 'semantic-ui-react';
import { connect } from 'react-redux';

export interface Column {
  render?: (row: any) => string | JSX.Element;
  dataKey?: string;
  label?: string;
  sortable?: boolean;
  type?: 'number' | 'string';
}

export interface TableProps {
  singlePageItemsCount?: number;
  data: Array<{ [key: string]: any }>;
  columns: Column[];
}

const renderCell = (row: { [key: string]: any }, column: Column) => {
  if (column.render) {
    return column.render(row);
  }

  if (column.dataKey) {
    return get(row, column.dataKey);
  }
};

const useSort = (initialValue: number) => {
  const [sortedColumnIndex, setSortedColumnIndex] = useState(initialValue);
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

  const handleSort = (clickedColumn: number) => {
    if (sortedColumnIndex !== clickedColumn) {
      setSortedColumnIndex(clickedColumn);
      setSortDirection('ascending');
    } else {
      setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
    }
  };

  return {
    sortedColumnIndex,
    sortDirection,
    setSort: handleSort,
  };
};

const GenericTable = (props: TableProps) => {
  const { data, columns, singlePageItemsCount = 10 } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(data.length / singlePageItemsCount);

  const { sortedColumnIndex, sortDirection, setSort } = useSort(0);

  let rows =
    sortedColumnIndex >= 0
      ? [...data].sort((a, b) => {
          const sortedColumn = columns[sortedColumnIndex];

          let aColumn, bColumn;

          if (sortedColumn.type === 'number') {
            aColumn = Number(a[sortedColumn.dataKey || '']);
            bColumn = Number(b[sortedColumn.dataKey || '']);
          } else {
            aColumn = a[sortedColumn.dataKey || ''];
            bColumn = b[sortedColumn.dataKey || ''];
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
  rows = rows.slice(currentPage * singlePageItemsCount, (currentPage + 1) * singlePageItemsCount);

  return rows.length === 0 ? (
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
  ) : (
    <Table sortable={true} basic="very">
      <Table.Header>
        <Table.Row>
          {columns.map((column, index) => {
            return (
              <Table.HeaderCell
                key={column.dataKey || index}
                sorted={sortedColumnIndex === index ? sortDirection : undefined}
                onClick={column.sortable ? () => setSort(index) : undefined}
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
                {columns.map((column, index) => (
                  <Table.Cell key={column.dataKey || index}>{renderCell(row, column)}</Table.Cell>
                ))}
              </Table.Row>
            );
          })
        )}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={columns.length}>
            {/* todo */}
            <Pagination
              totalPages={totalPages}
              activePage={currentPage}
              onPageChange={(event, data) => setCurrentPage(data.activePage ? +data.activePage : 0)}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default GenericTable;
