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

/* Assets */
import amazonChoiceLabel from '../../../../assets/amazonLabels/amazonChoiceLabel.png';

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
    fetchKeywordDatabaseTableInformation,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

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

  return (
    <section className={styles.keywordDatabaseTableWrapper}>
      <Table
        loading={isLoadingKeywordDatabaseTable}
        data={keywordDatabaseTableResults}
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
        <Table.Column width={140} verticalAlign="middle" align="left">
          <Table.HeaderCell>Amazon Choice</Table.HeaderCell>
          <Table.Cell>
            {(rowData: any) => {
              const { amazon_choice_asins } = rowData;
              return (
                <div className={styles.amazonChoiceLabel}>
                  {amazon_choice_asins > 0 ? (
                    <img src={amazonChoiceLabel} alt="Amazon Choice Lable" />
                  ) : null}
                </div>
              );
            }}
          </Table.Cell>
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search\nVolume`}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="search_volume" align="center" specialKpi />
        </Table.Column>

        {/* Sponsored ASINS */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable>
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
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competing\nProducts`}
              dataKey="competing_products"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competing_products" align="center" />
        </Table.Column>

        {/* Word Count  */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Word\nCount`}
              dataKey="word_count"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="word_count" align="center" />
        </Table.Column>

        {/* Match Type  */}
        {/* <Table.Column width={120} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Match`}
              dataKey="match"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <MatchTypeCell dataKey="match" />
        </Table.Column> */}

        {/* Title Density */}
        <Table.Column width={150} verticalAlign="middle" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Title\nDensity`}
              dataKey="title_density"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="search_volume" />
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
