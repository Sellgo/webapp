import React, { useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import TablePagination from '../../../../components/NewTable/Pagination';

/* Containers */
import Keyword from './Keyword';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingTrackerProductKeywordsTable,
  getTrackerProductKeywordsTableResults,
} from '../../../../selectors/KeywordResearch/KeywordTracker';

interface Props {
  isLoadingTrackerProductKeywordsTable: boolean;
  trackerProductKeywordsTableResults: any[];
}

const TrackerKeywordTable = (props: Props) => {
  const { isLoadingTrackerProductKeywordsTable, trackerProductKeywordsTableResults } = props;

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
    <div className={styles.keywordTableWrapper}>
      <Table
        loading={isLoadingTrackerProductKeywordsTable}
        data={trackerProductKeywordsTableResults}
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
          <Keyword dataKey="keyword" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search Volume`}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="search_volume" align="center" />
        </Table.Column>

        {/* Competing Products  */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competing Products`}
              dataKey="competing_products"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competing_products" align="center" prependWith={'>'} />
        </Table.Column>

        {/* Relative Rank */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Relative Rank`}
              dataKey="relative_rank"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="relative_rank" align="center" prependWith={'>'} />
        </Table.Column>

        {/* Average Rank  */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Average Rank`}
              dataKey="average_rank"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="average_rank" align="center" prependWith={'>'} />
        </Table.Column>

        {/* Ranking Asins   */}
        <Table.Column width={180} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Ranking ASIN's`}
              dataKey="ranking_asins"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="ranking_asins" align="center" prependWith={'>'} />
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

const mapStateToProps = (state: any) => {
  return {
    isLoadingTrackerProductKeywordsTable: getIsLoadingTrackerProductKeywordsTable(state),
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
  };
};

export default connect(mapStateToProps)(TrackerKeywordTable);
