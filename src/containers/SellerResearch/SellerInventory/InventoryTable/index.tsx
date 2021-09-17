/* eslint-disable max-len */
import React, { useState } from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Constants */
import {
  DEFAULT_PAGES_LIST,
  SELLER_INVENTORY_TABLE_ROW_HEIGHT,
  SELLER_INVENTORY_UNIQUE_KEY,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Components */
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import RatingCell from '../../../../components/NewTable/RatingCell';
import Pagination from '../../../../components/NewTable/Pagination';
import BrandsListCell from '../../../../components/NewTable/BrandsListCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import ExtendedReviewsCell from '../../../../components/NewTable/ExtendedReviewsCell';

/* Containers */
import SellerInformation from './SellerInformation';
import ActionsCell from './ActionsCell';

const fakeData = [
  {
    seller_merchant_id: 10,
    seller_id: 1000000005,
    merchant_id: 'A00038802J7X43YTW44TD',
    merchant_group: null,
    status: 'active',
    tracking_status: 'active',
    udate: '2021-09-16T18:19:33.651808Z',
    parent_asin: null,
    id: 10,
    merchant_name: 'Custom Auto Crews',
    merchant_logo: 'https://images-na.ssl-images-amazon.com/images/I/41ZcgctOVhL.jpg',
    business_name: 'MOTORBOX INC',
    inventory_link: 'https://www.amazon.com/shops/A00038802J7X43YTW44TD?ref_=v_sp_storefront',
    address: '1457 Glenn Curtiss st.',
    city: 'Carson',
    state: 'CA',
    country: 'US',
    seller_rating: '4.5',
    review_ratings: 84,
    positive_30_days: 86,
    positive_90_days: 86,
    positive_12_month: 84,
    neutral_30_days: 6,
    neutral_90_days: 3,
    neutral_12_month: 4,
    neutral_lifetime: 1,
    negative_30_days: 9,
    negative_90_days: 11,
    negative_12_month: 13,
    negative_lifetime: 5,
    count_30_days: 90,
    count_90_days: 312,
    count_12_month: 2097,
    count_lifetime: 52266,
    inventory_count: 695,
    feedback:
      '[{"stars": "4.5 out of 5 stars", "comment": null, "comment_by": "\\n        By Richard on September 16, 2021.\\n    "}, {"stars": "4.5 out of 5 stars", "comment": "No problems with product", "comment_by": "\\n        By Richard on September 16, 2021.\\n    "}, {"stars": "4.5 out of 5 stars", "comment": "Very good item", "comment_by": "\\n        By Richard on September 16, 2021.\\n    "}, {"stars": "4.5 out of 5 stars", "comment": "Thank you for solving this issue for me so fast. I\'ll be waiting for the other curtain. ", "comment_by": "\\n        By Richard on September 16, 2021.\\n    "}, {"stars": "4.5 out of 5 stars", "comment": "Good product good seller.", "comment_by": "\\n        By Richard on September 16, 2021.\\n    "}, {"stars": "4.5 out of 5 stars", "comment": null, "comment_by": "\\n        By Richard on September 16, 2021.\\n    "}]',
    brands:
      '["BDK", "Motor Trend", "BDKUSA", "Caterpillar", "Unique Imports", "ACDelco", "Hubcaps Plus", "U.A.A. INC.", "Unknown", "PILOT", "Luxury Driver"]',
    asins:
      '["B07GK712Q1", "B07BLDHL2B", "B07VQWTFGM", "B017AI3BWS", "B08MT852WW", "B08MQQZQ7Y", "B01EW0BEAS", "B01CFZ5HE6", "B00TZ43BLC", "B08ZNXRDH9", "B08P55KSQ7", "B07FN4FMJX", "B08J8D43DW", "B07FN4L7LB", "B073ZNVD7L", "B07VQWVN99"]',
    asin: null,
    positive_lifetime: 94,
    launched: '>1Y',
    marketplace_id: 'ATVPDKIKX0DER',
    has_inventory: true,
    fba_count: 778,
    fbm_count: 4,
    fba_perc: '99.49',
    fbm_perc: '0.51',
    last_check_inventory: '2021-06-16T18:24:46.222504Z',
    scrapy_job_id: 188,
  },
  {
    seller_merchant_id: 66,
    seller_id: 1000000005,
    merchant_id: 'A101LJ8PTOEM9T',
    merchant_group: null,
    status: 'active',
    tracking_status: 'inactive',
    udate: '2021-08-31T07:38:27.163942Z',
    parent_asin: null,
    id: 170,
    merchant_name: 'AZ Specialty Deals',
    merchant_logo: null,
    business_name: 'Ted Keith Joffs',
    inventory_link: 'https://www.amazon.com/shops/A101LJ8PTOEM9T?ref_=v_sp_storefront',
    address: '1713 E. Wesleyan Drive',
    city: 'Tempe',
    state: 'AZ',
    country: 'US',
    seller_rating: null,
    review_ratings: null,
    positive_30_days: null,
    positive_90_days: null,
    positive_12_month: null,
    neutral_30_days: null,
    neutral_90_days: null,
    neutral_12_month: null,
    neutral_lifetime: null,
    negative_30_days: null,
    negative_90_days: null,
    negative_12_month: null,
    negative_lifetime: null,
    count_30_days: null,
    count_90_days: null,
    count_12_month: null,
    count_lifetime: null,
    inventory_count: 8,
    feedback: '[]',
    brands:
      '["Miracle-Gro", "L\'Oreal Paris", "MGA Entertainment", "Monopoly", "Rubie\'s", "Estee Lauder", "Penn", "DENOVO"]',
    asins:
      '["B0071E1YJO", "B002LKCMJO", "B085B23RX2", "B07VVLQ9VN", "B002QKHPHS", "B08JH7FKQT", "B07VTXJZL8", "B09DJVX78Q"]',
    asin: null,
    positive_lifetime: null,
    launched: '<30D',
    marketplace_id: 'ATVPDKIKX0DER',
    has_inventory: null,
    fba_count: null,
    fbm_count: null,
    fba_perc: null,
    fbm_perc: null,
    last_check_inventory: null,
    scrapy_job_id: 186,
  },
];

const InventoryTable = () => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();
  const [expandedRowKeys, setExpandedRowkeys] = useState<string[]>([]);

  /* Handle Page change*/
  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log({ page: pageNo, perPage: perPageNo });
  };

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };

  /* Handle expansion logic */
  const handleExpansion = (rowData: any) => {
    const rowId = rowData[SELLER_INVENTORY_UNIQUE_KEY];
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
    }
  };

  return (
    <section className={styles.sellerInventoryTableWrapper}>
      {/* Main table wrapper */}
      <Table
        loading={false}
        data={fakeData}
        autoHeight
        hover={false}
        rowHeight={SELLER_INVENTORY_TABLE_ROW_HEIGHT}
        headerHeight={55}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        id="sellerInventoryTable"
        //  Props for table expansion
        rowKey={SELLER_INVENTORY_UNIQUE_KEY}
        rowExpandedHeight={100}
        expandedRowKeys={expandedRowKeys}
        renderRowExpanded={() => (
          <div>
            <p>This is the expanded row</p>
          </div>
        )}
      >
        {/* Expand Cell */}
        <Table.Column width={30} verticalAlign="top" fixed align="left">
          <Table.HeaderCell> </Table.HeaderCell>
          <ExpansionCell
            dataKey={SELLER_INVENTORY_UNIQUE_KEY}
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpansion}
          />
        </Table.Column>

        {/* Seller Information */}
        <Table.Column width={650} verticalAlign="top" fixed flexGrow={1}>
          <Table.HeaderCell>Seller Information</Table.HeaderCell>
          <SellerInformation dataKey="seller_information" />
        </Table.Column>

        {/* Brands */}
        <Table.Column width={80} verticalAlign="top" align="center">
          <Table.HeaderCell>Brands</Table.HeaderCell>
          <BrandsListCell dataKey={'brands'} />
        </Table.Column>

        {/* Rating L365D */}
        <Table.Column width={130} verticalAlign="top" fixed align="left">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Rating\nL365D`}
              dataKey="seller_rating"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <RatingCell dataKey="seller_rating" />
        </Table.Column>

        {/* Rating % L365D */}
        <Table.Column width={100} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Rating%\nL365D`}
              dataKey="review_ratings"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <StatsCell dataKey="review_ratings" appendWith="%" />
        </Table.Column>

        {/* Review L30D */}
        <Table.Column width={120} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Review\nL30D`}
              dataKey="count_30_days"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ExtendedReviewsCell
            mainReviewKey="count_30_days"
            positiveReviewKey="positive_30_days"
            negativeReviewKey="negative_30_days"
            neutralReviewKey="neutral_30_days"
            dataKey="count_30_days"
          />
        </Table.Column>

        {/* Review L90D */}
        <Table.Column width={120} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Review\nL90D`}
              dataKey="count_90_days"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ExtendedReviewsCell
            mainReviewKey="count_90_days"
            positiveReviewKey="positive_90_days"
            negativeReviewKey="negative_90_days"
            neutralReviewKey="neutral_90_days"
            dataKey="count_90_days"
          />
        </Table.Column>

        {/* Review 3650D */}
        <Table.Column width={120} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Review\nL365D`}
              dataKey="count_12_month"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ExtendedReviewsCell
            mainReviewKey="count_12_month"
            positiveReviewKey="positive_12_month"
            negativeReviewKey="negative_12_month"
            neutralReviewKey="neutral_12_month"
            dataKey="count_12_month"
          />
        </Table.Column>

        {/* Review Lifetime */}
        <Table.Column width={120} verticalAlign="top" sortable align="center">
          <Table.HeaderCell>
            <HeaderSortCell
              title={`Review\nLifetime`}
              dataKey="count_lifetime"
              currentSortColumn={sortColumn}
              currentSortType={sortType}
            />
          </Table.HeaderCell>
          <ExtendedReviewsCell
            mainReviewKey="count_lifetime"
            positiveReviewKey="positive_lifetime"
            negativeReviewKey="negative_lifetime"
            neutralReviewKey="neutral_lifetime"
            dataKey="count_lifetime"
          />
        </Table.Column>

        {/* Actions Cell */}
        <Table.Column width={40} verticalAlign="top" fixed align="left">
          <Table.HeaderCell>{''}</Table.HeaderCell>
          <ActionsCell dataKey={SELLER_INVENTORY_UNIQUE_KEY} />
        </Table.Column>
      </Table>

      {/* Pagination */}
      <footer className={styles.sellerInventoryPaginationContainer}>
        <Pagination
          totalPages={20}
          currentPage={2}
          onPageChange={handlePageChange}
          showSiblingsCount={3}
          showPerPage={true}
          perPage={20}
          perPageList={DEFAULT_PAGES_LIST}
        />
      </footer>
    </section>
  );
};

export default InventoryTable;
