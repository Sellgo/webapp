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
import {
  DEFAULT_PAGES_LIST,
  PRODUCT_KEYWORD_ROW_HEIGHT,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingTrackerProductKeywordsTable,
  getTrackerProductKeywordsTablePaginationInfo,
  getTrackerProductKeywordsTableResults,
} from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { fetchTrackerProductKeywordsTable } from '../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  TrackerProductKeywordsTablePaginationInfo,
  TrackerProductKeywordsTablePayload,
} from '../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  isLoadingTrackerProductKeywordsTable: boolean;
  trackerProductKeywordsTableResults: any[];
  trackerProductKeywordsTablePaginationInfo: TrackerProductKeywordsTablePaginationInfo;
  fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) => void;
}

const TrackerKeywordTable = (props: Props) => {
  const {
    isLoadingTrackerProductKeywordsTable,
    trackerProductKeywordsTableResults,
    trackerProductKeywordsTablePaginationInfo,
    fetchTrackerProductKeywordsTable,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    const tableResults = trackerProductKeywordsTableResults;
    const [firstItem] = tableResults;

    if (!firstItem) {
      return;
    }

    fetchTrackerProductKeywordsTable({
      keywordTrackProductId: firstItem[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY],
      page: pageNo,
      per_page: perPageNo,
    });
  };

  return (
    <div className={styles.keywordTableWrapper}>
      <Table
        loading={isLoadingTrackerProductKeywordsTable}
        data={trackerProductKeywordsTableResults}
        autoHeight
        hover={false}
        rowHeight={PRODUCT_KEYWORD_ROW_HEIGHT}
        headerHeight={50}
        sortColumn={sortColumn}
        sortType={sortType}
        id="trackerKeywordTable"
        onSortColumn={handleSortColumn}
        renderEmpty={() => {
          return <h1>Add something here for no data cases</h1>;
        }}
      >
        {/* Keyword Info */}
        <Table.Column verticalAlign="middle" fixed align="left" width={500} flexGrow={1}>
          <Table.HeaderCell>Keyword</Table.HeaderCell>
          <Keyword dataKey="keyword" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={130} verticalAlign="middle" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search\nVolume`}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="search_volume" align="center" />
        </Table.Column>

        {/* Competing Products  */}
        <Table.Column width={130} verticalAlign="middle" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competing\nProducts`}
              dataKey="competing_products"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competing_products" align="center" prependWith={'>'} />
        </Table.Column>

        {/* Competing Products  */}
        <Table.Column width={130} verticalAlign="middle" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Position\nRank`}
              dataKey="position_rank"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="position_rank" align="center" />
        </Table.Column>

        {/* Relative Rank */}
        <Table.Column width={130} verticalAlign="middle" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Relative\nRank`}
              dataKey="relative_rank"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="relative_rank" align="center" prependWith={'>'} />
        </Table.Column>

        {/* Average Rank  */}
        <Table.Column width={130} verticalAlign="middle" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Rank\nAvg`}
              dataKey="average_rank"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="average_rank" align="center" prependWith={'>'} />
        </Table.Column>

        {/* Ranking Asins   */}
        <Table.Column width={130} verticalAlign="middle" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Ranking\nASIN's`}
              dataKey="ranking_asins"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="ranking_asins" align="center" prependWith={'>'} />
        </Table.Column>
      </Table>

      {/* Table Pagination */}
      {trackerProductKeywordsTablePaginationInfo.total_pages > 0 && (
        <footer className={styles.trackerKeywordTablePagination}>
          <TablePagination
            totalPages={trackerProductKeywordsTablePaginationInfo.total_pages}
            currentPage={trackerProductKeywordsTablePaginationInfo.current_page}
            onPageChange={handlePageChange}
            showSiblingsCount={3}
            showPerPage={true}
            perPage={trackerProductKeywordsTablePaginationInfo.per_page}
            perPageList={DEFAULT_PAGES_LIST}
          />
        </footer>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingTrackerProductKeywordsTable: getIsLoadingTrackerProductKeywordsTable(state),
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
    trackerProductKeywordsTablePaginationInfo: getTrackerProductKeywordsTablePaginationInfo(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) =>
      dispatch(fetchTrackerProductKeywordsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerKeywordTable);
