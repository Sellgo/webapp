import React, { useState } from 'react';
import { Table } from 'rsuite';
import { connect } from 'react-redux';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Constants */
import {
  calculateSellerInventoryTableHeight,
  DEFAULT_PAGES_LIST,
  SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT,
  SELLER_INVENTORY_PRODUCTS_TABLE_UNIQUE_KEY,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Selectors */
import {
  getIsLoadingSellerInventoryProductsTable,
  getSellerInventoryProductsTablePaginationInfo,
  getSellerInventoryProductsTableResults,
} from '../../../../selectors/SellerResearch/SellerInventory';

/* Actions */
import {
  fetchSellerInventoryProductsTableResults,
  setSellerInventoryProductsTableExpandedRow,
} from '../../../../actions/SellerResearch/SellerInventory';

/* Components */
import RatingCell from '../../../../components/NewTable/RatingCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import Pagination from '../../../../components/NewTable/Pagination';
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';

/* Containers */
import ProductInformation from './ProductInformation';
import BuyboxCompetition from './BuyboxCompetition';

/* Interfaces */
import {
  SellerInventoryProductsTablePayload,
  SellerInventoryProductsTablePaginationInfo,
} from '../../../../interfaces/SellerResearch/SellerInventory';

interface Props {
  isLoadingSellerInventoryProductsTable: boolean;
  sellerInventoryProductsTableResults: any;
  sellerInventoryProductsTablePaginationInfo: SellerInventoryProductsTablePaginationInfo;
  fetchSellerInventoryProductsTableResults: (payload: SellerInventoryProductsTablePayload) => void;
  setSellerInventoryProductsTableExpandedRow: (payload: any) => void;
}

const SellerProductsTable = (props: Props) => {
  const {
    isLoadingSellerInventoryProductsTable,
    sellerInventoryProductsTableResults,
    sellerInventoryProductsTablePaginationInfo,
  } = props;

  const [expandedRowKeys, setExpandedRowkeys] = useState<string[]>([]);

  /* Handle pagination */
  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log(pageNo, perPageNo);
  };

  /* Handle expansion logic */
  const handleExpansion = (rowData: any) => {
    const rowId = rowData[SELLER_INVENTORY_PRODUCTS_TABLE_UNIQUE_KEY];
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
    }
  };

  return (
    <section className={styles.sellerProductsTableWrapper}>
      <Table
        loading={isLoadingSellerInventoryProductsTable}
        data={sellerInventoryProductsTableResults}
        height={calculateSellerInventoryTableHeight(
          sellerInventoryProductsTableResults && sellerInventoryProductsTableResults.length,
          0
        )}
        hover={false}
        headerHeight={50}
        rowHeight={SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT}
        id="sellerProductsTable"
        rowKey={SELLER_INVENTORY_PRODUCTS_TABLE_UNIQUE_KEY}
        // Expansion
        rowExpandedHeight={20}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={() => (
          <div>
            <p>This is expanded table</p>
          </div>
        )}
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
        <Table.Column width={130} verticalAlign="top" align="left" flexGrow={4}>
          <Table.HeaderCell>Product Inventory Information</Table.HeaderCell>
          <ProductInformation dataKey="productInformation" />
        </Table.Column>

        {/* Price  */}
        <Table.Column width={130} verticalAlign="top" align="left" flexGrow={1}>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <StatsCell dataKey="current_price" align="center" prependWith="$" />
        </Table.Column>

        {/* Rating L365D */}
        <Table.Column width={130} verticalAlign="top" align="left" flexGrow={1}>
          <Table.HeaderCell>Rating L356D</Table.HeaderCell>
          <RatingCell dataKey="review_stars" />
        </Table.Column>

        {/* Rating % L365D */}
        <Table.Column width={130} verticalAlign="top" align="left" flexGrow={1}>
          <Table.HeaderCell>Rating L356D</Table.HeaderCell>
          <StatsCell dataKey="review_stars" />
        </Table.Column>

        {/* Product Review */}
        <Table.Column width={130} verticalAlign="top" align="left" flexGrow={1}>
          <Table.HeaderCell>Product Review #</Table.HeaderCell>
          <StatsCell dataKey="reviews_count" />
        </Table.Column>
      </Table>

      {sellerInventoryProductsTablePaginationInfo.num_pages > 0 && (
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
      )}
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
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSellerInventoryProductsTableExpandedRow: (payload: any) =>
      dispatch(setSellerInventoryProductsTableExpandedRow(payload)),
    fetchSellerInventoryProductsTableResults: (payload: SellerInventoryProductsTablePayload) => {
      dispatch(fetchSellerInventoryProductsTableResults(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SellerProductsTable);
