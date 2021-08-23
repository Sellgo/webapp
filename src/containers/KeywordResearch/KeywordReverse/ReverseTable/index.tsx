import React, { useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';
import './global.scss';

/* Selectors */
import {
  getIsLoadingKeywordReverseTable,
  getKeywordReverseTablePaginationInfo,
  getKeywordReverseTableResults,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Actions */
import { fetchKeywordReverseTableInformation } from '../../../../actions/KeywordResearch/KeywordReverse';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import TablePagination from '../../../../components/NewTable/Pagination';
import StatsCell from '../../../../components/NewTable/StatsCell';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Containers */
import SearchTerm from './SearchTerm';

/* Interfaces */
import {
  KeywordReversePaginationInfo,
  KeywordReverseTablePayload,
} from '../../../../interfaces/KeywordResearch/KeywordReverse';

interface Props {
  isLoadingKeywordReverseTable: boolean;
  keywordReverseTableResults: any[];
  keywordReverseTablePaginationInfo: KeywordReversePaginationInfo;

  fetchKeywordReverseTableInformation: (payload: KeywordReverseTablePayload) => void;
}

const ReverseTable = (props: Props) => {
  const {
    isLoadingKeywordReverseTable,
    keywordReverseTableResults,
    keywordReverseTablePaginationInfo,
    fetchKeywordReverseTableInformation,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchKeywordReverseTableInformation({ sort: sortColumn, sortDir: sortType });
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    fetchKeywordReverseTableInformation({ page: pageNo, per_page: perPageNo });
  };

  return (
    <section className={styles.keywordReverseTableWrapper}>
      <Table
        loading={isLoadingKeywordReverseTable}
        data={keywordReverseTableResults}
        autoHeight
        hover={false}
        rowHeight={65}
        headerHeight={60}
        sortColumn={sortColumn}
        sortType={sortType}
        id="keywordReverseTable"
        onSortColumn={handleSortColumn}
      >
        {/* Search Term */}
        <Table.Column verticalAlign="middle" fixed align="left" flexGrow={1}>
          <Table.HeaderCell>Search Term</Table.HeaderCell>
          <SearchTerm dataKey="searchTerm" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={130} verticalAlign="middle" fixed align="left" sortable>
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

        {/* Sponsored ASINS */}
        <Table.Column width={130} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Sponsored\nASINs`}
              dataKey="sponsored_asins"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="sponsored_asins" align="center" />
        </Table.Column>

        {/* Competing Products  */}
        <Table.Column width={130} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competing\nProducts`}
              dataKey="competing_products"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competing_products" prependWith="> " align="center" />
        </Table.Column>

        {/* Position Rank */}
        <Table.Column width={130} verticalAlign="middle" fixed align="left" sortable>
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

        {/* Relative Rank  */}
        <Table.Column width={130} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Relative\nRank`}
              dataKey="relative_rank"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="relative_rank" align="center" />
        </Table.Column>

        {/* Competitor Rank  */}
        <Table.Column width={130} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competitor\nRank(avg)`}
              dataKey="competitor_rank_avg"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competitor_rank_avg" align="center" />
        </Table.Column>

        {/* Ranking Competitors  */}
        <Table.Column width={130} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Ranking\nCompetitors`}
              dataKey="ranking_competitors_count"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="ranking_competitors_count" align="center" />
        </Table.Column>
      </Table>

      {keywordReverseTablePaginationInfo && keywordReverseTablePaginationInfo.total_pages > 0 && (
        <footer className={styles.keywordReversePaginationContainer}>
          <TablePagination
            totalPages={keywordReverseTablePaginationInfo.total_pages}
            currentPage={keywordReverseTablePaginationInfo.current_page}
            onPageChange={handlePageChange}
            showSiblingsCount={3}
            showPerPage={true}
            perPage={keywordReverseTablePaginationInfo.per_page}
            perPageList={DEFAULT_PAGES_LIST}
          />
        </footer>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordReverseTable: getIsLoadingKeywordReverseTable(state),
    keywordReverseTableResults: getKeywordReverseTableResults(state),
    keywordReverseTablePaginationInfo: getKeywordReverseTablePaginationInfo(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseTableInformation: (payload: KeywordReverseTablePayload) =>
      dispatch(fetchKeywordReverseTableInformation(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseTable);
