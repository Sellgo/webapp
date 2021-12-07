import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';
import styles from './index.module.scss';

/* Selectors  */
import {
  getIsLoadingProductsDatabase,
  getProductsDatabasePaginationInfo,
  getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';

/* Interfaces */
import {
  ProductsDatabasePayload,
  ProductsDatabaseRow,
} from '../../../../interfaces/ProductResearch/ProductsDatabase';

/* Actions */
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Containers */
import ProductInformation from './ProductInformation';
import SalesEstimationStat from './SalesEstimationStat';
import StockOutDate from './StockOutDate';
import SalesPrediction from './SalesPrediction';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import TablePagination from '../../../../components/NewTable/Pagination';
import Placeholder from '../../../../components/Placeholder';

const DATA = [
  {
    asin: 'B074JZJQJT',
    title: 'Shoe',
    brand: 'Nike',
    days_until_so: 777,
    predictive_sales: 236,
    image: 'https://images-na.ssl-images-amazon.com/images/I/61-h0kmKGYL._SL75_.jpg',
    sku_name: 'sku name',
    active: 'active',
    size_tier: 'Large',
    monthly_revenue: '$1,000,000',
    price: '$100',
    avg_l90d: 35.6,
    avg_l90d_weight: 12.3,
    avg_l90d_included: false,
    avg_l30d: 35.6,
    avg_l30d_weight: 0,
    avg_l30d_included: false,
    avg_l7d: 35.6,
    avg_l7d_weight: 0,
    avg_l7d_included: true,
    avg_n30d: 35.6,
    avg_n30d_weight: 0,
    avg_n30d_included: true,
    avg_n90d: 35.6,
    avg_n90d_weight: 0,
    avg_n90d_included: true,
  },
];

interface Props {
  // States
  isLoadingProductsDatabase: boolean;
  productsDatabaseResults: ProductsDatabaseRow[];
  productsDatabasePaginationInfo: {
    current_page: number;
    total_pages: number;
  };

  /* Actions */
  fetchProductsDatabase: (payload: ProductsDatabasePayload) => void;
}

/* Main component */
const SalesEstimationTable = (props: Props) => {
  const {
    isLoadingProductsDatabase,
    productsDatabasePaginationInfo,
    fetchProductsDatabase,
  } = props;

  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);

  const handleChangePage = (pageNo: number) => {
    fetchProductsDatabase({
      page: pageNo,
    });
  };

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchProductsDatabase({
      sort: {
        field: sortColumn,
        by: sortType === 'asc' ? 'ascending' : 'descending',
      },
    });
  };

  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          renderLoading={() =>
            isLoadingProductsDatabase && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
          }
          renderEmpty={() => <div />}
          affixHorizontalScrollbar={0}
          // Dont display old data when loading
          data={DATA}
          hover={true}
          autoHeight
          rowHeight={120}
          headerHeight={55}
          onSortColumn={handleSortColumn}
          sortType={sortType}
          sortColumn={sortColumn}
          id="salesEstimationTable"
        >
          {/* Product Information  */}
          <Table.Column minWidth={400} verticalAlign="middle" fixed align="center" flexGrow={4}>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <ProductInformation dataKey="productInformation" />
          </Table.Column>

          {/* Stock out date info  */}
          <Table.Column width={150} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Days Until Stock Out"
                dataKey="days_until_so"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <StockOutDate dataKey="days_until_so" />
          </Table.Column>

          {/* Expected Sales  */}
          <Table.Column width={250} verticalAlign="middle" align="center">
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

          {/* Average Last 90 Day */}
          <Table.Column width={120} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Last 90 Day"
                dataKey="avg_l90d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_l90d" />
          </Table.Column>

          {/* Average Last 30 Day */}
          <Table.Column width={120} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Last 30 Day"
                dataKey="avg_l30d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_l30d" />
          </Table.Column>

          {/* Average Last 7 Day */}
          <Table.Column width={120} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Last 7 Day"
                dataKey="avg_l7d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_l7d" />
          </Table.Column>

          {/* Average Next 30 Day */}
          <Table.Column width={120} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Next 30D LY"
                dataKey="avg_n7d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_n30d" />
          </Table.Column>

          {/* Average Next 90 Day */}
          <Table.Column width={120} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Average Next 90D LY"
                dataKey="avg_n90d"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                alignMiddle
              />
            </Table.HeaderCell>
            <SalesEstimationStat dataKey="avg_n90d" />
          </Table.Column>
        </Table>

        {productsDatabasePaginationInfo && productsDatabasePaginationInfo.total_pages > 0 && (
          <footer className={styles.productDatabasePagination}>
            <TablePagination
              totalPages={productsDatabasePaginationInfo.total_pages}
              currentPage={productsDatabasePaginationInfo.current_page}
              showSiblingsCount={3}
              onPageChange={handleChangePage}
            />
          </footer>
        )}
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    productsDatabaseResults: getProductsDatabaseResults(state),
    productsDatabasePaginationInfo: getProductsDatabasePaginationInfo(state),
    isLoadingProductsDatabase: getIsLoadingProductsDatabase(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchProductsDatabase: (payload: ProductsDatabasePayload) =>
      dispatch(fetchProductsDatabase(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesEstimationTable);
