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

/* Components */
import RatingWithCountCell from '../../../../components/NewTable/RatingWithCountCell';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import TablePagination from '../../../../components/NewTable/Pagination';
import Placeholder from '../../../../components/Placeholder';

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
    fetchProductsDatabase({
      page: pageNo,
      sort: {
        field: sortColumn,
        by: sortType === 'asc' ? 'ascending' : 'descending',
      },
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
          data={!isLoadingProductsDatabase ? productsDatabaseResults : []}
          hover={true}
          autoHeight
          rowHeight={280}
          headerHeight={55}
          onSortColumn={handleSortColumn}
          sortType={sortType}
          sortColumn={sortColumn}
          id="productDatabaseTable"
        >
          {/* Product Information  */}
          <Table.Column width={600} verticalAlign="middle" fixed align="center" flexGrow={4}>
            <Table.HeaderCell>Product Information</Table.HeaderCell>
            <ProductInformation dataKey="productInformation" />
          </Table.Column>

          {/* # Sellers */}
          <Table.Column
            width={130}
            sortable={!isLoadingProductsDatabase}
            verticalAlign="middle"
            align="center"
            flexGrow={1}
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingProductsDatabase}
                title="Sellers"
                dataKey="seller_count"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="seller_count" align="left" specialKpi />
          </Table.Column>

          {/* Price */}
          <Table.Column
            width={130}
            sortable={!isLoadingProductsDatabase}
            verticalAlign="middle"
            align="center"
            flexGrow={1}
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingProductsDatabase}
                title="Price"
                dataKey="price"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="price" prependWith="$" align="left" />
          </Table.Column>

          {/* Monthly Sales */}
          <Table.Column
            width={150}
            sortable={!isLoadingProductsDatabase}
            verticalAlign="middle"
            align="center"
            flexGrow={1}
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingProductsDatabase}
                title="Monthly Sales"
                dataKey="monthly_sales"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="monthly_sales" align="left" />
          </Table.Column>

          {/* Monthly Revenue */}
          <Table.Column
            width={170}
            sortable={!isLoadingProductsDatabase}
            verticalAlign="middle"
            align="center"
            flexGrow={1}
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingProductsDatabase}
                title="Monthly Revenue"
                dataKey="monthly_revenue"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="monthly_revenue" prependWith="$" align="left" />
          </Table.Column>

          {/* BSR */}
          <Table.Column
            width={100}
            sortable={!isLoadingProductsDatabase}
            verticalAlign="middle"
            align="center"
            flexGrow={1}
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingProductsDatabase}
                title="BSR"
                dataKey="bsr"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="bsr" align="left" />
          </Table.Column>

          {/* Reviews */}
          <Table.Column
            width={120}
            sortable={!isLoadingProductsDatabase}
            verticalAlign="middle"
            align="center"
            flexGrow={1}
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingProductsDatabase}
                title="Reviews"
                dataKey="rating"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <RatingWithCountCell dataKey="rating" rowData="rating" />
          </Table.Column>

          {/* Number of images */}
          <Table.Column
            width={120}
            sortable={!isLoadingProductsDatabase}
            verticalAlign="middle"
            align="center"
            flexGrow={1}
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingProductsDatabase}
                title="Number of Images"
                dataKey="image_count"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="image_count" align="left" />
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
