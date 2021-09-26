import React, { useState, useEffect } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Constants */
import {
  calculateProductsTableExpandedHeight,
  calculateProductsTableHeight,
  // DEFAULT_PAGES_LIST,
  SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT,
  SELLER_INVENTORY_PRODUCTS_TABLE_UNIQUE_KEY,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Selectors */
import {
  getIsLoadingSellerInventoryProductsTable,
  getSellerInventoryProductsTablePaginationInfo,
  getSellerInventoryProductsTableResults,
  getSellerInventoryProductsTableSellersResults,
} from '../../../../selectors/SellerResearch/SellerInventory';

/* Actions */
import {
  fetchSellerInventoryProductsTableResults,
  fetchSellerInventoryProductsTableSellers,
  setSellerInventoryProductsTableExpandedRow,
} from '../../../../actions/SellerResearch/SellerInventory';

/* Components */
import RatingCell from '../../../../components/NewTable/RatingCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
// import Pagination from '../../../../components/NewTable/Pagination';
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';

/* Containers */
import ProductInformation from './ProductInformation';
import BuyboxCompetition from './BuyboxCompetition';

/* Interfaces */
import {
  SellerInventoryProductsTablePayload,
  SellerInventoryProductsTablePaginationInfo,
  SellerInventoryProductsTableSellersPayload,
} from '../../../../interfaces/SellerResearch/SellerInventory';
import ProductsSellersTable from '../ProductsSellersTable';
import TrackProduct from './TrackProduct';
import ProductsExport from './ProductsExport';

interface Props {
  isLoadingSellerInventoryProductsTable: boolean;
  sellerInventoryProductsTableResults: any[];
  sellerInventoryProductsTablePaginationInfo: SellerInventoryProductsTablePaginationInfo;

  fetchSellerInventoryProductsTableResults: (payload: SellerInventoryProductsTablePayload) => void;
  setSellerInventoryProductsTableExpandedRow: (payload: any) => void;

  fetchSellerInventoryProductsTableSellers: (
    payload: SellerInventoryProductsTableSellersPayload
  ) => void;

  sellerInventoryProductsTableSellersResults: any[];
}

const SellerProductsTable = (props: Props) => {
  const {
    isLoadingSellerInventoryProductsTable,
    sellerInventoryProductsTableResults,
    // sellerInventoryProductsTablePaginationInfo,
    setSellerInventoryProductsTableExpandedRow,

    fetchSellerInventoryProductsTableSellers,
    sellerInventoryProductsTableSellersResults,
  } = props;

  const [expandedRowKeys, setExpandedRowkeys] = useState<string[]>([]);

  // /* Handle pagination */
  // const handlePageChange = (pageNo: number, perPageNo?: number) => {
  //   console.log(pageNo, perPageNo);
  // };

  /* Handle expansion logic */
  const handleExpansion = (rowData: any) => {
    const rowId = rowData[SELLER_INVENTORY_PRODUCTS_TABLE_UNIQUE_KEY];
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      setExpandedRowkeys([rowId]);
      setSellerInventoryProductsTableExpandedRow(rowData);
      fetchSellerInventoryProductsTableSellers({ parentAsin: rowData.asin });
    } else {
      setExpandedRowkeys([]);
      setSellerInventoryProductsTableExpandedRow({});
    }
  };

  /* Custom scroll logic */
  const handleCustomTableScroll = (e: any) => {
    const verticalScrollRef = document.querySelector(
      '#sellerInventoryTable  #sellerProductsTable  .rs-table-body-wheel-area'
    );

    const bodyWheelAreaForChildTable = document.querySelector(
      '#sellerInventoryTable  #sellerProductsTable #productsSellersTable  .rs-table-body-wheel-area'
    );

    // 🔥 (gotta love this logic if no bugs are found- pushing scrollbar here to limits)
    // scroll the table only when child is not open
    // if child is oprn scroll only child
    if (verticalScrollRef && !bodyWheelAreaForChildTable) {
      const newScrollY = verticalScrollRef.scrollTop + e.deltaY;
      verticalScrollRef.scrollTo({
        top: newScrollY,
        behavior: 'auto',
      });
    }
  };

  /* Need to overide the custom scroll behavior on mount */
  useEffect(() => {
    // way to be specific 🤣
    const bodyWheelArea = document.querySelector(
      '#sellerInventoryTable  #sellerProductsTable  .rs-table-body-wheel-area'
    );

    if (bodyWheelArea) {
      bodyWheelArea.addEventListener('wheel', handleCustomTableScroll);
    }

    return () => {
      // run cleanup
      if (bodyWheelArea) {
        bodyWheelArea.addEventListener('wheel', handleCustomTableScroll);
      }
    };
  }, []);

  return (
    <section className={styles.sellerProductsTableWrapper}>
      {/* Export seller products */}
      <ProductsExport />

      {/* Products Table */}
      <Table
        loading={isLoadingSellerInventoryProductsTable}
        data={sellerInventoryProductsTableResults}
        height={calculateProductsTableHeight(
          sellerInventoryProductsTableResults && sellerInventoryProductsTableResults.length,
          sellerInventoryProductsTableSellersResults &&
            sellerInventoryProductsTableSellersResults.length
        )}
        hover={false}
        headerHeight={50}
        rowHeight={SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT}
        id="sellerProductsTable"
        rowKey={SELLER_INVENTORY_PRODUCTS_TABLE_UNIQUE_KEY}
        // Expansion
        rowExpandedHeight={calculateProductsTableExpandedHeight(
          sellerInventoryProductsTableSellersResults &&
            sellerInventoryProductsTableSellersResults.length
        )}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={() => <ProductsSellersTable />}
      >
        {/* Expand Cell */}
        <Table.Column width={30} verticalAlign="top" fixed align="left">
          <Table.HeaderCell></Table.HeaderCell>
          <ExpansionCell
            dataKey={SELLER_INVENTORY_PRODUCTS_TABLE_UNIQUE_KEY}
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpansion}
          />
        </Table.Column>

        {/* Buy box Competition */}
        <Table.Column width={100} verticalAlign="top" align="left">
          <Table.HeaderCell>
            Buybox <br /> Competition
          </Table.HeaderCell>
          <BuyboxCompetition dataKey="buyboxCompetition" />
        </Table.Column>

        {/* Product Information  */}
        <Table.Column width={130} verticalAlign="top" align="left" flexGrow={1}>
          <Table.HeaderCell>Product Inventory Information</Table.HeaderCell>
          <ProductInformation dataKey="productInformation" />
        </Table.Column>

        {/* Price  */}
        <Table.Column width={130} verticalAlign="top" align="left">
          <Table.HeaderCell>Price</Table.HeaderCell>
          <StatsCell dataKey="current_price" align="center" prependWith="$" />
        </Table.Column>

        {/* Rating L365D */}
        <Table.Column width={130} verticalAlign="top" align="left">
          <Table.HeaderCell>Rating L356D</Table.HeaderCell>
          <RatingCell dataKey="review_stars" />
        </Table.Column>

        {/* Rating % L365D */}
        <Table.Column width={130} verticalAlign="top" align="left">
          <Table.HeaderCell>Rating L356D</Table.HeaderCell>
          <StatsCell dataKey="review_stars" />
        </Table.Column>

        {/* Product Review */}
        <Table.Column width={130} verticalAlign="top" align="left">
          <Table.HeaderCell>Product Review #</Table.HeaderCell>
          <StatsCell dataKey="reviews_count" />
        </Table.Column>

        {/* Track Product */}
        <Table.Column width={180} verticalAlign="top" align="left">
          <Table.HeaderCell></Table.HeaderCell>
          <TrackProduct dataKey="trackProduct" />
        </Table.Column>
      </Table>

      {/* {sellerInventoryProductsTablePaginationInfo &&
        sellerInventoryProductsTablePaginationInfo.num_pages > 0 && (
          <footer className={styles.sellerProductsTablePagination}>
            <Pagination
              totalPages={sellerInventoryProductsTablePaginationInfo.num_pages}
              currentPage={1}
              onPageChange={handlePageChange}
              showSiblingsCount={3}
              showPerPage={true}
              perPage={sellerInventoryProductsTablePaginationInfo.per_page}
              perPageList={DEFAULT_PAGES_LIST}
            />
          </footer>
        )} */}
    </section>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellerInventoryProductsTable: getIsLoadingSellerInventoryProductsTable(state),
    sellerInventoryProductsTableResults: getSellerInventoryProductsTableResults(state),
    sellerInventoryProductsTablePaginationInfo: getSellerInventoryProductsTablePaginationInfo(
      state
    ),
    sellerInventoryProductsTableSellersResults: getSellerInventoryProductsTableSellersResults(
      state
    ),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSellerInventoryProductsTableExpandedRow: (payload: any) =>
      dispatch(setSellerInventoryProductsTableExpandedRow(payload)),
    fetchSellerInventoryProductsTableResults: (payload: SellerInventoryProductsTablePayload) => {
      dispatch(fetchSellerInventoryProductsTableResults(payload));
    },
    fetchSellerInventoryProductsTableSellers: (
      payload: SellerInventoryProductsTableSellersPayload
    ) => {
      dispatch(fetchSellerInventoryProductsTableSellers(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerProductsTable);
