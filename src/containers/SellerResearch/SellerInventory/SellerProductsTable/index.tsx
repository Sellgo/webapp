/* eslint-disable max-len */
import React from 'react';
import { Table } from 'rsuite';

/* Styling */
import './global.scss';
import styles from './index.module.scss';

/* Constants */
import {
  DEFAULT_PAGES_LIST,
  SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT,
} from '../../../../constants/SellerResearch/SellerInventory';

/* Components */
import RatingCell from '../../../../components/NewTable/RatingCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import Pagination from '../../../../components/NewTable/Pagination';

const fakeData = [
  {
    id: 5038,
    merchant_id: '211',
    product_id: 3000371947,
    scrapy_job_id: 183,
    asin: '1524763160',
    inventory_link: null,
    inventory_count: null,
    product_name: 'A Promised Land',
    product_url:
      'https://www.amazon.com/Promised-Land-Barack-Obama/dp/1524763160/ref=sr_1_1?dchild=1&m=A3CJHO95CDGUE4&qid=1627450550&s=merchant-items&sr=1-1',
    current_price: '32.99',
    original_price: '45.00',
    best_seller: false,
    amazon_choice: false,
    marketplace_id: 'ATVPDKIKX0DER',
    reviews_count: '112374',
    review_stars: '4.9',
    save_and_subscribe: false,
    variation: false,
    category: 'Hardcover',
    fba: false,
    fbm: true,
    udate: '2021-07-28T05:37:04.754294Z',
    tracking_status: null,
    product_track_id: null,
    image_url: 'https://m.media-amazon.com/images/I/41L5qgUW2fL._SL75_.jpg',
    num_sellers: null,
    last_check_sellers: null,
  },
  {
    id: 5039,
    merchant_id: '211',
    product_id: 3000371948,
    scrapy_job_id: 183,
    asin: 'B00LPC3O3M',
    inventory_link: null,
    inventory_count: null,
    product_name:
      'Verbatim 98106 Optical Mouse - Wired with USB Accessibility - Mac & PC Compatible - Black, 1.2" x 2.3" x 3.8"',
    product_url:
      // eslint-disable-next-line max-len
      'https://www.amazon.com/Verbatim-Optical-Mouse-Accessibility-Compatible/dp/B00LPC3O3M/ref=sr_1_2?dchild=1&m=A3CJHO95CDGUE4&qid=1627450550&s=merchant-items&sr=1-2',
    current_price: '7.50',
    original_price: null,
    best_seller: false,
    amazon_choice: false,
    marketplace_id: 'ATVPDKIKX0DER',
    reviews_count: '8480',
    review_stars: '4.5',
    save_and_subscribe: false,
    variation: false,
    category: null,
    fba: false,
    fbm: true,
    udate: '2021-07-28T05:37:04.757060Z',
    tracking_status: null,
    product_track_id: null,
    image_url: 'https://m.media-amazon.com/images/I/41gkJSyNmUL._SL75_.jpg',
    num_sellers: null,
    last_check_sellers: null,
  },
];

const SellerProductsTable = () => {
  /* Handle pagination */
  const handlePageChange = (pageNo: number, perPageNo?: number) => {
    console.log('Handle page change', pageNo, perPageNo);
  };

  return (
    <section className={styles.sellerProductsTableWrapper}>
      <Table
        loading={false}
        data={fakeData}
        height={400}
        hover={false}
        headerHeight={50}
        rowHeight={SELLER_INVENTORY_PRODUCTS_TABLE_ROW_HEIGHT}
        id="sellerProductsTable"
        rowKey={'id'}
      >
        {/* Product Information  */}
        <Table.Column width={130} verticalAlign="top" align="left" flexGrow={2}>
          <Table.HeaderCell>Product Name</Table.HeaderCell>
          <Table.Cell>Product Name </Table.Cell>
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

      <footer>
        <Pagination
          totalPages={10}
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

export default SellerProductsTable;
