import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Actions */
import { fetchTpl } from '../../../../actions/PerfectStock/Tpl';

/* Interfaces */
import { SalesProjectionPayload } from '../../../../interfaces/PerfectStock/SalesProjection';

/* Containers */
import ProductInformation from './ProductInformation';
import SalesPrediction from './SalesPrediction';
import InventoryThreshold from './InventoryThreshold';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import Placeholder from '../../../../components/Placeholder';
import {
  getSalesProjectionResults,
  getIsLoadingSalesProjection,
} from '../../../../selectors/PerfectStock/SalesProjection';
import MultipleStatBox from './MultipleStatBox';

interface Props {
  // States
  isLoadingSalesProjection: boolean;
  fetchTpl: (payload: SalesProjectionPayload) => void;
  salesProjectionResult: any;
}

/* Main component */
const TplTable = (props: Props) => {
  const { fetchTpl, isLoadingSalesProjection, salesProjectionResult } = props;

  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchTpl({
      sort: sortColumn,
      sortDir: sortType,
    });
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
          // Dont display old data when loading
          data={!isLoadingSalesProjection ? salesProjectionResult : []}
          hover={false}
          autoHeight
          rowHeight={90}
          headerHeight={55}
          onSortColumn={handleSortColumn}
          sortType={sortType}
          sortColumn={sortColumn}
          rowExpandedHeight={800}
          rowKey="id"
          virtualized
          id="tplTable"
        >
          {/* Product Information  */}
          <Table.Column minWidth={400} verticalAlign="middle" fixed align="center" flexGrow={4}>
            <Table.HeaderCell>
              <span className={styles.productHeader}>Product</span>
            </Table.HeaderCell>
            <ProductInformation dataKey="productInformation" />
          </Table.Column>

          {/* Expected Sales  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Schedule to\nSend In`}
                dataKey="predictive_sales"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                disableSort
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesPrediction dataKey="predictive_sales" />
          </Table.Column>

          {/* Inventory Threshold  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Automate FBA \n Shipping Plan`}
                dataKey="inventory_threshold"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <InventoryThreshold dataKey="inventory_threshold" />
          </Table.Column>

          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Days of Inventory`}
                dataKey="inventory_threshold"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <InventoryThreshold dataKey="inventory_threshold" />
          </Table.Column>
          {/* Sales  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Sales`}
                dataKey="sales"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <MultipleStatBox
              displayData={[
                {
                  title: 'Total L7D',
                  dataKey: 'fulfillable_fba',
                },
                {
                  title: 'Daily L7D',
                  dataKey: 'daily_l7d',
                },
                {
                  title: 'Forecast',
                  dataKey: 'forecast',
                },
              ]}
              dataKey="fulfillable_fba"
            />
          </Table.Column>

          {/* FBA Inbound  */}
          <Table.Column width={112} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`FBA Inbound`}
                dataKey="sales"
                currentSortColumn={''}
                currentSortType={undefined}
                alignMiddle
                disableSort
              />
            </Table.HeaderCell>
            <MultipleStatBox
              displayData={[
                {
                  title: 'Working',
                  dataKey: 'fulfillable_fba',
                },
                {
                  title: 'Shipped',
                  dataKey: 'daily_l7d',
                },
                {
                  title: 'Receiving',
                  dataKey: 'forecast',
                },
                {
                  title: 'Transfer',
                  dataKey: 'forecast',
                },
              ]}
              dataKey="fulfillable_fba"
            />
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
    fetchTpl: (payload: SalesProjectionPayload) => dispatch(fetchTpl(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TplTable);
