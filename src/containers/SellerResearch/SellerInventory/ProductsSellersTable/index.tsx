import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';

/* Styling */
import './globals.scss';
import styles from './index.module.scss';

/* Selectors */
import {
  getIsLoadingSellerInventoryProductsTableSellers,
  getSellerInventoryProductsTableSellersPaginationInfo,
  getSellerInventoryProductsTableSellersResults,
} from '../../../../selectors/SellerResearch/SellerInventory';

/* Actions */
import { fetchSellerInventoryProductsTableSellers } from '../../../../actions/SellerResearch/SellerInventory';

/* Constants */
import {
  calculateSellerInventorySellersTableHeight,
  // DEFAULT_PAGES_LIST,
  SELLER_INVENTORY_PRODUCTS_SELLERS_TABLE_UNIQUE_KEY,
  SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Components */
import StatsCell from '../../../../components/NewTable/StatsCell';
// import Pagination from '../../../../components/NewTable/Pagination';

/* Containers */
import SellerInformation from './SellerInformation';

/* Interfaces */
import {
  SellerInventoryProductsTableSellersPaginationInfo,
  SellerInventoryProductsTableSellersPayload,
} from '../../../../interfaces/SellerResearch/SellerInventory';
import RatingCell from '../../../../components/NewTable/RatingCell';
import BrandsListCell from '../../../../components/NewTable/BrandsListCell';

interface Props {
  isLoadingSellerInventoryProductsSellers: boolean;
  sellerInventoryProductsTableSellersResults: any;
  sellerInventoryProductsTableSellersPaginationInfo: SellerInventoryProductsTableSellersPaginationInfo;

  fetchSellerInventoryProductsTableSellers: (
    payload: SellerInventoryProductsTableSellersPayload
  ) => void;
}

const ProductsSellersTable = (props: Props) => {
  const {
    isLoadingSellerInventoryProductsSellers,
    sellerInventoryProductsTableSellersResults,
    // sellerInventoryProductsTableSellersPaginationInfo,
  } = props;

  // /* Handle pagination */
  // const handlePageChange = (pageNo: number, perPageNo?: number) => {
  //   console.log(pageNo, perPageNo);
  // };

  return (
    <section className={styles.productsSellersTableWrapper}>
      <Table
        loading={isLoadingSellerInventoryProductsSellers}
        data={sellerInventoryProductsTableSellersResults}
        height={calculateSellerInventorySellersTableHeight(
          sellerInventoryProductsTableSellersResults &&
            sellerInventoryProductsTableSellersResults.length
        )}
        hover={false}
        headerHeight={50}
        rowHeight={SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT}
        id="productsSellersTable"
        rowKey={SELLER_INVENTORY_PRODUCTS_SELLERS_TABLE_UNIQUE_KEY}
      >
        {/* Seller Name */}
        <Table.Column verticalAlign="middle" align="left" flexGrow={4}>
          <Table.HeaderCell>Seller Name</Table.HeaderCell>
          <SellerInformation dataKey="sellerInformation" />
        </Table.Column>

        {/* Brands */}
        <Table.Column verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Brands</Table.HeaderCell>
          <BrandsListCell dataKey="brands" />
        </Table.Column>

        {/* Rating L365D*/}
        <Table.Column verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Rating L365D</Table.HeaderCell>
          <RatingCell dataKey="seller_rating" />
        </Table.Column>

        {/* Ratings Percentage */}
        <Table.Column verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Rating % L365D</Table.HeaderCell>
          <StatsCell dataKey="review_ratings" appendWith="%" />
        </Table.Column>
      </Table>

      {/* Table Pagination */}
      {/* {sellerInventoryProductsTableSellersPaginationInfo.total_pages > 0 && (
        <footer className={styles.sellerTablePagination}>
          <Pagination
            totalPages={sellerInventoryProductsTableSellersPaginationInfo.total_pages}
            currentPage={sellerInventoryProductsTableSellersPaginationInfo.current_page}
            onPageChange={handlePageChange}
            showSiblingsCount={3}
            showPerPage={true}
            perPage={sellerInventoryProductsTableSellersPaginationInfo.per_page}
            perPageList={DEFAULT_PAGES_LIST}
          />
        </footer>
      )} */}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellerInventoryProductsSellers: getIsLoadingSellerInventoryProductsTableSellers(state),
    sellerInventoryProductsTableSellersResults: getSellerInventoryProductsTableSellersResults(
      state
    ),
    sellerInventoryProductsTableSellersPaginationInfo: getSellerInventoryProductsTableSellersPaginationInfo(
      state
    ),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchSellerInventoryProductsTableSellers: (
      payload: SellerInventoryProductsTableSellersPayload
    ) => dispatch(fetchSellerInventoryProductsTableSellers(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsSellersTable);
