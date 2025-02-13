import React, { useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styles */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './global.scss';

/* Components */
import Placeholder from '../../../../components/Placeholder';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import SearchTerm from './SearchTerm';
import AmazonChoiceLabel from '../../KeywordTracker/TrackerTable/AmazonChoiceLabel';
import TablePagination from '../../../../components/NewTable/Pagination';

/* Constants */
import { DEFAULT_PAGES_LIST } from '../../../../constants/KeywordResearch/KeywordDatabase';

/* Selectors */
import {
  getIsLoadingkeywordDatabaseTable,
  getKeywordDatabaseTablePaginationInfo,
  getKeywordDatabaseTableResults,
  getShouldFetchkeywordDatabaseProgress,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Actions */
import { fetchKeywordDatabaseTableInformation } from '../../../../actions/KeywordResearch/KeywordDatabase';

/* Interfaces */
import {
  KeywordDatabasePaginationInfo,
  KeywordDatabaseTablePayload,
} from '../../../../interfaces/KeywordResearch/KeywordDatabase';

/* Utils */
import { onMountFixNewTableHeader } from '../../../../utils/newTable';

interface Props {
  isLoadingKeywordDatabaseTable: boolean;
  shouldFetchKeywordDatabaseProgress: boolean;
  keywordDatabaseTableResults: any;
  keywordDatabaseTablePaginationInfo: KeywordDatabasePaginationInfo;
  fetchKeywordDatabaseTableInformation: (payload: KeywordDatabaseTablePayload) => void;
}

const DatabaseTable = (props: Props) => {
  const {
    isLoadingKeywordDatabaseTable,
    keywordDatabaseTablePaginationInfo,
    keywordDatabaseTableResults,
    fetchKeywordDatabaseTableInformation,
    shouldFetchKeywordDatabaseProgress,
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
    fetchKeywordDatabaseTableInformation({
      sort: sortColumn,
      sortDir: sortType,
    });
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    fetchKeywordDatabaseTableInformation({
      page: pageNo,
      per_page: perPageNo,
    });
  };

  const isLoading = isLoadingKeywordDatabaseTable || shouldFetchKeywordDatabaseProgress;
  return (
    <section className={styles.keywordDatabaseTableWrapper}>
      <Table
        renderLoading={() =>
          isLoading && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
        }
        renderEmpty={() => <div />}
        // Dont display old data when loading
        data={
          !(isLoadingKeywordDatabaseTable || shouldFetchKeywordDatabaseProgress)
            ? keywordDatabaseTableResults
            : []
        }
        autoHeight
        hover={false}
        rowHeight={50}
        headerHeight={65}
        sortColumn={sortColumn}
        sortType={sortType}
        id="keywordDatabaseTable"
        onSortColumn={handleSortColumn}
      >
        {/* Search Term */}
        <Table.Column width={800} verticalAlign="middle" fixed align="left" flexGrow={1}>
          <Table.HeaderCell>Search Term</Table.HeaderCell>
          <SearchTerm dataKey="phrase" />
        </Table.Column>

        {/* Amzon Choice */}
        <Table.Column width={140} verticalAlign="middle" fixed align="left" sortable={!isLoading}>
          <Table.HeaderCell>
            <HeaderSortCell
              disabled={isLoading}
              title={`Amazon Choice`}
              dataKey="amazon_choice_asins"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <AmazonChoiceLabel dataKey="amazon_choice_asins" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable={!isLoading}>
          <Table.HeaderCell>
            <HeaderSortCell
              disabled={isLoading}
              title={`Search\nVolume`}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="search_volume" align="center" specialKpi />
        </Table.Column>

        {/* Sponsored ASINS */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable={!isLoading}>
          <Table.HeaderCell>
            <HeaderSortCell
              disabled={isLoading}
              title={`Sponsored\nASINs`}
              dataKey="sponsored_asins"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="sponsored_asins" align="center" />
        </Table.Column>

        {/* Competing Products  */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable={!isLoading}>
          <Table.HeaderCell>
            <HeaderSortCell
              disabled={isLoading}
              title={`Competing\nProducts`}
              dataKey="competing_products"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competing_products" align="center" />
        </Table.Column>

        {/* Word Count  */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable={!isLoading}>
          <Table.HeaderCell>
            <HeaderSortCell
              disabled={isLoading}
              title={`Word\nCount`}
              dataKey="word_count"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="word_count" align="center" />
        </Table.Column>

        {/* Match Type  */}
        {/* <Table.Column width={120} verticalAlign="middle" fixed align="left" sortable={!isLoading}>
          <Table.HeaderCell>
            <HeaderSortCell
              disabled={isLoading}
              title={`Match`}
              dataKey="match"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <MatchTypeCell dataKey="match" />
        </Table.Column> */}

        {/* Title Density */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable={!isLoading}>
          <Table.HeaderCell>
            <HeaderSortCell
              disabled={isLoading}
              title={`Title\nDensity`}
              dataKey="title_density"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="title_density" />
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
    shouldFetchKeywordDatabaseProgress: getShouldFetchkeywordDatabaseProgress(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordDatabaseTableInformation: (payload: KeywordDatabaseTablePayload) =>
      dispatch(fetchKeywordDatabaseTableInformation(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseTable);
