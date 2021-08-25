import React, { useState } from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import TablePagination from '../../../../components/NewTable/Pagination';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/KeywordResearch/KeywordTracker';

/* Fake Data */
const fakeData = Array(10).fill({ title: 'Demo' });

const TrackerKeywordTable = () => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log(pageNo, perPageNo);
  };

  React.useEffect(() => {
    console.log('Table was mounted');
  }, []);

  return (
    <div className={styles.keywordTableWrapper}>
      <Table
        loading={false}
        data={fakeData}
        autoHeight
        hover={false}
        rowHeight={50}
        headerHeight={50}
        sortColumn={sortColumn}
        sortType={sortType}
        id="trackerKeywordTable"
        onSortColumn={handleSortColumn}
      >
        {/* Keyword Info */}
        <Table.Column verticalAlign="middle" fixed align="left" width={500} flexGrow={1}>
          <Table.HeaderCell>Keyword</Table.HeaderCell>
          <Table.Cell>Big thermos water bottle insultaed ...</Table.Cell>
        </Table.Column>

        {/* Search Volume */}
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

        {/* Competing Products Volume */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Tracked Keywords`}
              dataKey="tracked_keywords"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <Table.Cell>{'>306'}</Table.Cell>
        </Table.Column>

        {/* Competing Trend Volume */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Tracked Keywords`}
              dataKey="tracked_keywords"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <Table.Cell>{'>306'}</Table.Cell>
        </Table.Column>
      </Table>

      <footer className={styles.trackerKeywordTablePagination}>
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
    </div>
  );
};

export default TrackerKeywordTable;
