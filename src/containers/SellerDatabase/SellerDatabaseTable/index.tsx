import React, { useEffect, useState } from 'react';
import { Column, GenericTable } from '../../../components/Table';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import PLUS_ICON from '../../../assets/images/plus-circle-regular.svg';
import Rating from 'react-rating';
import {
  databaseCount,
  loadingDatabase,
  loadingSellerDatabase,
  pageCount,
  pageNo,
  pageSize,
  sellerDatabase,
  singlePageItemsCount,
} from '../../../selectors/SellerDatabase';
import {
  fetchSellersDatabase,
  SellerDatabasePayload,
  setSellerDatabaseSinglePageItemsCount,
  trackDatabaseSeller,
} from '../../../actions/SellerDatabase';
import { connect } from 'react-redux';
import PageLoader from '../../../components/PageLoader';
import { showNAIfZeroOrNull } from '../../../utils/format';
import CopyToClipboard from '../../../components/CopyToClipboard';
export interface CheckedRowDictionary {
  [index: number]: boolean;
}

interface Props {
  loading: boolean;
  loadingDatabase: boolean;
  database: any[];
  pageNo: number;
  pageSize: number;
  pageCount: number;
  databaseCount: number;
  singlePageItemsCount: number;
  fetchSellersDatabase: (payload: SellerDatabasePayload) => void;
  setSinglePageItemsCount: (count: number) => void;
  targetSeller: (merchantId: string) => void;
}

