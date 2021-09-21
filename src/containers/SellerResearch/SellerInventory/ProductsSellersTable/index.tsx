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
  DEFAULT_PAGES_LIST,
  SELLER_INVENTORY_PRODUCTS_SELLERS_TABLE_UNIQUE_KEY,
  SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Components */
import StatsCell from '../../../../components/NewTable/StatsCell';
import Pagination from '../../../../components/NewTable/Pagination';

/* Interfaces */
import {
  SellerInventoryProductsTableSellersPaginationInfo,
  SellerInventoryProductsTableSellersPayload,
} from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  isLoadingSellerInventoryProductsSellers: boolean;
  sellerInventoryProductsTableSellers: any;
  sellerInventoryProductsTableSellersPaginationInfo: SellerInventoryProductsTableSellersPaginationInfo;

  fetchSellerInventoryProductsTableSellers: (
    payload: SellerInventoryProductsTableSellersPayload
  ) => void;
}

const ProductsSellersTable = (props: Props) => {
  const {
    isLoadingSellerInventoryProductsSellers,
    sellerInventoryProductsTableSellers,
    sellerInventoryProductsTableSellersPaginationInfo,
  } = props;

  /* Handle pagination */
  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log(pageNo, perPageNo);
  };

  return (
    <section className={styles.productsSellersTableWrapper}>
      <Table
        loading={isLoadingSellerInventoryProductsSellers}
        data={sellerInventoryProductsTableSellers}
        height={200}
        hover={false}
        headerHeight={50}
        rowHeight={SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT}
        id="productsSellersTable"
        rowKey={SELLER_INVENTORY_PRODUCTS_SELLERS_TABLE_UNIQUE_KEY}
      >
        {/* Price */}
        <Table.Column verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <StatsCell dataKey="fba_count" align="center" />
        </Table.Column>

        {/* Price */}
        <Table.Column verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <StatsCell dataKey="fba_count" align="center" />
        </Table.Column>

        {/* Price */}
        <Table.Column verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <StatsCell dataKey="fba_count" align="center" />
        </Table.Column>

        {/* Price */}
        <Table.Column verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <StatsCell dataKey="fba_count" align="center" />
        </Table.Column>
      </Table>

      {/* Table Pagination */}
      {sellerInventoryProductsTableSellersPaginationInfo.total_pages > 0 && (
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
      )}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellerInventoryProductsSellers: getIsLoadingSellerInventoryProductsTableSellers(state),
    sellerInventoryProductsTableSellers: getSellerInventoryProductsTableSellersResults(state),
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
