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
  getSellerDatabaseMarketplaceInfo,
  getSellerDatabasePaginationInfo,
  getSellerDatabaseResults,
} from '../../../../selectors/SellerResearch/SellerDatabase';

/* Actions */
import { fetchSellerDatabase } from '../../../../actions/SellerResearch/SellerDatabase';

/* Interfaces */
import {
  SellerDatabasePaginationInfo,
  SellerDatabasePayload,
  MarketplaceOption,
} from '../../../../interfaces/SellerResearch/SellerDatabase';

/* Components */
import HeaderSortCell from '../../../../components/NewTable/HeaderSortCell';
import Placeholder from '../../../../components/Placeholder';
import BrandsListCell from '../../../../components/NewTable/BrandsListCell';
//import RatingCell from '../../../../components/NewTable/RatingCell';
//import StatsCell from '../../../../components/NewTable/StatsCell';
//import ExtendedReviewsCell from '../../../../components/NewTable/ExtendedReviewsCell';
import TablePagination from '../../../../components/NewTable/Pagination';

/* Containers */
import SellerInformation from './SellerInformation';
import SellerActions from './SellerActions';
import TruncatedTextCell from '../../../../components/NewTable/TruncatedTextCell';

/* Utils */
import { onMountFixNewTableHeader } from '../../../../utils/newTable';
import ImageCell from '../../../../components/NewTable/ImageCell';
import MultipleDataCell from '../../../../components/NewTable/MultipleDataCell';
// import AddressCell from '../../../../components/NewTable/AddressCell';
import ExpansionCell from '../../../../components/NewTable/ExpansionCell';
import ExpandedBusinessInformation from './ExpandedBusinessInformation';

interface Props {
  isLoadingSellerDatabase: boolean;
  sellerDatabaseResults: [];
  sellerDatabaPaginationInfo: SellerDatabasePaginationInfo;
  fetchSellerDatabase: (payload: SellerDatabasePayload) => void;
  sellerMarketplace: MarketplaceOption;
}

