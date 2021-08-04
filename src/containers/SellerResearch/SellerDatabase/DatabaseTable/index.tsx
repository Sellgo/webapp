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

/* COmponents */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import GenericRowCell from '../../../../components/NewTable/GenericRowCell';
import BrandsListCell from '../../../../components/NewTable/BrandsListCell';
import RatingCell from '../../../../components/NewTable/RatingCell';
import StatsCell from '../../../../components/NewTable/StatsCell';
import ExtendedReviewsCell from '../../../../components/NewTable/ExtendedReviewsCell';

interface Props {
  isLoadingSellerDatabase: boolean;
  sellerDatabaseResults: [];
  sellerDatabaPaginationInfo: SellerDatabasePaginationInfo;
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
}

const SellerDatabaseTable = (props: Props) => {
  const { isLoadingSellerDatabase, sellerDatabaseResults } = props;

  const [sortColumn] = useState<string>('');
  const [sortType] = useState<'asc' | 'desc' | undefined>(undefined);

  const SellerInformation = ({ rowData, ...props }: any) => {
    console.log(rowData);
    return (
      <>
        <GenericRowCell {...props}>
          <div className={styles.sellerInformation}>
            <div className={styles.sellerInformationLeft}>Asin</div>
            <div className={styles.sellerInformationRight}>
              <h2>Kikkoman</h2>
            </div>
          </div>
        </GenericRowCell>
      </>
    );
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
          id="newSellerDatabaseTable"
        >
          {/* Seller Information */}
          <Table.Column width={600} verticalAlign="middle" fixed>
            <Table.HeaderCell>Seller Information</Table.HeaderCell>
            <SellerInformation dataKey="sellerInformation" />
          </Table.Column>

          {/* ASIN */}
          <Table.Column width={150} verticalAlign="middle" sortable align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="ASIN"
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <Table.Cell>Information</Table.Cell>
          </Table.Column>

          {/* Brands */}
          <Table.Column width={80} verticalAlign="middle" sortable align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title="Brands"
                dataKey="brands"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <BrandsListCell dataKey={'brands'} />
          </Table.Column>

          {/* Total Inventory */}
          <Table.Column width={130} verticalAlign="middle" sortable align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Inventory#`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="inventory_count" />
          </Table.Column>

          {/* Rating L365D */}
          <Table.Column width={130} verticalAlign="middle" sortable align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Rating\nL365D`}
                dataKey=""
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
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="review_ratings" />
          </Table.Column>

          {/* Review L30D */}
          <Table.Column width={120} verticalAlign="middle" sortable align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Review\nL30D`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <ExtendedReviewsCell
              mainreviewkey="count_30_days"
              positivereviewkey="positive_30_days"
              negativereviewkey="negative_30_days"
              neutralreviewkey="neutral_30_days"
              dataKey=""
            />
          </Table.Column>

          {/* Review L90D */}
          <Table.Column width={120} verticalAlign="middle" sortable align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Review\nL90D`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <ExtendedReviewsCell
              mainreviewkey="count_90_days"
              positivereviewkey="positive_90_days"
              negativereviewkey="negative_90_days"
              neutralreviewkey="neutral_90_days"
              dataKey=""
            />
          </Table.Column>

          {/* Review 3650D */}
          <Table.Column width={120} verticalAlign="middle" sortable align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Review\nL365D`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <ExtendedReviewsCell
              mainreviewkey="count_12_month"
              positivereviewkey="positive_12_month"
              negativereviewkey="negative_12_month"
              neutralreviewkey="neutral_12_month"
              dataKey=""
            />
          </Table.Column>

          {/* Review Lifetime */}
          <Table.Column width={120} verticalAlign="middle" sortable align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Review\nLifetime`}
                dataKey=""
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <ExtendedReviewsCell
              mainreviewkey="count_lifetime"
              positivereviewkey="positive_lifetime"
              negativereviewkey="negative_lifetime"
              neutralreviewkey="neutral_lifetime"
              dataKey=""
            />
          </Table.Column>
        </Table>
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
