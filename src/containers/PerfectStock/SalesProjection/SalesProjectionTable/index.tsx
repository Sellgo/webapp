import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Actions */
import { fetchSalesProjection } from '../../../../actions/PerfectStock/SalesProjection';

/* Interfaces */
import { SalesProjectionPayload } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Containers */
import ProductInformation from './ProductInformation';
import SalesEstimationStat from './SalesEstimationStat';
import StockOutDate from './StockOutDate';
import SalesPrediction from './SalesPrediction';
import InventoryThreshold from './InventoryThreshold';
import WeightedAverage from './WeightedAverage';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import Placeholder from '../../../../components/Placeholder';
import {
  getSalesProjectionResults,
  getIsLoadingSalesProjection,
} from '../../../../selectors/PerfectStock/SalesProjection';
import { ReactComponent as ExclaimationIcon } from '../../../../assets/images/exclamation-triangle-solid.svg';
import InboundFulfillableStat from './InboundFulfillableStat';
import SeasonalityAdjustor from './SeasonalityAdjustor';

interface Props {
  // States
  isLoadingSalesProjection: boolean;
  fetchSalesProjection: (payload: SalesProjectionPayload) => void;
  salesProjectionResult: any;
}

/* Main component */
const SalesEstimationTable = (props: Props) => {
  const { fetchSalesProjection, isLoadingSalesProjection, salesProjectionResult } = props;

  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const [expandedRowKeys, setExpandedRowkeys] = React.useState<string[]>([]);

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchSalesProjection({
      sort: sortColumn,
      sortDir: sortType,
    });
  };

  const handleExpansion = (rowData: any) => {
    const rowId = rowData.id;
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
    }
  };

  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          renderLoading={() =>
            isLoadingSalesProjection && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
          }
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          shouldUpdateScroll={false}
          // Dont display old data when loading
          data={!isLoadingSalesProjection ? salesProjectionResult : []}
          hover={false}
          autoHeight
          rowHeight={90}
          headerHeight={55}
          onSortColumn={handleSortColumn}
          sortType={sortType}
          sortColumn={sortColumn}
          rowKey="id"
          virtualized
          id="salesProjectionTable"
        >
          {/* Product Information  */}
          <Table.Column minWidth={400} verticalAlign="middle" fixed align="center" flexGrow={4}>
            <Table.HeaderCell>
              <span className={styles.productHeader}>Product</span>
            </Table.HeaderCell>
            <ProductInformation dataKey="productInformation" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={112} verticalAlign="middle" align="left" fixed sortable>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Days Until\nStock Out`}
                dataKey="merchant_listing__days_until_so"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
                icon={<ExclaimationIcon />}
              />
            </Table.HeaderCell>
            <StockOutDate
              dataKey="merchant_listing__days_until_so"
              handleExpansion={handleExpansion}
            />
          </Table.Column>

          {/* Fulfillable Inventory  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`FBA\nInventory`}
                dataKey="fulfillable_fba"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <InboundFulfillableStat dataKey="fulfillable_fba" />
          </Table.Column>

          {/* Expected Sales  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Expected Sales"
                dataKey="predictive_sales"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                disableSort
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesPrediction dataKey="predictive_sales" />
          </Table.Column>

          {/* Seasonality Adjustor  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Seasonality\nAdjustor`}
                dataKey="seasonality_adjustor"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <SeasonalityAdjustor dataKey="seasonality_adjustor" />
          </Table.Column>

          {/* Inventory Threshold  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Inventory\nThreshold`}
                dataKey="inventory_threshold"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <InventoryThreshold dataKey="inventory_threshold" />
          </Table.Column>

          {/* Inventory Threshold  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Weighted Avg Sales`}
                dataKey="avg_l30d_weight"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <WeightedAverage dataKey="avg_l30d_weight" onChange={handleExpansion} />
          </Table.Column>
          {/* Average Last 90 Day */}
          <Table.Column width={112} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Last 90 Days"
                dataKey="avg_l90d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_l90d" daysOffset={-90} />
          </Table.Column>

          {/* Average Last 61-90 Day */}
          <Table.Column width={112} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Last 61-90 Days"
                dataKey="avg_61d_90d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_61d_90d" daysOffset={-90} secondaryDaysOffset={-61} />
          </Table.Column>

          {/* Average Last 31-60 Day */}
          <Table.Column width={112} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Last 31-60 Days"
                dataKey="avg_31d_60d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_31d_60d" daysOffset={-60} secondaryDaysOffset={-31} />
          </Table.Column>

          {/* Average Last 30 Day */}
          <Table.Column width={112} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Last 30 Days"
                dataKey="avg_l30d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_l30d" daysOffset={-30} />
          </Table.Column>

          {/* Average Last 7 Day */}
          <Table.Column width={112} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Last 7 Days"
                dataKey="avg_l7d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_l7d" daysOffset={-7} />
          </Table.Column>

          {/* Average Next 30 Day */}
          <Table.Column width={112} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Next 30D LY"
                dataKey="avg_n30d_ly"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_n30d_ly" daysOffset={30} />
          </Table.Column>

          {/* Average Next 90 Day */}
          <Table.Column width={112} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Next 90D LY"
                dataKey="avg_n90d_ly"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_n90d_ly" daysOffset={90} />
          </Table.Column>
        </Table>

        {/* {productsDatabasePaginationInfo && productsDatabasePaginationInfo.total_pages > 0 && (
          <footer className={styles.productDatabasePagination}>
            <TablePagination
              totalPages={productsDatabasePaginationInfo.total_pages}
              currentPage={productsDatabasePaginationInfo.current_page}
              showSiblingsCount={3}
              onPageChange={handleChangePage}
            />
          </footer>
        )} */}
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    salesProjectionResult: getSalesProjectionResults(state),
    isLoadingSalesProjection: getIsLoadingSalesProjection(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSalesProjection: (payload: SalesProjectionPayload) =>
      dispatch(fetchSalesProjection(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesEstimationTable);
