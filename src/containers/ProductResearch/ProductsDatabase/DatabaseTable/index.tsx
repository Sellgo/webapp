import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';

/* Components */
import ProductTitle from './ProductInformation/ProductTitle';
import ProductDetails from './ProductInformation/ProductDetails';
import PricingCell from '../../../../components/NewTable/PricingCell';
import RatingWithCountCell from '../../../../components/NewTable/RatingWithCountCell';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import GenericRowCell from '../../../../components/NewTable/GenericRowCell';
import TablePagination from '../../../../components/NewTable/Pagination';
import BSRCell from '../../../../components/NewTable/BSRCell';
import NumberCell from '../../../../components/NewTable/NumberCell';

/* Table */
import {
  getIsLoadingProductsDatabase,
  getProductsDatabasePaginationInfo,
  getProductsDatabaseResults,
} from '../../../../selectors/ProductResearch/ProductsDatabase';
import { connect } from 'react-redux';
import {
  ProductsDatabasePayload,
  ProductsDatabaseRow,
} from '../../../../interfaces/ProductResearch/ProductsDatabase';
import { fetchProductsDatabase } from '../../../../actions/ProductsResearch/ProductsDatabase';

/* Constants */
import { SMALL_WIDTH, BIG_WIDTH, CENTER_ALIGN_SETTINGS } from '../../../../constants/Table';

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

  // /* Handler, selects one row, used in CheckboxCell */
  // const handleSelect = (rowData: any, checked: boolean) => {
  //   const currentRowASIN = rowData.asin;
  //   let newSelectedRows;
  //   if (checked) {
  //     newSelectedRows = selectedRows.filter(rowASIN => rowASIN !== currentRowASIN);
  //     newSelectedRows.push(currentRowASIN);
  //   } else {
  //     newSelectedRows = selectedRows.filter(rowASIN => rowASIN !== currentRowASIN);
  //   }
  //   setSelectedRows(newSelectedRows);
  // };

  // /* Handler, selects all rows */
  // const handleSelectAll = (e: any, data: any) => {
  //   const allSelectedRows: string[] = [];
  //   if (data.checked) {
  //     productsDatabaseResults.map(row => allSelectedRows.push(row.asin));
  //   }
  //   setSelectedRows(allSelectedRows);
  // };

  // /* Row cell, Cell with checkbox to select row */
  // const CheckboxCell = ({ rowData, ...props }: any) => {
  //   return (
  //     <GenericRowCell {...props}>
  //       <Checkbox
  //         label=""
  //         onChange={(e: any, data: any) => {
  //           handleSelect(rowData, data.checked);
  //         }}
  //         checked={selectedRows.includes(rowData.asin)}
  //       />
  //     </GenericRowCell>
  //   );
  // };

  /* Row cell, combines product information */
  const ProductInformationCell = ({ rowData, ...props }: any) => {
    return (
      <GenericRowCell {...props}>
        <div className={styles.productInformationCell}>
          <ProductTitle
            asin={rowData.asin}
            image={rowData.image}
            upc={rowData.upc}
            isAmazonsChoice={rowData.amazonsChoice}
            isBestSeller={rowData.bestSeller}
          />
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

  /* Row cell */
  // const ActionCell = ({ rowData, ...props }: any) => (
  //   <GenericRowCell {...props}>
  //     <Popup
  //       /* Ellipsis icon */
  //       trigger={
  //         <button className={styles.ellipsisButton}>
  //           <Icon name="ellipsis vertical" size="small" />
  //         </button>
  //       }
  //       /* Ellipsis popup content */
  //       content={
  //         <span>
  //           <div className={styles.actionPopupRow}>
  //             <Icon name="external alternate" size="small" />
  //             <a
  //               href={`http://amazon.com/dp/${rowData.asin}`}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className={styles.actionPopupText}
  //             >
  //               View on Amazon
  //             </a>
  //           </div>
  //           <div className={styles.actionPopupRow}>
  //             <Icon name="download" size="small" />
  //             <p className={styles.actionPopupText}> Export </p>
  //           </div>
  //         </span>
  //       }
  //       on="click"
  //       position="top right"
  //       offset={5}
  //     />
  //   </GenericRowCell>
  // );

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
          {/* <Table.Column width={35} fixed {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell>
              <div className={styles.headerSelectRow}>
                <Checkbox
                  label=""
                  onChange={handleSelectAll}
                  checked={Boolean(
                    !isLoadingProductsDatabase &&
                      productsDatabaseResults.length &&
                      selectedRows.length === productsDatabaseResults.length
                  )}
                />
                <div className={styles.headerSelectIcon}>
                  <Icon name="ellipsis vertical" size="small" style={{ cursor: 'pointer' }} />
                </div>
              </div>
            </Table.HeaderCell>
            <CheckboxCell dataKey="checkbox" />
          </Table.Column> */}

          <Table.Column width={BIG_WIDTH} verticalAlign="middle" fixed>
            <Table.HeaderCell>Product Information</Table.HeaderCell>
            <ProductInformationCell dataKey="productInformation" />
          </Table.Column>

          <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell>
              <HeaderSortCell
                title="Sellers"
                dataKey="seller_count"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <NumberCell dataKey="seller_count" />
          </Table.Column>

          <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell>
              <HeaderSortCell
                title="Price"
                dataKey="price"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <PricingCell dataKey="price" />
          </Table.Column>

          <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell>
              <HeaderSortCell
                title="Monthly Sales"
                dataKey="monthly_sales"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <NumberCell dataKey="monthly_sales" />
          </Table.Column>

          <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell>
              <HeaderSortCell
                title="Monthly Revenue"
                dataKey="monthly_revenue"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <PricingCell dataKey="monthly_revenue" />
          </Table.Column>

          <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell>
              <HeaderSortCell
                title="BSR"
                dataKey="bsr"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <BSRCell dataKey="bsr" />
          </Table.Column>

          <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
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

          {/* <Table.Column width={50} {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell></Table.HeaderCell>
            <ActionCell dataKey="asin" rowData="asin" />
          </Table.Column> */}
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
