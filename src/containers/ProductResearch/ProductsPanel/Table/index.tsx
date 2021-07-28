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
import ProductStats from '../TableDetails/ProductStats';

/* Table */
import { TableAlignmentSettings } from '../../../../interfaces/Table';

const dataList = {
  results: [
    {
      asin: 'B019Y9R6E0',
      upc: 'PLACEHOLDER',
      img: `https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector
        -id1147544807?k=6&m=1147544807&s=612x612&w=0&h=8CXEtGfDlt7oFx7UyEZClHojvDjZR91U-mAU8UlFF4Y=`,

      title: 'Dammit Doll',
      category: 'PLACEHOLDER',
      brand: 'Dammit Doll',
      fulfilment: 'PLACEHOLDER',
      size_tier: 'PLACEHOLDER',
      number_of_images: 'PLACEHOLDER',
      variation_count: 'PLACEHOLDER',
      multipack: 'PLACEHOLDER',
      weight_lbs: 0,
      package_dimensions: 'PLACEHOLDER',
      storage_fees: 'PLACEHOLDER',
      listing_age: 'PLACEHOLDER',
      kpi_1: 'PLACEHOLDER',
      kpi_2: 'PLACEHOLDER',
      kpi_3: 'PLACEHOLDER',

      ly_sales: -1,
      sales_yoy: -1,
      sales_l90d: -1,
      price_90d: -1,
      best_sales: -1,
      sales_to_reviews: -1,
      kpi_4: -1,
      kpi_5: -1,
      kpi_6: -1,

      monthly_revenue: 17.87,
      price: 17.87,
      rating: 4.7,
      review_count: 518,
      seller_count: 1,
      monthly_sales: 'PLACEHOLDER',
      bsr: 'PLACEHOLDER',
    },
    {
      asin: 'B01ee9Y9R6E0',
      upc: 'PLACEHOLDER',
      img: `https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector
      -id1147544807?k=6&m=1147544807&s=612x612&w=0&h=8CXEtGfDlt7oFx7UyEZClHojvDjZR91U-mAU8UlFF4Y=`,

      title: 'Dammit Doll',
      category: 'PLACEHOLDER',
      brand: 'Dammit Doll',
      fulfilment: 'PLACEHOLDER',
      size_tier: 'PLACEHOLDER',
      number_of_images: 'PLACEHOLDER',
      variation_count: 'PLACEHOLDER',
      multipack: 'PLACEHOLDER',
      weight_lbs: 0,
      package_dimensions: 'PLACEHOLDER',
      storage_fees: 'PLACEHOLDER',
      listing_age: 'PLACEHOLDER',
      kpi_1: 'PLACEHOLDER',
      kpi_2: 'PLACEHOLDER',
      kpi_3: 'PLACEHOLDER',

      ly_sales: -1,
      sales_yoy: -1,
      sales_l90d: -1,
      price_90d: -1,
      best_sales: -1,
      sales_to_reviews: -1,
      kpi_4: -1,
      kpi_5: -1,
      kpi_6: -1,

      monthly_revenue: 17.87,
      price: 17.87,
      rating: 4.7,
      review_count: 518,
      seller_count: 1,
      monthly_sales: 'PLACEHOLDER',
      bsr: 'PLACEHOLDER',
    },
  ],
  page_info: {
    current_page: 1,
    total_pages: 1,
  },
};

