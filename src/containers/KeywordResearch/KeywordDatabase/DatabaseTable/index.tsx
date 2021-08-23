import React, { useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './global.scss';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import SearchTerm from './SearchTerm';
import TablePagination from '../../../../components/NewTable/Pagination';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/KeywordResearch/KeywordDatabase';

/* Selectors */
import {
  getIsLoadingkeywordDatabaseTable,
  getKeywordDatabaseTablePaginationInfo,
  getKeywordDatabaseTableResults,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Actions */
import { fetchKeywordDatabaseTableInformation } from '../../../../actions/KeywordResearch/KeywordDatabase';

/* Interfaces */
import {
  KeywordDatabasePaginationInfo,
  KeywordDatabaseTablePayload,
} from '../../../../interfaces/KeywordResearch/KeywordDatabase';

interface Props {
  isLoadingKeywordDatabaseTable: boolean;
  keywordDatabaseTableResults: any;
  keywordDatabaseTablePaginationInfo: KeywordDatabasePaginationInfo;
  fetchKeywordDatabaseTableInformation: (payload: KeywordDatabaseTablePayload) => void;
}

const DatabaseTable = (props: Props) => {
  const {
    isLoadingKeywordDatabaseTable,
    keywordDatabaseTablePaginationInfo,
    keywordDatabaseTableResults,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log('Calling This', pageNo, perPageNo);
  };

  return (
    <section className={styles.keywordDatabaseTableWrapper}>
      <Table
        loading={isLoadingKeywordDatabaseTable}
        data={keywordDatabaseTableResults}
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

      {/* Pagination */}
      {keywordDatabaseTablePaginationInfo && keywordDatabaseTablePaginationInfo.total_pages > 0 && (
        <footer className={styles.keywordDatabasePaginationContainer}>
          <TablePagination
            totalPages={keywordDatabaseTablePaginationInfo.total_pages}
            currentPage={keywordDatabaseTablePaginationInfo.current_page}
            onPageChange={handlePageChange}
            showSiblingsCount={3}
            showPerPage={true}
            perPage={keywordDatabaseTablePaginationInfo.per_page}
            perPageList={DEFAULT_PAGES_LIST}
          />
        </footer>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordDatabaseTable: getIsLoadingkeywordDatabaseTable(state),
    keywordDatabaseTableResults: getKeywordDatabaseTableResults(state),
    keywordDatabaseTablePaginationInfo: getKeywordDatabaseTablePaginationInfo(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseTableInformation: (payload: KeywordDatabaseTablePayload) =>
      dispatch(fetchKeywordDatabaseTableInformation(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseTable);
