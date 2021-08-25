import React, { useState } from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';

/* Containers */
import ProductInfo from './ProductInfo';
import StatsCell from '../../../../components/NewTable/StatsCell';
import TablePagination from '../../../../components/NewTable/Pagination';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/KeywordResearch/KeywordTracker';
import ChangeStatsCell from '../../../../components/NewTable/ChangeStatsCell';

/* Fake Data */
const fakeData = Array(10).fill({ title: 'Demo' });

const TrackerTable = () => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log(pageNo, perPageNo);
  };

  return (
    <section className={styles.keywordTrackerTableWrapper}>
      <Table
        loading={false}
        data={fakeData}
        autoHeight
        hover={false}
        rowHeight={65}
        headerHeight={60}
        sortColumn={sortColumn}
        sortType={sortType}
        id="keywordTrackerTable"
        onSortColumn={handleSortColumn}
      >
        {/* Product Info */}
        <Table.Column verticalAlign="middle" fixed align="left" width={500}>
          <Table.HeaderCell>Product Information</Table.HeaderCell>
          <ProductInfo dataKey="productInfo" />
        </Table.Column>

        {/* Tracked Keywords */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Tracked Keywords`}
              dataKey="tracked_keywords"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="tracked_keywords" align="center" />
        </Table.Column>

        {/* Competitors */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competitors `}
              dataKey="competitors"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competitors" align="center" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search Volume `}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStatsCell
            dataKey="search_volume"
            align="center"
            statsCount={23_563}
            changePercent={3.69}
          />
        </Table.Column>

        {/* Organic */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Organic`}
              dataKey="organic"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStatsCell dataKey="organic" align="center" statsCount={50} changePercent={-6.69} />
        </Table.Column>

        {/* Sponsored */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Sponsored`}
              dataKey="organic"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStatsCell dataKey="organic" align="center" statsCount={10} changePercent={5.89} />
        </Table.Column>
      </Table>

      <footer className={styles.keywordTrackerPaginationContainer}>
        <TablePagination
          totalPages={10}
          currentPage={1}
          onPageChange={handlePageChange}
          showSiblingsCount={3}
          showPerPage={true}
          perPage={20}
          perPageList={DEFAULT_PAGES_LIST}
        />
      </footer>
    </section>
  );
};

export default TrackerTable;
