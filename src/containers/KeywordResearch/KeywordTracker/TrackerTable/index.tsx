import React, { useState, useEffect } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import TablePagination from '../../../../components/NewTable/Pagination';
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';

/* Containers */
import ProductInfo from './ProductInfo';
import ChangeStats from './ChangeStats';
import ActionsCell from './ActionsCell';
import ChangeStatPeriod from './ChangeStatPeriod';

/* Child Table */
import TrackerKeywordTable from '../TrackerKeywordTable';

/* Constants */
import {
  calculateTrackerProductTableExpandedHeight,
  DEFAULT_PAGES_LIST,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingKeywordTrackerProductsTable,
  getKeywordTrackerProductsTablePaginationInfo,
  getKeywordTrackerProductsTableResults,
  getTrackerProductKeywordsTableResults,
} from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import {
  fetchKeywordTrackerProductsTable,
  fetchTrackerProductKeywordsTable,
  setKeywordTrackerProductsExpandedRow,
} from '../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  KeywordTrackerProductsTablePaginationInfo,
  TrackerProductKeywordsTablePayload,
  TrackerTableProductsPayload,
} from '../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  isLoadingKeywordTrackerProductsTable: boolean;
  keywordTrackerProductsTableResults: any[];
  keywordTrackerProductsTablePaginationInfo: KeywordTrackerProductsTablePaginationInfo;
  fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) => void;

  setKeywordTrackerProductsExpandedRow: (payload: any) => void;

  trackerProductKeywordsTableResults: any[];
  fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) => void;
}

const TrackerTable = (props: Props) => {
  const {
    /* Main products taale */
    isLoadingKeywordTrackerProductsTable,
    keywordTrackerProductsTableResults,
    keywordTrackerProductsTablePaginationInfo,
    fetchKeywordTrackerProductsTable,

    setKeywordTrackerProductsExpandedRow,

    /* Keywords Table */
    trackerProductKeywordsTableResults,
    fetchTrackerProductKeywordsTable,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();
  const [expandedRowKeys, setExpandedRowkeys] = useState<string[]>([]);

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchKeywordTrackerProductsTable({ sort: sortColumn, sortDir: sortType });
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    fetchKeywordTrackerProductsTable({ page: pageNo, perPage: perPageNo });
  };

  const handleExpansion = (rowData: any) => {
    const rowId = rowData[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY];
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      // set the expanded row in state
      setKeywordTrackerProductsExpandedRow(rowData);
      // fetch keywords table data
      fetchTrackerProductKeywordsTable({
        keywordTrackProductId: rowId,
      });
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
      setKeywordTrackerProductsExpandedRow({});
    }
  };

  /* Load contents for keyword tracker products table */
  useEffect(() => {
    fetchKeywordTrackerProductsTable({});
  }, []);

  return (
    <section className={styles.keywordTrackerTableWrapper}>
      <Table
        loading={isLoadingKeywordTrackerProductsTable}
        data={keywordTrackerProductsTableResults}
        autoHeight
        hover={false}
        rowHeight={120}
        headerHeight={55}
        sortColumn={sortColumn}
        sortType={sortType}
        id="keywordTrackerTable"
        onSortColumn={handleSortColumn}
        //  Props for table expansion
        rowKey={TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY}
        rowExpandedHeight={calculateTrackerProductTableExpandedHeight(
          trackerProductKeywordsTableResults && trackerProductKeywordsTableResults.length
        )}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={() => <TrackerKeywordTable />}
      >
        {/* Expand Cell */}
        <Table.Column verticalAlign="top" fixed="left" align="left" width={30}>
          <Table.HeaderCell> </Table.HeaderCell>
          <ExpansionCell
            dataKey={TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY}
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpansion}
          />
        </Table.Column>

        {/* Product Info */}
        <Table.Column minWidth={500} verticalAlign="top" fixed="left" align="left" flexGrow={1}>
          <Table.HeaderCell>Product Information</Table.HeaderCell>
          <ProductInfo dataKey="productInfo" />
        </Table.Column>

        {/* Tracked Keywords */}
        <Table.Column width={130} verticalAlign="top" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Tracked\nKeywords`}
              dataKey="tracked_keywords"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="tracked_keywords" align="center" />
        </Table.Column>

        {/* Amazon Choice Count */}
        <Table.Column width={130} verticalAlign="top" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Amazon\nCount (#)`}
              dataKey="amazon_choice_count"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="amazon_choice_count" align="center" />
        </Table.Column>

        {/* Change Sats Period */}
        <Table.Column width={130} verticalAlign="top" align="center">
          <Table.HeaderCell>{''}</Table.HeaderCell>
          <ChangeStatPeriod dataKey="change_stat_period" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={160} verticalAlign="top" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search Vol. `}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStats dataKey="search_volume" align="center" />
        </Table.Column>

        {/* Organic */}
        <Table.Column width={150} verticalAlign="top" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Organic`}
              dataKey="organic"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStats dataKey="organic_asins" align="center" />
        </Table.Column>

        {/* Sponsored */}
        <Table.Column width={150} verticalAlign="top" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Sponsored`}
              dataKey="organic"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStats dataKey="sponsored_asins" align="center" />
        </Table.Column>

        {/* True Rank Performace Index */}
        <Table.Column width={150} verticalAlign="top" align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`True Rank\nPerformace Index`}
              dataKey="true_rank_performance"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell
            dataKey="true_rank_performance"
            align="center"
            appendWith="%"
            asRounded={false}
          />
        </Table.Column>

        {/* Actions Cell */}
        <Table.Column width={40} verticalAlign="middle" align="left">
          <Table.HeaderCell>{''}</Table.HeaderCell>
          <ActionsCell dataKey={TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY} />
        </Table.Column>
      </Table>

      {/* Table Pagination */}
      {keywordTrackerProductsTablePaginationInfo.total_pages > 0 && (
        <footer className={styles.keywordTrackerPaginationContainer}>
          <TablePagination
            totalPages={keywordTrackerProductsTablePaginationInfo.total_pages}
            currentPage={keywordTrackerProductsTablePaginationInfo.current_page}
            onPageChange={handlePageChange}
            showSiblingsCount={3}
            showPerPage={true}
            perPage={keywordTrackerProductsTablePaginationInfo.per_page}
            perPageList={DEFAULT_PAGES_LIST}
          />
        </footer>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordTrackerProductsTable: getIsLoadingKeywordTrackerProductsTable(state),
    keywordTrackerProductsTableResults: getKeywordTrackerProductsTableResults(state),
    keywordTrackerProductsTablePaginationInfo: getKeywordTrackerProductsTablePaginationInfo(state),
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setKeywordTrackerProductsExpandedRow: (payload: any) =>
      dispatch(setKeywordTrackerProductsExpandedRow(payload)),

    fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) =>
      dispatch(fetchKeywordTrackerProductsTable(payload)),

    fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) =>
      dispatch(fetchTrackerProductKeywordsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerTable);
