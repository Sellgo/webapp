import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Table } from 'rsuite';

/* Styling */
import styles from './index.module.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import './globals.scss';

/* Selectors */
import {
  getIsLoadingSellerDatabase,
  getSellerDatabasePaginationInfo,
  getSellerDatabaseResults,
} from '../../../../selectors/SellerResearch/SellerDatabase';

/* Actions */
import { fetchSellerDatabase } from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import {
  SellerDatabasePaginationInfo,
  SellerDatabasePayload,
} from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';

import BrandsListCell from '../../../../components/NewTable/BrandsListCell';
import RatingCell from '../../../../components/NewTable/RatingCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import ExtendedReviewsCell from '../../../../components/NewTable/ExtendedReviewsCell';
import TablePagination from '../../../../components/NewTable/Pagination';

/* Containers */
import SellerInformation from './SellerInformation';
import SellerActions from './SellerActions';

interface Props {
  isLoadingSellerDatabase: boolean;
  sellerDatabaseResults: [];
  sellerDatabaPaginationInfo: SellerDatabasePaginationInfo;
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
}

const SellerDatabaseTable = (props: Props) => {
  const {
    isLoadingSellerDatabase,
    sellerDatabaseResults,
    fetchSellerDatabase,
    sellerDatabaPaginationInfo,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchSellerDatabase({
      sort: sortColumn,
      sortDir: sortType === undefined ? 'asc' : sortType,
    });
  };

  const handlePageChange = (pageNo: number) => {
    fetchSellerDatabase({
      page: pageNo,
    });
  };

  return (
    <>
      <section className={styles.sellerDatbaseTableWrapper}>
        <Table
          loading={isLoadingSellerDatabase}
          data={sellerDatabaseResults}
          autoHeight
          hover={false}
          rowHeight={200}
          headerHeight={55}
          sortColumn={sortColumn}
          sortType={sortType}
          id="sellerDatabaseTable"
          onSortColumn={handleSortColumn}
        >
          {/* Seller Information */}
          <Table.Column width={650} verticalAlign="middle" fixed>
            <Table.HeaderCell>Seller Information</Table.HeaderCell>
            <SellerInformation dataKey={'sellerInformation'} />
          </Table.Column>

          {/* ASIN */}
          <Table.Column width={150} verticalAlign="middle" align="left">
            <Table.HeaderCell>ASIN</Table.HeaderCell>
            <SellerActions dataKey="sellerActions" />
          </Table.Column>

          {/* Brands */}
          <Table.Column width={80} verticalAlign="middle" align="center">
            <Table.HeaderCell>Brands</Table.HeaderCell>
            <BrandsListCell dataKey={'brands'} />
          </Table.Column>

          {/* Monthly Revenue = Sales Est. */}
          <Table.Column width={180} sortable verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Monthly Revenue.`}
                dataKey="sales_estimate"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey={'sales_estimate'} prependWith="$" align="left" />
          </Table.Column>

          {/* Rating L365D */}
          <Table.Column width={130} verticalAlign="middle" sortable align="center">
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
          <Table.Column width={130} verticalAlign="middle" sortable align="center">
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
          <Table.Column width={120} verticalAlign="middle" sortable align="center">
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
          <Table.Column width={120} verticalAlign="middle" sortable align="center">
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
          <Table.Column width={120} verticalAlign="middle" sortable align="center">
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
          <Table.Column width={120} verticalAlign="middle" sortable align="center">
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
        </Table>

        {sellerDatabaPaginationInfo && sellerDatabaPaginationInfo.total_pages > 0 && (
          <footer className={styles.sellerDatabasePagination}>
            <TablePagination
              totalPages={sellerDatabaPaginationInfo.total_pages}
              currentPage={sellerDatabaPaginationInfo.current_page}
              onPageChange={handlePageChange}
              showSiblingsCount={3}
            />
          </footer>
        )}
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isLoadingSellerDatabase: getIsLoadingSellerDatabase(state),
    sellerDatabaseResults: getSellerDatabaseResults(state),
    sellerDatabaPaginationInfo: getSellerDatabasePaginationInfo(state),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabaseTable);
