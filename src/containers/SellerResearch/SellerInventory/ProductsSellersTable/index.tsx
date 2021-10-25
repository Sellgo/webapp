import React, { useEffect } from 'react';
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
  SELLER_INVENTORY_PRODUCTS_SELLERS_TABLE_UNIQUE_KEY,
  SELLER_INVENTORY_PRODUCTS_TABLE_SELLER_ROW_HEIGHT,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Components */
import StatsCell from '../../../../components/NewTable/StatsCell';
import RatingCell from '../../../../components/NewTable/RatingCell';
import BrandsListCell from '../../../../components/NewTable/BrandsListCell';

/* Containers */
import SellerInformation from './SellerInformation';
import TrackSeller from './TrackSeller';

/* Interfaces */
import {
  SellerInventoryProductsTableSellersPaginationInfo,
  SellerInventoryProductsTableSellersPayload,
} from '../../../../interfaces/SellerResearch/SellerInventory';
import CopyAndLocateClipboard from '../../../../components/CopyAndLocateClipboard';

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

  /* Custom scroll logic */
  const handleCustomTableScroll = (e: any) => {
    const verticalScrollRef = document.querySelector(
      '#sellerInventoryTable  #sellerProductsTable #productsSellersTable  .rs-table-body-wheel-area'
    );

    if (verticalScrollRef) {
      const newScrollY = verticalScrollRef.scrollTop + e.deltaY;
      verticalScrollRef.scrollTo({
        top: newScrollY,
        behavior: 'auto',
      });
    }
  };

  /* Need to overide the custom scroll behavior on mount */
  useEffect(() => {
    const bodyWheelArea = document.querySelector(
      '#sellerInventoryTable  #sellerProductsTable  .rs-table-body-wheel-area'
    );

    if (bodyWheelArea) {
      bodyWheelArea.addEventListener('wheel', handleCustomTableScroll);
    }

    return () => {
      // run cleanup
      if (bodyWheelArea) {
        bodyWheelArea.removeEventListener('wheel', handleCustomTableScroll);
      }
    };
  }, []);

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
        <Table.Column verticalAlign="middle" align="left" flexGrow={3}>
          <Table.HeaderCell>Seller Name</Table.HeaderCell>
          <SellerInformation dataKey="sellerInformation" />
        </Table.Column>

        {/* Seller ID */}
        <Table.Column width={130} verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Seller ID</Table.HeaderCell>
          <Table.Cell>
            {(rowData: any) => {
              const sellerLink = `https://www.amazon.com/sp?seller=${rowData.merchant_id}`;
              return <CopyAndLocateClipboard data={rowData.merchant_id} link={sellerLink} />;
            }}
          </Table.Cell>
        </Table.Column>

        {/* Brands */}
        <Table.Column width={130} verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Brands</Table.HeaderCell>
          <BrandsListCell dataKey="brands" />
        </Table.Column>

        {/* Rating L365D*/}
        <Table.Column width={130} verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Rating L365D</Table.HeaderCell>
          <RatingCell dataKey="seller_rating" />
        </Table.Column>

        {/* Ratings % */}
        <Table.Column width={130} verticalAlign="middle" align="left" flexGrow={1}>
          <Table.HeaderCell>Rating % L365D</Table.HeaderCell>
          <StatsCell dataKey="review_ratings" appendWith="%" />
        </Table.Column>

        {/* Track Seller */}
        <Table.Column width={180} verticalAlign="top" align="left">
          <Table.HeaderCell></Table.HeaderCell>
          <TrackSeller dataKey="trackSeller" />
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
