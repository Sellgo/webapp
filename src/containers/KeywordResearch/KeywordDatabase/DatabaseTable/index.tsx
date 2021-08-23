import React, { useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

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

/* Selectors */
import {
  getIsLoadingkeywordDatabaseTable,
  getKeywordDatabaseTablePaginationInfo,
  getKeywordDatabaseTableResults,
} from '../../../../selectors/KeywordResearch/KeywordDatabase';

/* Actions */
import { fetchkeywordDatabaseTableInformation } from '../../../../actions/KeywordResearch/KeywordDatabase';

/* Interfaces */
import {
  KeywordDatabasePaginationInfo,
  KeywordDatabaseTablePayload,
} from '../../../../interfaces/KeywordResearch/KeywordDatabase';

const fakeData = Array(10).fill({ title: 'sample' });

interface Props {
  isLoadingKeywordDatabaseTable: boolean;
  keywordDatabaseTableResults: any;
  keywordDatabaseTablePaginationInfo: KeywordDatabasePaginationInfo;
  fetchKeywordDatabaseTableInformation: (payload: KeywordDatabaseTablePayload) => void;
}

const DatabaseTable = (props: Props) => {
  const { isLoadingKeywordDatabaseTable, keywordDatabaseTablePaginationInfo } = props;

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

      {keywordDatabaseTablePaginationInfo && keywordDatabaseTablePaginationInfo.total_pages > 0 && (
        <footer className={styles.keywordDatabasePaginationContainer}>
          <TablePagination
            totalPages={10}
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
      dispatch(fetchkeywordDatabaseTableInformation(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseTable);
