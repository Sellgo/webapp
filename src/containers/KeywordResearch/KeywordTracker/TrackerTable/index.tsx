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
import ChangeStatsCell from '../../../../components/NewTable/ChangeStatsCell';
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';

/* Containers */
import ProductInfo from './ProductInfo';

/* Child Table */
import TrackerKeywordTable from '../TrackerKeywordTable';

/* Constants */
import {
  calculateKeywordsTableHeight,
  DEFAULT_PAGES_LIST,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingKeywordTrackerProductsTable,
  getKeywordTrackerProductsTableResults,
  getTrackerProductKeywordsTableResults,
} from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import {
  fetchKeywordTrackerProductsTable,
  fetchTrackerProductKeywordsTable,
} from '../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import {
  TrackerProductKeywordsTablePayload,
  TrackerTableProductsPayload,
} from '../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  isLoadingKeywordTrackerProductsTable: boolean;
  // chore: need to add typescript here
  keywordTrackerProductsTableResults: any[];
  trackerProductKeywordsTableResults: any[];

  fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) => void;
  fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) => void;
}

const TrackerTable = (props: Props) => {
  const {
    isLoadingKeywordTrackerProductsTable,
    keywordTrackerProductsTableResults,
    fetchKeywordTrackerProductsTable,

    trackerProductKeywordsTableResults,
    fetchTrackerProductKeywordsTable,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();
  const [expandedRowKeys, setExpandedRowkeys] = useState<string[]>([]);

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log(pageNo, perPageNo);
  };

  const handleExpansion = (rowData: any) => {
    const rowId = rowData[TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY];
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      fetchTrackerProductKeywordsTable({
        keywordTrackProductId: rowId,
      });
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
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
        rowHeight={110}
        headerHeight={45}
        sortColumn={sortColumn}
        sortType={sortType}
        id="keywordTrackerTable"
        onSortColumn={handleSortColumn}
        //  Props for table expansion
        rowKey={TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY}
        rowExpandedHeight={calculateKeywordsTableHeight(
          (trackerProductKeywordsTableResults && trackerProductKeywordsTableResults.length) || 4
        )}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={() => <TrackerKeywordTable />}
      >
        {/* Expand Cell */}
        <Table.Column verticalAlign="top" fixed align="left" width={25}>
          <Table.HeaderCell> </Table.HeaderCell>
          <ExpansionCell
            dataKey={TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY}
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpansion}
          />
        </Table.Column>

        {/* Product Info */}
        <Table.Column verticalAlign="top" fixed align="left" width={500} flexGrow={1}>
          <Table.HeaderCell>Product Information</Table.HeaderCell>
          <ProductInfo dataKey="productInfo" />
        </Table.Column>

        {/* Tracked Keywords */}
        <Table.Column width={180} verticalAlign="top" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Tracked Keywords`}
              dataKey="tracked_keywords"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="tracked_keywords" align="center" />
        </Table.Column>

        {/* Competitors */}
        <Table.Column width={180} verticalAlign="top" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Competitors `}
              dataKey="competitors"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="competitors" align="center" />
        </Table.Column>

        {/* Search Volume */}
        <Table.Column width={180} verticalAlign="top" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Search Volume `}
              dataKey="search_volume"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStatsCell
            dataKey="search_volume"
            align="center"
            statsCount={23_563}
            changePercent={3.69}
          />
        </Table.Column>

        {/* Organic */}
        <Table.Column width={180} verticalAlign="top" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Organic`}
              dataKey="organic"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStatsCell dataKey="organic" align="center" statsCount={50} changePercent={-6.69} />
        </Table.Column>

        {/* Sponsored */}
        <Table.Column width={180} verticalAlign="top" fixed align="left" sortable>
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Sponsored`}
              dataKey="organic"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ChangeStatsCell dataKey="organic" align="center" statsCount={10} changePercent={5.89} />
        </Table.Column>
      </Table>

      <footer className={styles.keywordTrackerPaginationContainer}>
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
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingKeywordTrackerProductsTable: getIsLoadingKeywordTrackerProductsTable(state),
    keywordTrackerProductsTableResults: getKeywordTrackerProductsTableResults(state),
    trackerProductKeywordsTableResults: getTrackerProductKeywordsTableResults(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) =>
      dispatch(fetchKeywordTrackerProductsTable(payload)),
    fetchTrackerProductKeywordsTable: (payload: TrackerProductKeywordsTablePayload) =>
      dispatch(fetchTrackerProductKeywordsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerTable);
