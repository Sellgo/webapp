import React, { useState } from 'react';
import { Column, GenericTable } from '../../../components/Table';
import SellerCheckBox from './sellerCheckbox';
import './index.scss';
import { Button, Icon } from 'semantic-ui-react';
import PLUS_ICON from '../../../assets/images/plus-circle-regular.svg';
import Rating from 'react-rating';
export interface CheckedRowDictionary {
  [index: number]: boolean;
}

const SellerDatabaseTable = () => {
  const [checkedRows, setCheckedRows] = useState({});
  const renderSellerInformation = (row: any) => {
    return <p>{row.merchant_name}</p>;
  };

  const renderSellerInventory = (row: any) => {
    return <p>{row.inventory}</p>;
  };

  const renderSellerRating = (row: any) => {
    return (
      <Rating
        placeholderRating={parseInt(row.rating) || 0}
        emptySymbol={<Icon name="star outline" color={'grey'} />}
        fullSymbol={<Icon name="star" color={'grey'} />}
        placeholderSymbol={<Icon name="star" color={'grey'} />}
        readonly
      />
    );
  };

  const renderSellerTotalRating = (row: any) => {
    return <p>{row.total_rating}</p>;
  };

  const renderSellerFBA = (row: any) => {
    return <p>{row.fba}</p>;
  };

  const renderSellerFBM = (row: any) => {
    return <p>{row.fbm}</p>;
  };

  const renderSellerReview30D = (row: any) => {
    return <p>{row.count_30}</p>;
  };

  const renderSellerReview90D = (row: any) => {
    return <p>{row.count_90}</p>;
  };

  const renderSellerReview365D = (row: any) => {
    return <p>{row.count_12_months}</p>;
  };

  const renderSellerReviewLifetime = (row: any) => {
    return <p>{row.count_all}</p>;
  };

  const renderProductReivew = (row: any) => {
    return <p>{row.review}</p>;
  };

  const renderActions = () => {
    return (
      <div>
        <Button basic color="blue" className="target-btn">
          <img src={PLUS_ICON} alt="target" />
          <span>Target Now</span>
        </Button>
      </div>
    );
  };

  const renderCheckBox = () => <SellerCheckBox />;
  const Columns: Column[] = [
    {
      label: '',
      sortable: false,
      dataKey: 'checkboxes',
      show: true,
      check: true,
      render: renderCheckBox,
    },
    {
      label: 'Seller Information',
      dataKey: 'title',
      sortable: false,
      type: 'string',
      show: true,
      render: renderSellerInformation,
    },
    {
      label: 'inventory',
      dataKey: 'inventory',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerInventory,
    },
    {
      label: `Rating \nL365D`,
      dataKey: 'rating',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerRating,
    },
    {
      label: `Rating% \nL365D`,
      dataKey: 'total_rating',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerTotalRating,
    },
    {
      label: `FBA`,
      dataKey: 'fba',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerFBA,
    },
    {
      label: `FBM`,
      dataKey: 'fbm',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerFBM,
    },
    {
      label: `Review \nL30D`,
      dataKey: 'review_count_30',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview30D,
    },
    {
      label: `Review \nL90D`,
      dataKey: 'review_count_90',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview90D,
    },
    {
      label: `Review \nL365D`,
      dataKey: 'review_count_365',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReview365D,
    },
    {
      label: `Review \nLifetime`,
      dataKey: 'review_lifetime',
      sortable: true,
      type: 'string',
      show: true,
      render: renderSellerReviewLifetime,
    },
    {
      label: `Product \nReview#`,
      dataKey: 'product_review',
      sortable: true,
      type: 'string',
      show: true,
      render: renderProductReivew,
    },
    {
      label: ``,
      dataKey: 'actions',
      show: true,
      render: renderActions,
    },
  ];

  return (
    <div className="seller-database-table">
      <GenericTable
        currentActiveColumn={''}
        stickyChartSelector={false}
        scrollTopSelector={false}
        data={[
          {
            title: 'Something',
            inventory: 200,
            rating: 4.5,
            total_rating: 200,
            fba: 'Yes',
            fbm: 'No',
            review_count_30: 100,
            review_count_90: 50,
            review_count_365: 500,
            review_lifetime: 5000,
            product_review: 2000,
          },
        ]}
        checkedRows={checkedRows}
        columns={Columns}
        name="seller-database"
        updateCheckedRows={rows => setCheckedRows(rows)}
      />
    </div>
  );
};

export default SellerDatabaseTable;
