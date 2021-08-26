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
  DEFAULT_PAGES_LIST,
  PRODUCT_KEYWORD_ROW_HEIGHT,
  TRACKER_PRODUCTS_TABLE_UNIQUE_ROW_KEY,
} from '../../../../constants/KeywordResearch/KeywordTracker';

/* Selectors */
import {
  getIsLoadingKeywordTrackerProductsTable,
  getKeywordTrackerProductsTableResults,
} from '../../../../selectors/KeywordResearch/KeywordTracker';

/* Actions */
import { fetchKeywordTrackerProductsTable } from '../../../../actions/KeywordResearch/KeywordTracker';

/* Interfaces */
import { TrackerTableProductsPayload } from '../../../../interfaces/KeywordResearch/KeywordTracker';

interface Props {
  isLoadingKeywordTrackerProductsTable: boolean;
  keywordTrackerProductsTableResults: any[];

  fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) => void;
}

const TrackerTable = (props: Props) => {
  const {
    isLoadingKeywordTrackerProductsTable,
    keywordTrackerProductsTableResults,
    fetchKeywordTrackerProductsTable,
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
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
    }
  };

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
        rowExpandedHeight={PRODUCT_KEYWORD_ROW_HEIGHT * 14}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={() => <TrackerKeywordTable />}
      >
        {/* Expand Cell */}
        <Table.Column verticalAlign="top" fixed align="left" width={25}>
          <Table.HeaderCell> </Table.HeaderCell>
          <ExpansionCell
            dataKey="expansionCell"
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchKeywordTrackerProductsTable: (payload: TrackerTableProductsPayload) =>
      dispatch(fetchKeywordTrackerProductsTable(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackerTable);
