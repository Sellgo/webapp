import React from 'react';
import { Icon, Rating, Popup } from 'semantic-ui-react';
import { Table } from 'rsuite';

/* import default style */
import 'rsuite/dist/styles/rsuite-default.css';

/* Styling */
import styles from './index.module.scss';
import '../../tableReset.scss';

/* Components */
import ProductTitle from '../TableDetails/ProductTitle';
import ProductDetails from '../TableDetails/ProductDetails';

/* Table */
import { TableAlignmentSettings } from '../../../../interfaces/Table';
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
import { formatNumber, showNAIfZeroOrNull } from '../../../../utils/format';

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

  /* Table column width settings */
  const SMALL_WIDTH = 150;
  const BIG_WIDTH = 800;
  const CENTER_ALIGN_SETTINGS: TableAlignmentSettings = {
    verticalAlign: 'middle',
    align: 'center',
  };

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

  /* Handler, selects all rows, used in SelectAllCheckboxCell */
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

  /* Header cell, Adds a sort icon beside the heading. */
  const HeaderSortCell = (title: string, sortColumnName: string) => {
    /* Generating sort icon */
    let sortIcon;
    if (sortColumn === sortColumnName && sortType === 'asc') {
      sortIcon = (
        <div className={styles.sortIcon}>
          <Icon size="large" name="sort up" />
        </div>
      );
    } else if (sortColumn === sortColumnName && sortType === 'desc') {
      sortIcon = (
        <div className={styles.sortIcon}>
          <Icon size="large" name="sort down" />
        </div>
      );
    } else {
      sortIcon = (
        <div className={styles.sortIcon}>
          <Icon size="large" name="sort" />
        </div>
      );
    }

    return (
      <div className={styles.headerCell}>
        <p className={styles.headerText}>{title}</p>
        {sortIcon}
      </div>
    );
  };

  /* Row cell, Cell with checkbox to select row */
  const CheckboxCell = ({ rowData, ...props }: any) => {
    return (
      <Table.Cell {...props}>
        <input
          type="checkbox"
          onChange={e => handleSelect(rowData, e)}
          checked={selectedRows.includes(rowData.asin)}
        />
      </Table.Cell>
    );
  };

  /* Row cell, combines product information */
  const ProductInformationCell = ({ rowData, ...props }: any) => {
    return (
      <Table.Cell {...props}>
        <div className={styles.headerCell}>
          <ProductTitle asin={rowData.asin} />
          <ProductDetails title={rowData.title} brand={rowData.brand} />
        </div>
      </Table.Cell>
    );
  };

  /* Row cell, Appends $ sign infront of monetary cells */
  const DollarCell = ({ rowData, dataKey, ...props }: any) => {
    const displayPrice = formatNumber(rowData[dataKey]);
    return (
      <Table.Cell {...props}>{showNAIfZeroOrNull(rowData[dataKey], `$${displayPrice}`)}</Table.Cell>
    );
  };

  /* Row Cell, for review stars */
  const RatingCell = ({ rowData, ...props }: any) => (
    <Table.Cell {...props}>
      <Rating defaultRating={rowData.rating} maxRating={5} disabled fractions={2} />
    </Table.Cell>
  );

  /* Row cell */
  const EllipsisCell = ({ rowData, ...props }: any) => (
    <Table.Cell {...props}>
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
            <div className={styles.popupRow}>
              <Icon name="external alternate" size="small" />
              <a
                href={`http://amazon.com/dp/${rowData.asin}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.popupText}
              >
                View on Amazon
              </a>
            </div>
            <div className={styles.popupRow}>
              <Icon name="download" size="small" />
              <p className={styles.popupText}> Export </p>
            </div>
          </span>
        }
        on="click"
        position="top right"
        offset={5}
      />
    </Table.Cell>
  );

  return (
    <section className={styles.productsDatabaseTable}>
      <div className={styles.informationRow}>
        <button className={styles.exportButton} onClick={handleExport}>
          <Icon size="small" name="download" />
          Export
        </button>
      </div>
      <Table
        loading={isLoadingProductsDatabase}
        data={productsDatabaseResults}
        hover
        height={800}
        rowHeight={100}
        onSortColumn={handleSortColumn}
        sortType={sortType}
        sortColumn={sortColumn}
      >
        <Table.Column width={35} fixed {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={
                selectedRows.length === productsDatabaseResults.length && !isLoadingProductsDatabase
              }
            />
          </Table.HeaderCell>
          <CheckboxCell dataKey="checkbox" />
        </Table.Column>

        <Table.Column width={BIG_WIDTH} verticalAlign="middle" fixed>
          <Table.HeaderCell>Product Information</Table.HeaderCell>
          <ProductInformationCell dataKey="productInformation" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>{HeaderSortCell('Sellers', 'seller_count')}</Table.HeaderCell>
          <Table.Cell dataKey="seller_count" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>{HeaderSortCell('Price', 'price')}</Table.HeaderCell>
          <DollarCell dataKey="price" rowData="price" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>
            {HeaderSortCell('Monthly Revenue', 'monthly_revenue')}
          </Table.HeaderCell>
          <DollarCell dataKey="monthly_revenue" rowData="monthly_revenue" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>{HeaderSortCell('Reviews', 'rating')}</Table.HeaderCell>
          <RatingCell dataKey="rating" rowData="rating" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>{HeaderSortCell('Review Count', 'review_count')}</Table.HeaderCell>
          <Table.Cell dataKey="review_count" />
        </Table.Column>

        <Table.Column width={50} {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell></Table.HeaderCell>
          <EllipsisCell dataKey="asin" rowData="asin" />
        </Table.Column>
      </Table>

      <Table.Pagination
        activePage={pageNum}
        displayLength={productsDatabaseResults.length || 0}
        /* Total num of data ENTRIES, e.g. 200 entries with 10 display length = 20 pages */
        total={productsDatabaseResults.length * productsDatabasePaginationInfo.total_pages}
        onChangePage={handleChangePage}
        showLengthMenu={false}
      />
    </section>
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
