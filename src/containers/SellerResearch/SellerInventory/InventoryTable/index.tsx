import React, { useEffect, useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Constants */
import {
  calculateSellerInventoryTableExpandedHeight,
  DEFAULT_PAGES_LIST,
  SELLER_INVENTORY_TABLE_ROW_HEIGHT,
  SELLER_INVENTORY_UNIQUE_KEY,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Selectors */
import {
  getIsLoadingSellerInventoryTable,
  getSellerInventoryProductsTableResults,
  getSellerInventoryProductsTableSellersResults,
  getSellerInventoryTablePaginationInfo,
  getSellerInventoryTableResults,
} from '../../../../selectors/SellerResearch/SellerInventory';

/* Actions */
import {
  fetchSellerInventoryProductsTableResults,
  fetchSellerInventoryTableResults,
  setSellerInventoryTableExpandedRow,
} from '../../../../actions/SellerResearch/SellerInventory';

/* Components */
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import RatingCell from '../../../../components/NewTable/RatingCell';
import Pagination from '../../../../components/NewTable/Pagination';
import BrandsListCell from '../../../../components/NewTable/BrandsListCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import ExtendedReviewsCell from '../../../../components/NewTable/ExtendedReviewsCell';

/* Containers */
import SellerInformation from './SellerInformation';
import ActionsCell from './ActionsCell';
import SellerActions from './SellerActions';

/* Nested Table */
import SellerProductsTable from '../SellerProductsTable';

/* Interfaces */
import {
  SellerInventoryTablePayload,
  SellerInventoryTablePaginationInfo,
  SellerInventoryProductsTablePayload,
} from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  isLoadingSellerInventoryTable: boolean;
  sellerInventoryTableResults: any[];
  sellerInventoryTablePaginationInfo: SellerInventoryTablePaginationInfo;

  sellerInventoryProductsTableResults: any[];
  sellerInventoryProductsTableSellersResults: any[];

  setSellerInventoryTableExpandedRow: (payload: any) => void;

  fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) => void;
  fetchSellerInventoryProductsTable: (payload: SellerInventoryProductsTablePayload) => void;
}

