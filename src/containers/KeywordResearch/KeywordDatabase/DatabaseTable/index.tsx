import React, { useState } from 'react';
import { Table } from 'rsuite';

/* Styles */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './global.scss';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import SearchTerm from './SearchTerm';
import TablePagination from '../../../../components/NewTable/Pagination';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/KeywordResearch/KeywordDatabase';

const fakeData = Array(10).fill({ title: 'sample' });

const DatabaseTable = () => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(50);

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log('Calling This', pageNo, perPageNo);
    setCurrentPage(prevState => (pageNo ? pageNo : prevState));
    setPerPage(prevState => (perPageNo ? perPageNo : prevState));
  };

  return (
    <section className={styles.keywordDatabaseTableWrapper}>
      <Table
        loading={false}
        data={fakeData}
        autoHeight
        hover={false}
        rowHeight={65}
        headerHeight={60}
        sortColumn={sortColumn}
        sortType={sortType}
        id="keywordDatabaseTable"
        onSortColumn={handleSortColumn}
      >
        {/* Search Term */}
        <Table.Column verticalAlign="middle" fixed align="left" flexGrow={1}>
          <Table.HeaderCell>Search Term</Table.HeaderCell>
          <SearchTerm dataKey="phrase" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={150} verticalAlign="middle" fixed align="center" sortable flexGrow={1}>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search\nVolume`}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <Table.Cell>125,235</Table.Cell>
        </Table.Column>

        {/* Search Volume L30D */}
        <Table.Column width={150} verticalAlign="middle" fixed align="center" sortable flexGrow={1}>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search\nVolume L30D`}
              dataKey="search_volume_30_days"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <Table.Cell>+25%</Table.Cell>
        </Table.Column>

        {/* Sponsored ASINs */}
        <Table.Column width={150} verticalAlign="middle" fixed align="center" sortable flexGrow={1}>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Sponsored\nASINs`}
              dataKey="sponsored_asins"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <Table.Cell>321</Table.Cell>
        </Table.Column>

        {/* Competing Products */}
        <Table.Column width={150} verticalAlign="middle" fixed align="center" sortable flexGrow={1}>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competing\nProducts `}
              dataKey="competing products"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <Table.Cell>{'>1,0000'}</Table.Cell>
        </Table.Column>
      </Table>

      {/* Pagination */}
      <footer className={styles.keywordDatabasePaginationContainer}>
        <TablePagination
          totalPages={10}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          showSiblingsCount={3}
          showPerPage={true}
          perPage={perPage}
          perPageList={DEFAULT_PAGES_LIST}
        />
      </footer>
    </section>
  );
};

export default DatabaseTable;