const ProductsDatabaseTable = () => {
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
  };
  // handleChangeLength(dataKey) {
  //   this.setState({
  //     page: 1,
  //     displayLength: dataKey
  //   });
  // }
  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
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
      dataList.results.map(row => allSelectedRows.push(row.asin));
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

  /* Header cell, used to select all rows */
  const SelectAllCheckboxCell = (
    <input
      type="checkbox"
      onChange={handleSelectAll}
      checked={selectedRows.length === dataList.results.length}
    />
  );

  /* Row cell, Cell with checkbox to select row */
  // @ts-ignore
  const CheckboxCell = ({ rowData, ...props }) => (
    <Table.Cell {...props}>
      <input
        type="checkbox"
        onChange={e => handleSelect(rowData, e)}
        checked={selectedRows.includes(rowData.asin)}
      />
    </Table.Cell>
  );

  /* Row cell, combines product information */
  // @ts-ignore
  const ProductInformationCell = ({ rowData, ...props }) => (
    <Table.Cell {...props}>
      <div className={styles.headerCell}>
        <ProductTitle asin={rowData.asin} upc={rowData.upc} img={rowData.img} />
        <ProductDetails
          title={rowData.title}
          category={rowData.category}
          brand={rowData.brand}
          fulfilment={rowData.fulfilment}
          size_tier={rowData.size_tier}
          number_of_images={rowData.number_of_images}
          variation_count={rowData.variation_count}
          multipack={rowData.multipack}
          weight_lbs={rowData.weight_lbs}
          package_dimensions={rowData.package_dimensions}
          storage_fees={rowData.storage_fees}
          listing_age={rowData.listing_age}
          kpi_1={rowData.kpi_1}
          kpi_2={rowData.kpi_2}
          kpi_3={rowData.kpi_3}
        />
        <ProductStats
          ly_sales={rowData.ly_sales}
          sales_yoy={rowData.sales_yoy}
          sales_l90d={rowData.sales_l90d}
          price_90d={rowData.price_90d}
          best_sales={rowData.best_sales}
          sales_to_reviews={rowData.sales_to_reviews}
          kpi_4={rowData.kpi_4}
          kpi_5={rowData.kpi_5}
          kpi_6={rowData.kpi_6}
        />
      </div>
    </Table.Cell>
  );

  /* Row cell, Appends $ sign infront of monetary cells */
  // @ts-ignore
  const DollarCell = ({ rowData, dataKey, ...props }) => (
    <Table.Cell {...props}>${rowData[dataKey]}</Table.Cell>
  );

  /* Row Cell, for review stars */
  // @ts-ignore
  const RatingCell = ({ rowData, ...props }) => (
    <Table.Cell {...props}>
      <Rating defaultRating={rowData.rating} maxRating={5} disabled />
    </Table.Cell>
  );

  /* Row cell */
  // @ts-ignore
  const EllipsisCell = ({ rowData, ...props }) => (
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
        data={dataList.results}
        hover
        height={1000}
        rowHeight={320}
        onSortColumn={handleSortColumn}
        sortType={sortType}
        sortColumn={sortColumn}
      >
        <Table.Column width={35} fixed {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell> {SelectAllCheckboxCell} </Table.HeaderCell>
          <CheckboxCell dataKey="productInformation" rowData="productInformation" />
        </Table.Column>

        <Table.Column width={BIG_WIDTH} verticalAlign="middle">
          <Table.HeaderCell>Product Information</Table.HeaderCell>
          <ProductInformationCell dataKey="title" rowData="title" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>{HeaderSortCell('Sellers', 'seller_count')}</Table.HeaderCell>
          <Table.Cell dataKey="seller_count" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>{HeaderSortCell('Price', 'price')}</Table.HeaderCell>
          <DollarCell dataKey="price" rowData="seller-count" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>{HeaderSortCell('Monthly Sales', 'monthly_sales')}</Table.HeaderCell>
          <DollarCell dataKey="monthly_sales" rowData="monthly_sales" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>
            {HeaderSortCell('Monthly Revenue', 'monthly_revenue')}
          </Table.HeaderCell>
          <DollarCell dataKey="monthly_revenue" rowData="monthly_revenue" />
        </Table.Column>

        <Table.Column width={SMALL_WIDTH} sortable {...CENTER_ALIGN_SETTINGS}>
          <Table.HeaderCell>{HeaderSortCell('BSR', 'bsr')}</Table.HeaderCell>
          <Table.Cell dataKey="bsr" />
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
        displayLength={dataList.results.length}
        /* Total num of data ENTRIES, e.g. 200 entries with 10 display length = 20 pages */
        total={dataList.results.length * dataList.page_info.total_pages}
        onChangePage={handleChangePage}
        showLengthMenu={false}
      />
    </section>
  );
};

export default ProductsDatabaseTable;