const InventoryTable = (props: Props) => {
  const {
    isLoadingSellerInventoryTable,
    sellerInventoryTableResults,
    sellerInventoryTablePaginationInfo,

    setSellerInventoryTableExpandedRow,
    fetchSellerInventoryTableResults,
    fetchSellerInventoryProductsTable,

    sellerInventoryProductsTableResults,
    sellerInventoryProductsTableSellersResults,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();
  const [expandedRowKeys, setExpandedRowkeys] = useState<string[]>([]);

  useEffect(() => {
    fetchSellerInventoryTableResults({});
  }, []);

  /* Handle Page change*/
  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    fetchSellerInventoryTableResults({ page: pageNo, perPage: perPageNo });
  };

  /* Handle table srt */
  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchSellerInventoryTableResults({ sort: sortColumn, sortDir: sortType });
  };

  /* Handle expansion logic */
  const handleExpansion = (rowData: any) => {
    const rowId = rowData[SELLER_INVENTORY_UNIQUE_KEY];
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      setExpandedRowkeys([rowId]);
      setSellerInventoryTableExpandedRow(rowData);
      fetchSellerInventoryProductsTable({ rowId });
    } else {
      setExpandedRowkeys([]);
      setSellerInventoryTableExpandedRow({});
    }
  };

  return (
    <section className={styles.sellerInventoryTableWrapper}>
      {/* Main table wrapper */}
      <Table
        loading={isLoadingSellerInventoryTable}
        data={sellerInventoryTableResults}
        autoHeight
        hover={false}
        rowHeight={SELLER_INVENTORY_TABLE_ROW_HEIGHT}
        headerHeight={55}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        id="sellerInventoryTable"
        //  Props for table expansion
        rowKey={SELLER_INVENTORY_UNIQUE_KEY}
        rowExpandedHeight={calculateSellerInventoryTableExpandedHeight(
          sellerInventoryProductsTableResults && sellerInventoryProductsTableResults.length,
          sellerInventoryProductsTableSellersResults &&
            sellerInventoryProductsTableSellersResults.length
        )}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={() => <SellerProductsTable />}
      >
        {/* Expand Cell */}
        <Table.Column width={30} verticalAlign="top" fixed align="left">
          <Table.HeaderCell> </Table.HeaderCell>
          <ExpansionCell
            dataKey={SELLER_INVENTORY_UNIQUE_KEY}
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpansion}
          />
        </Table.Column>

        {/* Seller Information */}
        <Table.Column width={650} verticalAlign="top" fixed flexGrow={1}>
          <Table.HeaderCell>Seller Information</Table.HeaderCell>
          <SellerInformation dataKey="seller_information" />
        </Table.Column>

        {/* ASIN */}
        <Table.Column width={150} verticalAlign="top" align="left">
          <Table.HeaderCell>ASIN</Table.HeaderCell>
          <SellerActions dataKey="sellerActions" />
        </Table.Column>

        {/* Brands */}
        <Table.Column width={80} verticalAlign="top" align="center">
          <Table.HeaderCell>Brands</Table.HeaderCell>
          <BrandsListCell dataKey={'brands'} />
        </Table.Column>

        {/* Rating L365D */}
        <Table.Column width={130} verticalAlign="top" sortable align="left">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Rating\nL365D`}
              dataKey="seller_rating"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <RatingCell dataKey="seller_rating" />
        </Table.Column>

        {/* Rating % L365D */}
        <Table.Column width={100} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Rating%\nL365D`}
              dataKey="review_ratings"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="review_ratings" appendWith="%" />
        </Table.Column>

        {/* Review L30D */}
        <Table.Column width={120} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Review\nL30D`}
              dataKey="count_30_days"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ExtendedReviewsCell
            mainReviewKey="count_30_days"
            positiveReviewKey="positive_30_days"
            negativeReviewKey="negative_30_days"
            neutralReviewKey="neutral_30_days"
            dataKey="count_30_days"
          />
        </Table.Column>

        {/* Review L90D */}
        <Table.Column width={120} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Review\nL90D`}
              dataKey="count_90_days"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ExtendedReviewsCell
            mainReviewKey="count_90_days"
            positiveReviewKey="positive_90_days"
            negativeReviewKey="negative_90_days"
            neutralReviewKey="neutral_90_days"
            dataKey="count_90_days"
          />
        </Table.Column>

        {/* Review 3650D */}
        <Table.Column width={120} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Review\nL365D`}
              dataKey="count_12_month"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ExtendedReviewsCell
            mainReviewKey="count_12_month"
            positiveReviewKey="positive_12_month"
            negativeReviewKey="negative_12_month"
            neutralReviewKey="neutral_12_month"
            dataKey="count_12_month"
          />
        </Table.Column>

        {/* Review Lifetime */}
        <Table.Column width={120} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Review\nLifetime`}
              dataKey="count_lifetime"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ExtendedReviewsCell
            mainReviewKey="count_lifetime"
            positiveReviewKey="positive_lifetime"
            negativeReviewKey="negative_lifetime"
            neutralReviewKey="neutral_lifetime"
            dataKey="count_lifetime"
          />
        </Table.Column>

        {/* Actions Cell */}
        <Table.Column width={40} verticalAlign="top" fixed align="left">
          <Table.HeaderCell>{''}</Table.HeaderCell>
          <ActionsCell dataKey={SELLER_INVENTORY_UNIQUE_KEY} />
        </Table.Column>
      </Table>

      {/* Pagination */}
      {sellerInventoryTablePaginationInfo && sellerInventoryTablePaginationInfo.total_pages > 0 && (
        <footer className={styles.sellerInventoryPaginationContainer}>
          <Pagination
            totalPages={sellerInventoryTablePaginationInfo.total_pages}
            currentPage={sellerInventoryTablePaginationInfo.current_page}
            onPageChange={handlePageChange}
            showSiblingsCount={3}
            showPerPage={true}
            perPage={sellerInventoryTablePaginationInfo.per_page}
            perPageList={DEFAULT_PAGES_LIST}
          />
        </footer>
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellerInventoryTable: getIsLoadingSellerInventoryTable(state),
    sellerInventoryTableResults: getSellerInventoryTableResults(state),
    sellerInventoryTablePaginationInfo: getSellerInventoryTablePaginationInfo(state),

    sellerInventoryProductsTableResults: getSellerInventoryProductsTableResults(state),
    sellerInventoryProductsTableSellersResults: getSellerInventoryProductsTableSellersResults(
      state
    ),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSellerInventoryTableExpandedRow: (payload: any) =>
      dispatch(setSellerInventoryTableExpandedRow(payload)),
    fetchSellerInventoryTableResults: (payload: SellerInventoryTablePayload) =>
      dispatch(fetchSellerInventoryTableResults(payload)),
    fetchSellerInventoryProductsTable: (payload: SellerInventoryProductsTablePayload) =>
      dispatch(fetchSellerInventoryProductsTableResults(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryTable);