const SellerDatabaseTable = (props: Props) => {
  const {
    isLoadingSellerDatabase,
    sellerDatabaseResults,
    fetchSellerDatabase,
    sellerDatabaPaginationInfo,
    sellerMarketplace,
  } = props;

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortType, setSortType] = useState<'asc' | 'desc' | undefined>();
  const [expandedRowKeys, setExpandedRowkeys] = React.useState<string[]>([]);

  const handleSortColumn = (sortColumn: string, sortType: 'asc' | 'desc' | undefined) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
    fetchSellerDatabase({
      sort: sortColumn,
      sortDir: sortType === undefined ? 'asc' : sortType,
      marketplaceId: sellerMarketplace.value,
    });
  };

  const handlePageChange = (pageNo: number) => {
    fetchSellerDatabase({
      page: pageNo,
      sort: sortColumn || undefined,
      sortDir: sortType === undefined ? 'asc' : sortType,
      marketplaceId: sellerMarketplace.value,
    });
  };

  const handleExpansion = (rowData: any) => {
    const rowId = rowData.merchant_id;
    const [currentExpandedRowId] = expandedRowKeys;

    if (currentExpandedRowId !== rowId) {
      setExpandedRowkeys([rowId]);
    } else {
      setExpandedRowkeys([]);
    }
  };

  React.useEffect(() => {
    onMountFixNewTableHeader();
  }, []);
  return (
    <>
      <section className={styles.sellerDatbaseTableWrapper}>
        <Table
          renderLoading={() =>
            isLoadingSellerDatabase && <Placeholder numberParagraphs={2} numberRows={3} isGrey />
          }
          data={!isLoadingSellerDatabase ? sellerDatabaseResults : []}
          autoHeight
          hover={true}
          rowHeight={200}
          headerHeight={55}
          sortColumn={sortColumn}
          sortType={sortType}
          id="sellerDatabaseTable"
          className={sellerDatabaseResults?.length === 0 ? 'no-scroll' : ''}
          onSortColumn={handleSortColumn}
          renderEmpty={() => <div />}
          rowExpandedHeight={550}
          expandedRowKeys={expandedRowKeys}
          renderRowExpanded={(rowData: any) => <ExpandedBusinessInformation rowData={rowData} />}
          rowKey="merchant_id"
        >
          {/* Seller Information */}
          <Table.Column width={250} verticalAlign="middle" fixed>
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Seller Information`}
                dataKey="seller_information"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                disableSort
              />
            </Table.HeaderCell>
            <SellerInformation dataKey={'sellerInformation'} />
          </Table.Column>

          {/* Market place image */}
          <Table.Column width={250} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Marketplace`}
                dataKey="marketplace_id"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                disableSort
                alignMiddle
              />
            </Table.HeaderCell>
            <ImageCell dataKey="marketplace_id" isMarketPlace />
          </Table.Column>

          {/* Business Name */}
          <Table.Column width={250} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Business Name`}
                dataKey="merchant_name"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                disableSort
              />
            </Table.HeaderCell>
            <MultipleDataCell
              dataKey="merchant_name"
              secondDataKey="business_name"
              textAlign="left"
              isFirstTextBold
            />
          </Table.Column>

          {/* Expansion Cell */}
          <Table.Column verticalAlign="bottom" align="left" width={30}>
            <Table.HeaderCell> </Table.HeaderCell>
            <ExpansionCell
              dataKey={'merchant_id'}
              expandedRowKeys={expandedRowKeys}
              onChange={handleExpansion}
              isArrow
            />
          </Table.Column>

          {/* Business Address */}
          {/* <Table.Column width={250} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Business Address`}
                dataKey="address"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                disableSort
              />
            </Table.HeaderCell>
            <AddressCell dataKey={'address'} textAlign="left" />
          </Table.Column> */}
          {/* Number of ASIN */}
          <Table.Column width={250} verticalAlign="middle" align="left">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Number of ASINs`}
                dataKey="inventory_count"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                disableSort
              />
            </Table.HeaderCell>
            <SellerActions dataKey="sellerActions" />
          </Table.Column>

          {/* Brands */}
          <Table.Column width={250} verticalAlign="middle" align="center">
            <Table.HeaderCell>
              <HeaderSortCell
                title={`Brands`}
                dataKey="brands"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
                disableSort
              />
            </Table.HeaderCell>
            <BrandsListCell dataKey="brands" />
          </Table.Column>

          {/* Category */}
          <Table.Column
            width={250}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Category`}
                dataKey="category"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <TruncatedTextCell dataKey="category" maxLength={20} />
          </Table.Column>

          {/* Monthly Revenue = Sales Est. */}
          {/* <Table.Column
            width={150}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Monthly Revenue\nEstimate`}
                dataKey="sales_estimate"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="sales_estimate" autoPrependCurrencySign align="left" />
          </Table.Column> */}

          {/* FBA Percent */}
          {/* <Table.Column
            width={120}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`FBA Percent`}
                dataKey="fba_percent"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="fba_percent" appendWith="%" align="left" asRounded={false} />
          </Table.Column> */}

          {/* State */}
          {/* <Table.Column
            width={120}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`State`}
                dataKey="state"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <TruncatedTextCell dataKey="state" maxLength={20} />
          </Table.Column> */}

          {/* Country */}
          {/* <Table.Column
            width={120}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Country`}
                dataKey="country"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <TruncatedTextCell dataKey="country" maxLength={20} />
          </Table.Column> */}

          {/* Zip Code */}
          {/* <Table.Column
            width={120}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Zip Code`}
                dataKey="zip_code"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <TruncatedTextCell dataKey="zip_code" maxLength={20} />
          </Table.Column> */}

          {/* 1 Month Growth % */}
          {/* <Table.Column
            width={120}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`1 Month\nGrowth %`}
                dataKey="growth_month"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell
              dataKey="growth_month"
              appendWith="%"
              align="left"
              asRounded={false}
              asFloatRounded={true}
            />
          </Table.Column> */}

          {/* 3 Month Growth % */}
          {/* <Table.Column
            width={120}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`3 Month\nGrowth %`}
                dataKey="growth_L90D"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell
              dataKey="growth_L90D"
              appendWith="%"
              align="left"
              asRounded={false}
              asFloatRounded={true}
            />
          </Table.Column> */}

          {/* 6 Month Growth % */}
          {/* <Table.Column
            width={120}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`6 Month\nGrowth %`}
                dataKey="growth_L180D"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell
              dataKey="growth_L180D"
              appendWith="%"
              align="left"
              asRounded={false}
              asFloatRounded={true}
            />
          </Table.Column> */}

          {/* 12 Month Growth % */}
          {/* <Table.Column
            width={120}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`12 Month\nGrowth %`}
                dataKey="growth_year"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell
              dataKey="growth_year"
              appendWith="%"
              align="left"
              asRounded={false}
              asFloatRounded={true}
            />
          </Table.Column> */}

          {/* Rating L365D */}
          {/*<Table.Column
            width={130}
            verticalAlign="middle"
            sortable={!isLoadingSellerDatabase}
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Rating L365D`}
                dataKey="seller_rating"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <RatingCell dataKey="seller_rating" asRounded={false} />
        </Table.Column>*/}
          {/* Rating % L365D */}
          {/*<Table.Column
            width={120}
            verticalAlign="middle"
            sortable={!isLoadingSellerDatabase}
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Rating%\nL365D`}
                dataKey="review_ratings"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <StatsCell dataKey="review_ratings" appendWith="%" />
      </Table.Column>*/}

          {/* Review L30D */}
          {/*<Table.Column
            width={120}
            verticalAlign="middle"
            sortable={!isLoadingSellerDatabase}
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
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
          </Table.Column>*/}

          {/* Review L90D */}
          {/*<Table.Column
            width={120}
            verticalAlign="middle"
            sortable={!isLoadingSellerDatabase}
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
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
          </Table.Column>*/}

          {/* Review 3650D */}
          {/*<Table.Column
            width={120}
            verticalAlign="middle"
            sortable={!isLoadingSellerDatabase}
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
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
        </Table.Column>*/}

          {/* Review Lifetime */}
          {/* <Table.Column
            width={120}
            verticalAlign="middle"
            sortable={!isLoadingSellerDatabase}
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
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
          </Table.Column>*/}

          {/* Seller Launched  */}
          {/* <Table.Column
            width={100}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Seller Launched`}
                dataKey="launched"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <TruncatedTextCell dataKey="launched" maxLength={20} />
          </Table.Column> */}

          {/* Seller Type */}
          {/* <Table.Column
            width={100}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Seller Type`}
                dataKey="seller_type"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <TruncatedTextCell dataKey="seller_type" maxLength={20} />
          </Table.Column> */}

          {/* Seller Phone  */}
          {/* <Table.Column
            width={180}
            sortable={!isLoadingSellerDatabase}
            verticalAlign="middle"
            align="center"
          >
            <Table.HeaderCell>
              <HeaderSortCell
                disabled={isLoadingSellerDatabase}
                title={`Seller Phone`}
                dataKey="phone"
                currentSortColumn={sortColumn}
                currentSortType={sortType}
              />
            </Table.HeaderCell>
            <TruncatedTextCell dataKey="phone" maxLength={20} />
          </Table.Column> */}
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
    sellerMarketplace: getSellerDatabaseMarketplaceInfo(state),
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  fetchSellerDatabase: (payload: SellerDatabasePayload) => dispatch(fetchSellerDatabase(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabaseTable);
