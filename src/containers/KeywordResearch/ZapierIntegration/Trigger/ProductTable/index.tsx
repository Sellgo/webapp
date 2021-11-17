import React, { useState, useEffect } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Componensts */
import StatsCell from '../../../../../components/NewTable/StatsCell';
import TablePagination from '../../../../../components/NewTable/Pagination';
import ExpansionCell from '../../../../../components/NewTable/ExpansionCell';

/* Containers */
import ProductInfo from './ProductInfo';

/* Child Table */
import ProductKeywordTable from '../ProductKeywordTable';

/* Constants */
import {
  DEFAULT_PAGES_LIST,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingKeywordTrackerProductsTable,
  getKeywordTrackerProductsTablePaginationInfo,
  getKeywordTrackerProductsTableResults,
  getTrackerProductKeywordsTableResults,
} from '../../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import {
  fetchKeywordTrackerProductsTable,
  fetchTrackerProductKeywordsTable,
  setKeywordTrackerProductsExpandedRow,
} from '../../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  KeywordTrackerProductsTablePaginationInfo,
  TrackerProductKeywordsTablePayload,
  TrackerTableProductsPayload,
} from '../../../../../interfaces/KeywordResearch/KeywordTracker';

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
        height={420}
        hover={false}
        rowHeight={60}
        headerHeight={55}
        sortColumn={sortColumn}
        sortType={sortType}
        id="zapierProductTable"
        onSortColumn={handleSortColumn}
        shouldUpdateScroll={false}
        //  Props for table expansion
        rowKey={TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY}
        rowExpandedHeight={300}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={() => <ProductKeywordTable />}
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
        <Table.Column minWidth={300} verticalAlign="top" fixed="left" align="left" flexGrow={1}>
          <Table.HeaderCell className={styles.productInfoHeader}>
            Product Information
          </Table.HeaderCell>
          <ProductInfo dataKey="productInfo" />
        </Table.Column>

        {/* Keywords */}
        <Table.Column width={200} verticalAlign="middle" align="left">
          <Table.HeaderCell>Keywords</Table.HeaderCell>
          <StatsCell dataKey="tracked_keywords" align="center" />
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
