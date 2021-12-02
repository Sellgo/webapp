import React, { useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';

/* Styling */
import styles from './index.module.scss';
import './global.scss';

/* Selectors */
import {
  getIsFetchingKeywordReverseRequestId,
  getIsLoadingKeywordReverseTable,
  getKeywordReverseProductsList,
  getKeywordReverseTablePaginationInfo,
  getKeywordReverseTableResults,
  getShouldFetchKeywordReverseProgress,
} from '../../../../selectors/KeywordResearch/KeywordReverse';

/* Actions */
import { fetchKeywordReverseTableInformation } from '../../../../actions/KeywordResearch/KeywordReverse';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import TablePagination from '../../../../components/NewTable/Pagination';
import StatsCell from '../../../../components/NewTable/StatsCell';
import Placeholder from '../../../../components/Placeholder';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/KeywordResearch/KeywordReverse';

/* Containers */
import SearchTerm from './SearchTerm';

/* Interfaces */
import {
  KeywordReverseAsinProduct,
  KeywordReversePaginationInfo,
  KeywordReverseTablePayload,
} from '../../../../interfaces/KeywordResearch/KeywordReverse';

/* Utils */
import { onMountFixNewTableHeader } from '../../../../utils/newTable';

interface Props {
  isLoadingKeywordReverseTable: boolean;
  isFetchingKeywordReverseRequestId: boolean;
  shouldFetchKeywordReverseProgress: boolean;
  keywordReverseTableResults: any[];
  keywordReverseTablePaginationInfo: KeywordReversePaginationInfo;
  keywordReverseProductsList: KeywordReverseAsinProduct[];

  fetchKeywordReverseTableInformation: (payload: KeywordReverseTablePayload) => void;
}

const ReverseTable = (props: Props) => {
  const {
    isLoadingKeywordReverseTable,
    isFetchingKeywordReverseRequestId,
    shouldFetchKeywordReverseProgress,
    keywordReverseTableResults,
    keywordReverseTablePaginationInfo,
    keywordReverseProductsList,
    fetchKeywordReverseTableInformation,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  /* Fix table header */
  React.useEffect(() => {
    onMountFixNewTableHeader();
  }, []);

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchKeywordReverseTableInformation({ sort: sortColumn, sortDir: sortType });
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    fetchKeywordReverseTableInformation({ page: pageNo, per_page: perPageNo });
  };

  const singleAsinOnReverse = keywordReverseProductsList && keywordReverseProductsList.length === 1;
  const isLoading =
    isLoadingKeywordReverseTable ||
    isFetchingKeywordReverseRequestId ||
    shouldFetchKeywordReverseProgress;
  return (
    <section className={styles.keywordReverseTableWrapper}>
      <Table
        renderLoading={() =>
          isLoading && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
        }
        renderEmpty={() => <div />}
        // Dont display old data when loading
        data={!isLoading ? keywordReverseTableResults : []}
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
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search Term`}
              dataKey="search_term"
              currentSortColumn={''}
              currentSortType={undefined}
              disableSort
            />
          </Table.HeaderCell>
          <SearchTerm dataKey="searchTerm" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search\nVolume`}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="search_volume" align="left" specialKpi />
        </Table.Column>

        {/* Sponsored ASINS */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Sponsored\nASINs`}
              dataKey="sponsored_asins"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="sponsored_asins" align="left" />
        </Table.Column>

        {/* Sponsored Rank */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Sponsored\nRank`}
              dataKey="sponsored_rank"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="sponsored_rank" align="left" />
        </Table.Column>

        {/* Competing Products  */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competing\nProducts`}
              dataKey="competing_products"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competing_products" align="left" />
        </Table.Column>

        {/* Competitor Rank   */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competitor\nRank (Avg)`}
              dataKey="competitor_rank_avg"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competitor_rank_avg" align="left" />
        </Table.Column>

        {/* Ranking Competitors Count  */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Ranking\nCompetitors`}
              dataKey="ranking_competitors_count"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="ranking_competitors_count" align="left" />
        </Table.Column>

        {/* Title Density  */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Title\nDensity`}
              dataKey="title_density"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="title_density" align="left" />
        </Table.Column>

        {/* Dynamic Columns for the tbale based on asin count */}
        {singleAsinOnReverse
          ? [
              /* Organic Rank */
              <Table.Column
                width={100}
                verticalAlign="middle"
                fixed
                align="left"
                sortable
                key={uuid()}
              >
                <Table.HeaderCell>
                  <HeaderSortCell
                    title={`Organic\nRank`}
                    dataKey="organic_rank"
                    currentSortColumn={sortColumn}
                    currentSortType={sortType}
                  />
                </Table.HeaderCell>
                <StatsCell dataKey="organic_rank" align="left" />
              </Table.Column>,
            ]
          : [
              /* Sponsored Rank (avg) */
              <Table.Column
                width={100}
                verticalAlign="middle"
                fixed
                align="left"
                sortable
                key={uuid()}
              >
                <Table.HeaderCell>
                  <HeaderSortCell
                    title={`Sponsored\nRank (avg)`}
                    dataKey="sponsored_rank_avg"
                    currentSortColumn={sortColumn}
                    currentSortType={sortType}
                  />
                </Table.HeaderCell>
                <StatsCell dataKey="sponsored_rank_avg" align="left" />
              </Table.Column>,

              /* Sponsored Rank (count) */
              <Table.Column
                width={100}
                verticalAlign="middle"
                fixed
                align="left"
                sortable
                key={uuid()}
              >
                <Table.HeaderCell>
                  <HeaderSortCell
                    title={`Sponsored\nRank (#)`}
                    dataKey="sponsored_rank_count"
                    currentSortColumn={sortColumn}
                    currentSortType={sortType}
                  />
                </Table.HeaderCell>
                <StatsCell dataKey="sponsored_rank_count" align="left" />
              </Table.Column>,

              /* Position Rank  */
              <Table.Column
                width={100}
                verticalAlign="middle"
                fixed
                align="left"
                sortable
                key={uuid()}
              >
                <Table.HeaderCell>
                  <HeaderSortCell
                    title={`Position\nRank`}
                    dataKey="position_rank"
                    currentSortColumn={sortColumn}
                    currentSortType={sortType}
                  />
                </Table.HeaderCell>
                <StatsCell dataKey="position_rank" align="left" />
              </Table.Column>,

              /* Relative Rank   */
              <Table.Column
                width={100}
                verticalAlign="middle"
                fixed
                align="left"
                sortable
                key={uuid()}
              >
                <Table.HeaderCell>
                  <HeaderSortCell
                    title={`Relative\nRank`}
                    dataKey="relative_rank"
                    currentSortColumn={sortColumn}
                    currentSortType={sortType}
                  />
                </Table.HeaderCell>
                <StatsCell dataKey="relative_rank" align="left" />
              </Table.Column>,
            ]}

        {/* Count Top 10  */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Count\nTop 10`}
              dataKey="count_top_10"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="count_top_10" align="left" />
        </Table.Column>

        {/* Count Top 50  */}
        <Table.Column width={100} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Count\nTop 50`}
              dataKey="count_top_50"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="count_top_50" align="left" />
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
    isFetchingKeywordReverseRequestId: getIsFetchingKeywordReverseRequestId(state),
    shouldFetchKeywordReverseProgress: getShouldFetchKeywordReverseProgress(state),
    keywordReverseTableResults: getKeywordReverseTableResults(state),
    keywordReverseTablePaginationInfo: getKeywordReverseTablePaginationInfo(state),
    keywordReverseProductsList: getKeywordReverseProductsList(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordReverseTableInformation: (payload: KeywordReverseTablePayload) =>
      dispatch(fetchKeywordReverseTableInformation(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReverseTable);
