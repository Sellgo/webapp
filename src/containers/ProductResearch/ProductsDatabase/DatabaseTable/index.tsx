import React from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';

/* Containers */
import ProductTitle from './ProductInformation/ProductTitle';
import ProductDetails from './ProductInformation/ProductDetails';

/* Components */

import RatingWithCountCell from '../../../../components/NewTable/RatingWithCountCell';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import GenericRowCell from '../../../../components/NewTable/GenericRowCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import TablePagination from '../../../../components/NewTable/Pagination';

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
const ProductsDatabaseTable = (props: Props) => {
  const {
    isLoadingProductsDatabase,
    productsDatabaseResults,
    productsDatabasePaginationInfo,
    fetchProductsDatabase,
  } = props;

  // const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);

  const handleChangePage = (pageNo: number) => {
    console.log(pageNo);
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

  /* Row cell, combines product information */
  const ProductInformationCell = ({ rowData, ...props }: any) => {
    return (
      <GenericRowCell {...props}>
        <div className={styles.productInformationCell}>
          <ProductTitle asin={rowData.asin} image={rowData.image} upc={rowData.upc} />
          <ProductDetails
            weight={rowData.weight_lbs}
            fulfillment={rowData.fulfillment}
            title={rowData.title}
            brand={rowData.brand}
            sizeTier={rowData.size_tier || '-'}
            numberOfImages={rowData.image_count}
            packageDimension={rowData.package_dimension}
            storageFee={rowData.storage_fee}
            listingAge={rowData.listing_age_months}
            category={rowData.category}
            variationCount={rowData.variation_count}
          />
        </div>
      </GenericRowCell>
    );
  };

  return (
    <>
      <section className={styles.productDatabaseWrapper}>
        <Table
          loading={isLoadingProductsDatabase}
          affixHorizontalScrollbar={0}
          data={productsDatabaseResults}
          hover={false}
          autoHeight
          rowHeight={280}
          headerHeight={55}
          onSortColumn={handleSortColumn}
          sortType={sortType}
          sortColumn={sortColumn}
          id="productDatabaseTable"
        >
          <Table.Column width={600} verticalAlign="middle" fixed flexGrow={1} align="center">
            <Table.HeaderCell>Product Information</Table.HeaderCell>
            <ProductInformationCell dataKey="productInformation" />
          </Table.Column>

          <Table.Column width={130} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Sellers"
                dataKey="seller_count"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="seller_count" align="left" specialKpi />
          </Table.Column>

          <Table.Column width={130} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Price"
                dataKey="price"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="price" prependWith="$" />
          </Table.Column>

          <Table.Column width={150} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Monthly Sales"
                dataKey="monthly_sales"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="monthly_sales" align="left" />
          </Table.Column>

          <Table.Column width={170} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Monthly Revenue"
                dataKey="monthly_revenue"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="monthly_revenue" prependWith="$" align="left" />
          </Table.Column>

          <Table.Column width={100} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="BSR"
                dataKey="bsr"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="bsr" />
          </Table.Column>

          <Table.Column width={120} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Reviews"
                dataKey="rating"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <RatingWithCountCell dataKey="rating" rowData="rating" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDatabaseTable);