const SellerDatabaseTable = (props: Props) => {
  const {
    fetchSellersDatabase,
    loading,
    database,
    setSinglePageItemsCount,
    pageCount,
    pageSize,
    pageNo,
    databaseCount,
    singlePageItemsCount,
    loadingDatabase,
    targetSeller,
  } = props;
  const [checkedRows, setCheckedRows] = useState<any>({});

  const fetchDatabase = (payload: SellerDatabasePayload) => {
    fetchSellersDatabase(payload);
  };

  useEffect(() => {
    fetchDatabase({
      pageNo,
      pageSize,
      sort: 'seller_id',
      sortDirection: 'ascending',
    });
  }, []);

  const renderSellerInformation = (row: any) => {
    return (
      <p className="sd-seller-details">
        <span className="name">{row.business_name}</span>
        <span className="seller-id">
          <CopyToClipboard data={row.seller_id} className={''} />
        </span>
      </p>
    );
  };

  const renderSellerInventory = (row: any) => {
    return <p>{showNAIfZeroOrNull(row.inventory_count, row.inventory_count)}</p>;
  };

  const renderSellerRating = (row: any) => {
    return (
      <Rating
        placeholderRating={parseFloat(row.seller_rating) || 0}
        emptySymbol={<Icon name="star outline" color={'grey'} />}
        fullSymbol={<Icon name="star" color={'grey'} />}
        placeholderSymbol={<Icon name="star" color={'grey'} />}
        readonly
      />
    );
  };

  const renderSellerTotalRating = (row: any) => {
    return <p>{row.review_ratings ? row.review_ratings : '-'}</p>;
  };

  // const renderSellerFBA = ({ fba = null }) => {
  //   return <p>{fba !== null ? (fba ? 'Yes' : 'No') : '-'}</p>;
  // };
  //
  // const renderSellerFBM = ({ fbm = null }) => {
  //   return <p>{fbm !== null ? (fbm ? 'Yes' : 'No') : '-'}</p>;
  // };

  const renderSellerReview30D = (row: any) => {
    return <p>{showNAIfZeroOrNull(row.count_30_days, row.count_30_days)}</p>;
  };

  const renderSellerReview90D = (row: any) => {
    return <p>{showNAIfZeroOrNull(row.count_90_days, row.count_90_days)}</p>;
  };

  const renderSellerReview365D = (row: any) => {
    return <p>{showNAIfZeroOrNull(row.count_12_month, row.count_12_month)}</p>;
  };

  const renderSellerReviewLifetime = (row: any) => {
    return <p>{showNAIfZeroOrNull(row.count_lifetime, row.count_lifetime)}</p>;
  };

  // const renderProductReview = (row: any) => {
  //   return <p>{showNAIfZeroOrNull(row.review, row.review)}</p>;
  // };

  const renderActions = (row: any) => {
    const active = row.tracking_status === 'active';
    return (
      <div>
        <Button
          basic
          color="blue"
          className={active ? 'target-btn-active' : 'target-btn'}
          onClick={() => targetSeller(row.id)}
        >
          <img src={PLUS_ICON} alt="target" />
          <span>{active ? `Tracking` : `Target Now`}</span>
        </Button>
      </div>
    );
  };

  // const handleItemSelect = (e: any, isChecked: any, itemId: any) => {
  //   const newCheckedRows = {
  //     ...checkedRows,
  //     [itemId]: isChecked,
  //   };
  //   setCheckedRows(newCheckedRows);
  // };

  // const renderCheckBox = (row: any) => {
  //   let checked = false;
  //   if (checkedRows[row.id] !== undefined) {
  //     checked = checkedRows[row.id];
  //   }
  //   return <SellerCheckBox checked={checked} item={row} onClick={handleItemSelect} />;
  // };

  const Columns: Column[] = [
    // {
    //   label: '',
    //   sortable: false,
    //   dataKey: 'checkboxes',
    //   show: true,
    //   check: true,
    //   render: renderCheckBox,
    // },
    {
      label: 'Seller Information',
      dataKey: 'business_name',
      sortable: false,
      type: 'string',
      show: true,
      render: renderSellerInformation,
    },
    {
      label: 'inventory',
      dataKey: 'inventory_count',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerInventory,
    },
    {
      label: `Rating \nL365D`,
      dataKey: 'seller_rating',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerRating,
    },
    {
      label: `Rating% \nL365D`,
      dataKey: 'review_ratings',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerTotalRating,
    },
    // {
    //   label: `FBA`,
    //   dataKey: 'fba',
    //   sortable: true,
    //   type: 'string',
    //   show: true,
    //   render: renderSellerFBA,
    // },
    // {
    //   label: `FBM`,
    //   dataKey: 'fbm',
    //   sortable: true,
    //   className: 'sm-col',
    //   type: 'string',
    //   show: true,
    //   render: renderSellerFBM,
    // },
    {
      label: `Review \nL30D`,
      dataKey: 'count_30_days',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview30D,
    },
    {
      label: `Review \nL90D`,
      dataKey: 'count_90_days',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview90D,
    },
    {
      label: `Review \nL365D`,
      dataKey: 'count_12_month',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview365D,
    },
    {
      label: `Review \nLifetime`,
      dataKey: 'count_lifetime',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReviewLifetime,
    },
    // {
    //   label: `Product \nReview#`,
    //   dataKey: 'review',
    //   sortable: true,
    //   type: 'string',
    //   show: true,
    //   render: renderProductReview,
    // },
    {
      label: ``,
      dataKey: 'actions',
      show: true,
      render: renderActions,
    },
  ];

  return (
    <div className="seller-database-table">
      {loading ? (
        <PageLoader pageLoading={true} />
      ) : (
        <GenericTable
          currentActiveColumn={''}
          stickyChartSelector={false}
          scrollTopSelector={false}
          data={database}
          checkedRows={checkedRows}
          columns={Columns}
          name="seller-database"
          singlePageItemsCount={singlePageItemsCount}
          currentPage={pageNo}
          pageCount={pageCount}
          count={databaseCount}
          loading={loadingDatabase}
          setPage={(page: number) => {
            if (page !== pageNo) {
              fetchDatabase({
                pageNo: page,
                pageSize: pageSize,
                enableLoader: false,
              });
            }
          }}
          setSinglePageItemsCount={(pageSize: number) => {
            fetchDatabase({
              pageNo: 1,
              pageSize,
              enableLoader: false,
            });
            setSinglePageItemsCount(pageSize);
          }}
          onSort={(sortDirection, sort) => {
            fetchDatabase({
              pageNo: 1,
              pageSize: pageSize,
              enableLoader: false,
              sort,
              sortDirection,
            });
          }}
          updateCheckedRows={rows => setCheckedRows(rows)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: loadingSellerDatabase(state),
  database: sellerDatabase(state),
  pageNo: pageNo(state),
  pageSize: pageSize(state),
  pageCount: pageCount(state),
  databaseCount: databaseCount(state),
  singlePageItemsCount: singlePageItemsCount(state),
  loadingDatabase: loadingDatabase(state),
});

const mapDispatchToProps = {
  fetchSellersDatabase: (payload: SellerDatabasePayload) => fetchSellersDatabase(payload),
  setSinglePageItemsCount: (count: number) => setSellerDatabaseSinglePageItemsCount(count),
  targetSeller: (merchantId: string) => trackDatabaseSeller(merchantId),
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerDatabaseTable);
