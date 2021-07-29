import React from 'react';
import { Checkbox, Icon, Popup } from 'semantic-ui-react';
import { Table } from 'rsuite';

/* import default style */
import 'rsuite/dist/styles/rsuite-default.css';

/* Styling */
import styles from './index.module.scss';
import '../../tableReset.scss';

/* Components */
import ProductTitle from '../../../../components/NewTable/ProductInformation/ProductTitle';
import ProductDetails from '../../../../components/NewTable/ProductInformation/ProductDetails';
import PricingCell from '../../../../components/NewTable/PricingCell';
import RatingCell from '../../../../components/NewTable/RatingCell';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import GenericRowCell from '../../../../components/NewTable/GenericRowCell';

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

  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<'asc' | 'desc' | undefined>(undefined);
  const [pageNum, setPageNum] = React.useState<number>(1);

  const handleChangePage = (dataKey: number) => {
    setPageNum(dataKey);
    fetchProductsDatabase({
      page: dataKey,
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

  /* Handler, selects one row, used in CheckboxCell */
  const handleSelect = (rowData: any, e: any) => {
    const currentRowASIN = rowData.asin;
    let newSelectedRows;
    if (e.target.checked) {
      newSelectedRows = selectedRows.filter(rowASIN => rowASIN !== currentRowASIN);
      newSelectedRows.push(currentRowASIN);
    } else {
      newSelectedRows = selectedRows.filter(rowASIN => rowASIN !== currentRowASIN);
    }
    setSelectedRows(newSelectedRows);
  };

  /* Handler, selects all rows */
  const handleSelectAll = (e: any) => {
    const allSelectedRows: string[] = [];
    if (e.target.checked) {
      productsDatabaseResults.map(row => allSelectedRows.push(row.asin));
    }
    setSelectedRows(allSelectedRows);
  };

  const handleExport = () => {
    /* TO HANDLE EXPORTS HERE */
    console.log(selectedRows);
  };

  /* Row cell, Cell with checkbox to select row */
  const CheckboxCell = ({ rowData, ...props }: any) => {
    return (
      <GenericRowCell {...props}>
        <input
          type="checkbox"
          onChange={e => handleSelect(rowData, e)}
          checked={selectedRows.includes(rowData.asin)}
        />
      </GenericRowCell>
    );
  };

  /* Row cell, combines product information */
  const ProductInformationCell = ({ rowData, ...props }: any) => {
    return (
      <GenericRowCell {...props}>
        <div className={styles.productInformationCell}>
          <ProductTitle asin={rowData.asin} />
          <ProductDetails title={rowData.title} brand={rowData.brand} />
        </div>
      </GenericRowCell>
    );
  };

  /* Row cell */
  const ActionCell = ({ rowData, ...props }: any) => (
    <GenericRowCell {...props}>
      <Popup
        /* Ellipsis icon */
        trigger={
          <button className={styles.ellipsisButton}>
            <Icon name="ellipsis vertical" size="small" />
          </button>
        }
        /* Ellipsis popup content */
        content={
          <span>
            <div className={styles.actionPopupRow}>
              <Icon name="external alternate" size="small" />
              <a
                href={`http://amazon.com/dp/${rowData.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionPopupText}
              >
                View on Amazon
              </a>
            </div>
            <div className={styles.actionPopupRow}>
              <Icon name="download" size="small" />
              <p className={styles.actionPopupText}> Export </p>
            </div>
          </span>
        }
        on="click"
        position="top right"
        offset={5}
      />
    </GenericRowCell>
  );

  return (
    <>
      <section>
        <div className={styles.informationRow}>
          <button className={styles.exportButton} onClick={handleExport}>
            <Icon size="small" name="download" />
            Export
          </button>
        </div>
        <Table
          loading={isLoadingProductsDatabase}
          data={productsDatabaseResults}
          hover={false}
          autoHeight
          rowHeight={100}
          headerHeight={50}
          onSortColumn={handleSortColumn}
          sortType={sortType}
          sortColumn={sortColumn}
          rowClassName={styles.tableRow}
          affixHorizontalScrollbar
          className={styles.productsDatabaseTable}
        >
          <Table.Column width={35} fixed {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell>
              <div className={styles.headerSelectRow}>
                <Checkbox
                  onChange={handleSelectAll}
                  checked={Boolean(
                    !isLoadingProductsDatabase &&
                      productsDatabaseResults.length &&
                      selectedRows.length === productsDatabaseResults.length
                  )}
                />
                <div className={styles.headerSelectIcon}>
                  <Icon name="ellipsis vertical" size="small" />
                </div>
              </div>
            </Table.HeaderCell>
            <CheckboxCell dataKey="checkbox" />
          </Table.Column>

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
            <GenericRowCell dataKey="seller_count" />
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
                title="Reviews"
                dataKey="rating"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <RatingCell dataKey="rating" rowData="rating" />
          </Table.Column>

          <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell>
              <HeaderSortCell
                title="Review Count"
                dataKey="review_count"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <GenericRowCell dataKey="review_count" />
          </Table.Column>

          <Table.Column width={50} {...CENTER_ALIGN_SETTINGS}>
            <Table.HeaderCell></Table.HeaderCell>
            <ActionCell dataKey="asin" rowData="asin" />
          </Table.Column>
        </Table>
      </section>

      {productsDatabasePaginationInfo.total_pages > 0 && (
        <Table.Pagination
          showInfo={false}
          activePage={pageNum}
          displayLength={productsDatabaseResults.length || 0}
          /* Total num of data ENTRIES, e.g. 200 entries with 10 display length = 20 pages */
          total={productsDatabaseResults.length * productsDatabasePaginationInfo.total_pages}
          onChangePage={handleChangePage}
          showLengthMenu={false}
        />
      )}
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
