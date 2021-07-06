import React, { useEffect, useState } from 'react';
import { Column, GenericTable } from '../../../components/Table';
import './index.scss';
import { Icon } from 'semantic-ui-react';
import { ReactComponent as TrackingPlusIcon } from '../../../assets/images/plus-circle-regular.svg';
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
import {
  formatNumber,
  removeSpecialChars,
  showNAIfZeroOrNull,
  truncateString,
} from '../../../utils/format';
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
    const shouldShowSellerDatabaseData = Boolean(localStorage.getItem('showSellerDatabaseData'));
    if (shouldShowSellerDatabaseData) {
      fetchDatabase({
        pageNo,
        pageSize,
        sort: 'seller_id',
        sortDirection: 'ascending',
      });
    }

    return () => {
      fetchSellersDatabase({ resetFilters: true });
    };
  }, []);

  const renderSellerInformation = (row: any) => {
    return (
      <p className="sd-seller-details">
        <span className="name">
          {truncateString(row.business_name || '', 23)}
          <Icon name={'external'} onClick={() => window.open(row.seller_link, '_blank')} />
        </span>
        <CopyToClipboard data={row.merchant_id} className={'seller_id'} />
      </p>
    );
  };

  const renderBrands = (row: any) => {
    if (!row.brands || !row.brands.length || !removeSpecialChars(row.brands)) {
      return <p>-</p>;
    }

    const formattedBrands = truncateString(removeSpecialChars(row.brands), 30);
    const copyForClipBoard = removeSpecialChars(row.brands).trim();

    return (
      <p className="brands-list">
        <CopyToClipboard displayData={formattedBrands} data={copyForClipBoard} />
      </p>
    );
  };

  const renderSellerInventory = (row: any) => {
    return <p>{showNAIfZeroOrNull(row.inventory_count, row.inventory_count)}</p>;
  };

  // Seller Ratings
  const renderSellerRating = (row: any) => {
    return (
      <Rating
        emptySymbol={<Icon name="star outline" color={'grey'} />}
        fullSymbol={<Icon name="star" color={'grey'} />}
        placeholderSymbol={<Icon name="star" color={'grey'} />}
        initialRating={Math.round(parseFloat(row.seller_rating || 0))}
        readonly
      />
    );
  };

  const renderSellerTotalRating = (row: any) => {
    return <p>{row.review_ratings ? row.review_ratings : '-'}</p>;
  };

  const renderSellerReview30D = (row: any) => {
    const formattedNumber = formatNumber(row.count_30_days);
    return <p>{showNAIfZeroOrNull(row.count_30_days, formattedNumber)}</p>;
  };

  const renderSellerReview90D = (row: any) => {
    const formattedNumber = formatNumber(row.count_90_days);
    return <p>{showNAIfZeroOrNull(row.count_90_days, formattedNumber)}</p>;
  };

  const renderSellerReview365D = (row: any) => {
    const formattedNumber = formatNumber(row.count_12_month);
    return <p>{showNAIfZeroOrNull(row.count_12_month, formattedNumber)}</p>;
  };

  const renderSellerReviewLifetime = (row: any) => {
    const formattedNumber = formatNumber(row.count_lifetime);
    return <p>{showNAIfZeroOrNull(row.count_lifetime, formattedNumber)}</p>;
  };

  // Negative Reviews
  const renderNegativeReview30D = (row: any) => {
    const formattedNumber = formatNumber(row.negative_30_days);
    return <p>{showNAIfZeroOrNull(row.negative_30_days, formattedNumber)}</p>;
  };

  const renderNegativeReview90D = (row: any) => {
    const formattedNumber = formatNumber(row.negative_90_days);
    return <p>{showNAIfZeroOrNull(row.negative_90_days, formattedNumber)}</p>;
  };

  const renderNegativeReview365D = (row: any) => {
    const formattedNumber = formatNumber(row.negative_12_month);
    return <p>{showNAIfZeroOrNull(row.negative_12_month, formattedNumber)}</p>;
  };

  const renderNegativeLifetime = (row: any) => {
    const formattedNumber = formatNumber(row.negative_lifetime);
    return <p>{showNAIfZeroOrNull(row.negative_lifetime, formattedNumber)}</p>;
  };

  // Positive Reviews
  const renderPositiveReview30D = (row: any) => {
    const formattedNumber = formatNumber(row.positive_30_days);
    return <p>{showNAIfZeroOrNull(row.positive_30_days, formattedNumber)}</p>;
  };

  const renderPositiveReview90D = (row: any) => {
    const formattedNumber = formatNumber(row.positive_90_days);
    return <p>{showNAIfZeroOrNull(row.positive_90_days, formattedNumber)}</p>;
  };

  const renderPositiveReview365D = (row: any) => {
    const formattedNumber = formatNumber(row.positive_12_month);
    return <p>{showNAIfZeroOrNull(row.positive_12_month, formattedNumber)}</p>;
  };

  const renderPositiveLifetime = (row: any) => {
    const formattedNumber = formatNumber(row.positive_lifetime);
    return <p>{showNAIfZeroOrNull(row.positive_lifetime, formattedNumber)}</p>;
  };

  // Neutral Reviews
  const renderNeutralReview30D = (row: any) => {
    const formattedNumber = formatNumber(row.neutral_30_days);
    return <p>{showNAIfZeroOrNull(row.neutral_30_days, formattedNumber)}</p>;
  };

  const renderNeutralReview90D = (row: any) => {
    const formattedNumber = formatNumber(row.neutral_90_days);
    return <p>{showNAIfZeroOrNull(row.neutral_90_days, formattedNumber)}</p>;
  };

  const renderNeutralReview365D = (row: any) => {
    const formattedNumber = formatNumber(row.neutral_12_month);
    return <p>{showNAIfZeroOrNull(row.neutral_12_month, formattedNumber)}</p>;
  };

  const renderNeutralLifetime = (row: any) => {
    const formattedNumber = formatNumber(row.neutral_lifetime);
    return <p>{showNAIfZeroOrNull(row.neutral_lifetime, formattedNumber)}</p>;
  };

  // Launched
  const renderLauched = (row: any) => {
    return <p>{showNAIfZeroOrNull(row.launched, row.launched)}</p>;
  };

  // State
  const renderState = (row: any) => {
    const data = row.state ? row.state : '';
    const displayData = truncateString(row.state ? row.state : '', 7);

    return (
      <p>
        <CopyToClipboard displayData={displayData} data={data} className="state" />
      </p>
    );
  };

  // Actions
  const renderActions = (row: any) => {
    // true of false value
    const active = row.tracking_status === 'active' || row.tracking_status === true;
    return (
      <div>
        <button
          className={active ? 'target-btn-active' : 'target-btn'}
          onClick={() => targetSeller(row.merchant_id)}
        >
          <TrackingPlusIcon />
          <span>{active ? `Tracking` : `Seller Finder`}</span>
        </button>
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
      label: 'Brands',
      dataKey: 'brands',
      sortable: false,
      type: 'string',
      show: true,
      render: renderBrands,
    },
    // Inventory
    {
      label: 'Inventory',
      dataKey: 'inventory_count',
      sortable: true,
      type: 'number',
      show: true,
      render: renderSellerInventory,
    },
    // Ratings
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
    // Review
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
    // Negative Reviews
    {
      label: `Negative \n Review L30D`,
      dataKey: 'negative_30_days',
      sortable: true,
      type: 'number',
      show: true,
      render: renderNegativeReview30D,
    },
    {
      label: `Negative \n Review L90D`,
      dataKey: 'negative_90_days',
      sortable: true,
      type: 'number',
      show: true,
      render: renderNegativeReview90D,
    },
    {
      label: `Negative \n Review L365D`,
      dataKey: 'negative_12_month',
      sortable: true,
      type: 'number',
      show: true,
      render: renderNegativeReview365D,
    },
    {
      label: `Negative \n Review Lifetime`,
      dataKey: 'negative_lifetime',
      sortable: true,
      type: 'number',
      show: true,
      render: renderNegativeLifetime,
    },
    // Positive Review
    {
      label: `Positive \n Review L30D`,
      dataKey: 'positive_30_days',
      sortable: true,
      type: 'number',
      show: true,
      render: renderPositiveReview30D,
    },
    {
      label: `Positive \n Review L90D`,
      dataKey: 'positive_90_days',
      sortable: true,
      type: 'number',
      show: true,
      render: renderPositiveReview90D,
    },
    {
      label: `Positive \n Review L365D`,
      dataKey: 'positive_12_month',
      sortable: true,
      type: 'number',
      show: true,
      render: renderPositiveReview365D,
    },
    {
      label: `Positive\n Review Lifetime`,
      dataKey: 'positive_lifetime',
      sortable: true,
      type: 'string',
      show: true,
      render: renderPositiveLifetime,
    },
    // Neutral Reviews
    {
      label: `Neutral \n Review L30D`,
      dataKey: 'neutral_30_days',
      sortable: true,
      type: 'number',
      show: true,
      render: renderNeutralReview30D,
    },
    {
      label: `Neutral \n Review L90D`,
      dataKey: 'neutral_90_days',
      sortable: true,
      type: 'number',
      show: true,
      render: renderNeutralReview90D,
    },
    {
      label: `Neutral \n Review L365D`,
      dataKey: 'neutral_12_month',
      sortable: true,
      type: 'number',
      show: true,
      render: renderNeutralReview365D,
    },
    {
      label: `Neutral\n Review Lifetime`,
      dataKey: 'neutral_lifetime',
      sortable: true,
      type: 'number',
      show: true,
      render: renderNeutralLifetime,
    },
    // Launched Year
    {
      label: `Launched`,
      dataKey: 'launched',
      sortable: true,
      type: 'string',
      show: true,
      render: renderLauched,
    },
    // State
    {
      label: `State`,
      dataKey: 'state',
      sortable: true,
      type: 'string',
      show: true,
      render: renderState,
    },
    // Actions
    {
      label: `Tracking`,
      dataKey: 'actions',
      show: true,
      render: renderActions,
    },
  ];

  return (
    <>
      {loading ? (
        <PageLoader pageLoading={true} />
      ) : (
        <div className={`seller-database-table ${loadingDatabase && 'disabled'}`}>
          <GenericTable
            middleScroll
            leftFixedColumns={1}
            rightFixedColumns={1}
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
        </div>
      )}
    </>
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
